import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import MapView from 'react-native-maps';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Taxi Lux</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchBar} 
          placeholder='Pickup Location' 
          placeholderTextColor="#B0BEC5"
        />
        <TextInput 
          style={styles.searchBar} 
          placeholder='Destination' 
          placeholderTextColor="#B0BEC5"
        />
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 3/* User's latitude */,
          longitude:3 /* User's longitude */,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      {/* ETA and Fare Display */}
      <View style={styles.infoContainer}>
        <Animated.View style={styles.etaContainer}>
          <Text style={styles.eta}>ETA: 3 min</Text>
        </Animated.View>
        <Text style={styles.fare}>Estimated Fare: $15</Text>
      </View>

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>Book</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
  },
  searchContainer: {
    padding: 10,
  },
  searchBar: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    marginBottom: 10,
    paddingLeft: 15,
    fontSize: 16,
    textColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    padding: 15,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  etaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eta: {
    fontSize: 22,
    color: '#FF3D00',
    fontWeight: 'bold',
  },
  fare: {
    fontSize: 20,
    color: '#E0E0E0',
    textAlign: 'center',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6A00F4',
    borderRadius: 30,
    padding: 15,
    elevation: 5,
  },
  fabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default App;