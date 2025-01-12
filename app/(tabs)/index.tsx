import { View, Text,SafeAreaView,Image } from 'react-native'
import React from 'react'
import SearchBar from '@/components/SearchBar'

import 'react-native-get-random-values';
import SignUp from '@/components/signIn';
import "../../global.css"

export default function index() {
  return (


<SafeAreaView className="flex-1 justify-center items-center bg-blue-100">
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-bold text-red-800">Hello, World!</Text>
      <SearchBar/>
      <SignUp/>
      </View>
    </SafeAreaView>

    
  )
}