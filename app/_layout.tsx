import { Stack } from 'expo-router';
import { View, Text } from 'react-native'
import React from 'react'

export default function _layout() {
  return (
    <Stack> 
       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
       <Stack.Screen name="+not-found" />
        
    </Stack>
  )
}