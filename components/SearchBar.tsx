import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { GOOGLE_MAPS_API_KEY } from '@/config'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { getBackgroundColorAsync } from 'expo-system-ui';
import { TextInput } from 'react-native-gesture-handler';
export default function SearchBar() {
  return (
    <GooglePlacesAutocomplete 
            styles={inputBoxStyles}
            placeholder="Where from?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            query={{
                key:GOOGLE_MAPS_API_KEY,
                language: "en"

            }}
            
            fetchDetails={true}
            minLength={2}
            enablePoweredByContainer={false}
            />

  );
};

const inputBoxStyles=StyleSheet.create({
    container:{
    backgroundColor:"white",
    marginTop:10,
    flex:0
},
    textInput:{
        fontSize:18,
        backgroundColor:"#DDDDDD20",
        borderWidth:1,
        borderRadius:50,

    },
    textInputContainer:
    {
        paddingBottom:0,
    },
});