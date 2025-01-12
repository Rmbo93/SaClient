import React, { useState } from 'react';
import { StyleSheet, TextInput, View,Text } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';
export default function signIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.formInputWrapper}>
        <Octicons name="person" size={20} color="#0066CC" />
        <TextInput
          style={styles.input}
         
          value={username}
          onChangeText={username => setUsername(username)}
           placeholder="User Name" />
      </View>
      <View style={styles.formInputWrapper}>
        <Octicons name="shield-lock" size={20} color="#0066CC" />
          <TextInput
           style={styles.input}
          value={password}
      
          onChangeText={password => setPassword(password)}
          secureTextEntry={true}
           placeholder="Password"/>

      </View>
      <Ripple
        rippleColor="rgb(0, 0, 0)"
        rippleOpacity={0.5}
        rippleDuration={300}
        rippleCentered={true}
        rippleFades={false}
        rippleContainerBorderRadius={20}
        style={styles.login}
      >
          <Text style= {styles.buttonText}>Sign In</Text>
      </Ripple>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    padding: 15,
    backgroundColor: '#17469F',
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
 
  
  }
    ,
  formInputWrapper: {
    width: '90%',
    height: 55,
    backgroundColor: '#f7f9ef',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  input: {
    width: '90%',
    height: '100%',
    marginLeft: 10,
  },
  buttonText:{
    fontSize:18,
    color:'#fff'
  }
});
