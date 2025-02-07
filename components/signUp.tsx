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
} from 'react-native';
import { Octicons } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';

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
  
      const response = await fetch('http://192.168.11.193:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody), // Dynamically constructed body
      });
  
      const result: { message?: string; error?: string } = await response.json();
  
      if (response.ok) {
        alert('Signup successful!');
        console.log('User registered:', result);
      } else {
        alert(`Signup failed: ${result.error}`);
      }
    } catch (err: unknown) {
      console.error('Signup Error:', err);
      alert('An error occurred. Please try again later.');
    }
  };

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
        <TouchableOpacity style={styles.backToSignIn} onPress={() => console.log('Back to Sign In')}>
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
