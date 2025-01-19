import { View, Image, Text, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import OrderTaxi from '@/components/OrderTaxi';

export default function Index() {
  const router = useRouter();
  return (
   
    <View style={styles.container}>
    <Text style={styles.title}>Select a Service </Text>
      {/* First Row */}
      <View style={styles.row}>
        {/* Image with Text */}
        <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => router.push('../components/OrderTaxi')}>

          
          <Image
            source={require('../../assets/images/istockphoto-1345298067-2048x2048.jpg')}
            style={styles.image}
          />
          <Text style={styles.label}>Order Taxi</Text>
        
          </TouchableOpacity>

        </View>

        <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => router.push('../components/OrderTaxi')}>

          <Image
            source={require('../../assets/images/istockphoto-1675979127-2048x2048.jpg')}
            style={styles.image}
          />
          <Text style={styles.label}>Order Food/Groceries</Text>
          </TouchableOpacity>
        </View>
     
      </View>

      {/* Second Row */}
      <View style={styles.row}>
        <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => router.push('../../components/OrderTaxi')}>

          <Image
            source={require('../../assets/images/istockphoto-1345298067-2048x2048.jpg')}
            style={[styles.image, { marginRight: 180}]} // Move last image left
            />
          <Text style={styles.overlayText}>Jor/Leb </Text>
          </TouchableOpacity>
         
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center', // Centers text and image
    marginHorizontal: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  title: {
    fontSize: 40,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  
  overlayText: {
    position: 'absolute',
    bottom: 0, // Position text at the bottom of the image
    left: 9, // Add some margin to the left
    color: '#333', // White text color for contrast
    fontSize: 16,
    fontWeight: 500,
   
  },
});
