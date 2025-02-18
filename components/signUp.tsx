import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Octicons } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';
import { router } from 'expo-router';

export default function CreateAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSignUp = async (): Promise<void> => {
    if (!firstName.trim() || !lastName.trim() || !mobile.trim() || !password.trim()) {
      alert('Please fill out all required fields');
      return;
    }
  
    if (!/^[0-9]{8}$/.test(mobile)) {
      alert('Mobile number must be exactly 8 digits');
      return;
    }
  
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      // Create the request body, including the email field only if it has a value
      const requestBody: Record<string, string> = {
        firstName,
        lastName,
        mobile,
        password,
      };
  
      if (email.trim()) {
        requestBody.email = email;
      }
  
      const response = await fetch('http://172.20.10.2:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody), // Dynamically constructed body
      });
  
      const result: { message?: string; error?: string } = await response.json();
  
      if (response.ok) {
        alert('Signup successful!');
        console.log('User registered:', result);
        router.push('/')
        
      } else {
        alert(`Signup failed: ${result.error}`);
      }
    } catch (err: unknown) {
      console.error('Signup Error:', err);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Hello! Register to get started</Text>

            {/* First Name Input */}
            <View style={styles.formInputWrapper}>
              <Octicons name="person" size={20} color="#808080" />
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
                placeholderTextColor="black"
              />
            </View>

            {/* Last Name Input */}
            <View style={styles.formInputWrapper}>
              <Octicons name="person" size={20} color="#808080" />
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
                placeholderTextColor="black"
              />
            </View>

            {/* Mobile Number Input */}
            <View style={styles.formInputWrapper}>
              <Octicons name="device-mobile" size={20} color="#808080" />
              <TextInput
                style={styles.input}
                value={mobile}
                onChangeText={setMobile}
                placeholder="Mobile Number"
                placeholderTextColor="black"
                keyboardType="phone-pad"
              />
            </View>

            {/* Email Input (Optional) */}
            <View style={styles.formInputWrapper}>
              <Octicons name="mail" size={20} color="#808080" />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address (Optional)"
                placeholderTextColor="black"
                keyboardType="email-address"
              />
            </View>

            {/* Password Input */}
            <View style={styles.formInputWrapper}>
              <Octicons name="lock" size={20} color="#808080" />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="black"
              />
            </View>

            {/* Confirm Password Input */}
            <View style={styles.formInputWrapper}>
              <Octicons name="lock" size={20} color="#808080" />
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholder="Confirm Password"
                placeholderTextColor="black"
              />
            </View>

            {/* Sign Up Button */}
            <Ripple
              rippleColor="rgb(0, 0, 0)"
              rippleOpacity={0.5}
              rippleDuration={300}
              rippleCentered={true}
              rippleFades={false}
              rippleContainerBorderRadius={20}
              style={styles.signUpButton}
              onPress={handleSignUp}
            >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </Ripple>

        {/* Back to Sign In */}
        <TouchableOpacity style={styles.backToSignIn} onPress={() => router.push('/')}>
          <Text style={styles.backToSignInText}>Already have an account? Sign In</Text>
          
        </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 60,
  },
  formInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9f9',
    borderRadius: 2,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    height: 50,
  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: 10,
    color: '#000',
    textAlign: 'left', 
  },
  
  signUpButton: {
    backgroundColor: '#000',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backToSignIn: {
    marginTop: 20,
    padding: 10,
  },
  backToSignInText: {
    color: 'black',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});