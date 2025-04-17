import React, { useState } from "react";
import { View, Button, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from '@/config';
import SearchBar from "@/components/SearchBar";
import SearchBarDes from "@/components/SearchBarDes";

interface DirectionsResponse {
  routes: Array<{
    overview_polyline: {
      points: string;
    };
    legs: Array<{
      distance: { text: string };
      duration: { text: string };
    }>;
  }>;
}

const OrderTaxi = () => {
  const [fromCoords, setFromCoords] = useState<any>(null);
  const [toCoords, setToCoords] = useState<any>(null);
  const [coordinates, setCoordinates] = useState<any[]>([]);
  const [selectedTaxiType, setSelectedTaxiType] = useState<string | null>(null);

  const [region, setRegion] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  
  const notifyDriversVIP = async () => {
    try {
      const res = await fetch('http://192.168.11.66:5000/api/users/notify-vip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'طلب VIP جديد من عميل' }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ Failed to notify drivers:', errorText);
        return;
      }
  
      const data = await res.json();
      console.log('🔔 Notification Sent:', data);
    } catch (error) {
      console.error('❌ Exception while notifying drivers:', error);
    }
  };
  
  const getRoute = async () => {
    if (!fromCoords || !toCoords) return;

    try {
      const response = await axios.get<DirectionsResponse>(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${fromCoords.latitude},${fromCoords.longitude}&destination=${toCoords.latitude},${toCoords.longitude}&key=${GOOGLE_MAPS_API_KEY}&mode=driving&alternatives=true`
      );
      
      console.log("Google Maps API Response:", response.data);

      if (response.data.routes && response.data.routes.length > 0) {
        const points = response.data.routes[0].overview_polyline.points;
        const decodedPoints = decodePolyline(points);

        setCoordinates(decodedPoints);
        setDistance(response.data.routes[0].legs[0].distance.text);
        setDuration(response.data.routes[0].legs[0].duration.text);

        setRegion({
          latitude: decodedPoints[0].latitude,
          longitude: decodedPoints[0].longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      } else {
        console.warn("No routes found in response");
      }
    } catch (error) {
      console.error("Error fetching directions: ", error);
    }
  };

  const decodePolyline = (encoded: string) => {
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;
    const coordinates = [];

    while (index < len) {
      let shift = 0, result = 0, b;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += dlat;

      shift = 0; result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      coordinates.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return coordinates;
  };

  return (
    <View style={styles.container}>
      <SearchBar onPlaceSelected={setFromCoords} />
      <SearchBarDes onPlaceSelected={setToCoords} />
      <Button title="Show Route" onPress={getRoute} />
      <MapView style={styles.map} region={region}>
        {coordinates.length > 0 && (
          <>
            <Marker coordinate={coordinates[0]} title="Start" />
            <Marker coordinate={coordinates[coordinates.length - 1]} title="End" />
            <Polyline coordinates={coordinates} strokeWidth={4} strokeColor="blue" />
          </>
        )}
      </MapView>
      {distance && duration && (
        <View style={styles.infoBox}>
          <Button title={`Distance: ${distance} | Time: ${duration}`} onPress={() => {}} />
        </View>
      )}
      <Text>السيارات المتاحة</Text>

      {/* Taxi Type Selection */}
      <View style={styles.taxiOptionsContainer}>
        <TouchableOpacity style={styles.taxiOption}>
          <Image source={require('../../assets/images/yallo.jpg')} style={styles.taxiImage} />
          <Text>تاكسي صفرا</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.taxiOption}>
          <Image source={require('../../assets/images/yallo.jpg')} style={styles.taxiImage} />
          <Text>تاكسي خاصة</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.taxiOption}
          onPress={() => {
            setSelectedTaxiType('VIP');
            notifyDriversVIP(); // ⬅️ إرسال إشعار للسائقين
          }}
        >

          <Image source={require('../../assets/images/yallo.jpg')} style={styles.taxiImage} />
          <Text>VIP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.taxiOption}>
          <Image source={require('../../assets/images/yallo.jpg')} style={styles.taxiImage} />
          <Text>9 ركاب</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.3,
  },
  infoBox: {
    marginTop: 10,
  },
  taxiOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  taxiOption: {
    alignItems: "center",
  },
  taxiImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
});

export default OrderTaxi;
