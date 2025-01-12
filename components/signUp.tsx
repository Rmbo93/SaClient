import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Implement sign-up logic here
  };

  return (

      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-2xl font-bold mb-4">Sign Up</Text>

        <TextInput
          className="border border-gray-300 rounded p-3 w-full mb-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="border border-gray-300 rounded p-3 w-full mb-4"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          title="Sign Up"
          onPress={handleSignUp}
          color="#4CAF50" // Green color for the button
        />
      </View>
  );
}
