// signUp.tsx (Updated)
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Octicons } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const handleSignUp = async () => {
    // التحقق من إدخال جميع البيانات المطلوبة
    if (!firstName.trim() || !lastName.trim() || !mobile.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'All fields are required except email.');
      return;
    }
  
    // التحقق من أن رقم الهاتف يتكون من 8 أرقام فقط
    if (!/^[0-9]{8}$/.test(mobile)) {
      Alert.alert('Error', 'Mobile number must be exactly 8 digits.');
      return;
    }
  
    // التحقق من أن كلمة المرور تحتوي على 8 أحرف على الأقل
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long.');
      return;
    }
  
    // التحقق من تطابق كلمة المرور مع تأكيدها
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
  
    // التحقق من صحة البريد الإلكتروني إذا تم إدخاله
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Error', 'Invalid email format.');
      return;
    }
    try {
      const response = await fetch('http://192.168.11.193:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, mobile, email, password }),
      });
  
      const result = await response.json();
      console.log('✅ Server Response:', result);
  
      if (!response.ok) {
        Alert.alert('Signup Failed', result.error || 'Something went wrong');
        return;
      }
  
      if (!result.token) {
        Alert.alert('Error', 'No token received from server');
        return;
      }
  
      await AsyncStorage.setItem('userToken', result.token);
      Alert.alert('Success', 'Account created successfully');
      router.push('/');
  
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Network issue, try again.';
      console.error('❌ Fetch Error:', error);
      Alert.alert('Error', errorMessage);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>

        {/* First Name Input */}
        <View style={styles.formInputWrapper}>
          <Octicons name="person" size={20} color="#808080" />
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
            placeholderTextColor="#ccc"
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
            placeholderTextColor="#ccc"
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
            placeholderTextColor="#ccc"
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
            placeholderTextColor="#ccc"
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
            placeholderTextColor="#ccc"
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
            placeholderTextColor="#ccc"
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  formInputWrapper: {
    width: '100%',
    height: 55,
    backgroundColor: '#f7f9ef',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    marginBottom: 20,
    borderRadius: 6,
  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: 10,
    color: '#000',
  },
  signUpButton: {
    padding: 15,
    backgroundColor: '#000000',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  backToSignIn: {
    marginTop: 20,
    padding: 10,
  },
  backToSignInText: {
    color: '#000000',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
