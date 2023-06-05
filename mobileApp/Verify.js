import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper'
import {IconButton,TextInput} from '@react-native-material/core';



const Verify = () => {

  
   const [auth,setAuth] = useState("");
   const [code,seCode] = useState("");
   const [PhoneNumber,setPhoneNumber] = useState("");


   
        const verifyMyCode = async () => {
        const getAccounts_url = 'http://10.70.1.37:3001/api/verifyAccount';
        //setPhoneNumber(rphone)
        if (code !== ""){
          const rphone = AsyncStorage.getItem("vdata");
          const verify = {
            PhoneNumber: rphone,
            verficationCode: code,
          }
            await fetch(getAccounts_url, { verify })
            .then(async results => {
              const response =  await results.json();
              if(response.status){
              Alert.alert(`Wellcome ${results.response.verficationCode}`)
              } else {
                Alert.alert(response.message);
              }
            })
            .catch(error => {
              Alert.alert(error.message)
            })
        } else {
          Alert.alert("You didnt type any code")
        }
      }
 
  return (
    <View>
           <TextInput
              keyboardType = 'number-pad' 
               style={{width:'100%'}}
               mode='outlined'
              value={code} 
              onChangeText={(text) => seCode(text)}
              label="phone number"
             /> 
          <Button onPress={verifyMyCode} variant="primary" style={{ width: '100%', marginTop: 15 }} >Verify</Button>
 
    </View>
  )
}

export default Verify

const styles = StyleSheet.create({})