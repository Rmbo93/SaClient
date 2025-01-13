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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSignUp = () => {
    console.log('Sign Up clicked');
    console.log({ name, email, password, confirmPassword });
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>

        {/* Name Input */}
        <View style={styles.formInputWrapper}>
          <Octicons name="person" size={20} color="#808080" />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
            placeholderTextColor="#ccc"
          />
        </View>

        {/* Email Input */}
        <View style={styles.formInputWrapper}>
          <Octicons name="mail" size={20} color="#808080" />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email Address"
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
