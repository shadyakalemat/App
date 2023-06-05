import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View,Alert, TouchableOpacityBase  } from 'react-native';
import {Button, ActivityIndicator,MD2Colors} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {IconButton,TextInput} from '@react-native-material/core';

const Login = (props) => {
    
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLOading] = useState(false);
  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [token, setToken] = useState(null);
  const [showEye, setShowEye] = useState(false);
  const [visible, setVisible] = useState(true);
  

  const login = async () =>{
    
    const login_url = 'http://10.70.1.37:3001/api/login';
     try {
      const response = await fetch(login_url, {
        method: 'post',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          PhoneNumber: phoneNumber,
          Password: password
        })
      })
      const data = await response.json();
      if(data){
         if(data.status){  
          //Alert.alert(data.token)
          //setIsLOading(false);
          AsyncStorage.setItem('token', JSON.stringify({
              token: data.token
          }))
         } else {
        //  setIsLOading(false);
          Alert.alert(data.message)
         }
      } else {
        setIsLOading(false);
          Alert.alert('No data for you')
      }
     } catch (error) {
      //setIsLOading(false);
      Alert.alert(error)
      
     }
  }
  
  useEffect(() => {
    getAccount();
  },[]);

  const getAccount = async() => {
    const dataFromAsync = await AsyncStorage.getItem('token');
    if(dataFromAsync !== null){
      const value = JSON.parse(dataFromAsync);
      setToken(value.token);
      //loadData();
    } else {
      Alert.alert('Please login');
    }
  }

  // const loadData = async() => {
  //   const getAccounts_url = 'http://10.70.3.254:3001/api/getAccounts';
  //   try {
  //     const response = await fetch(getAccounts_url,{
  //       method: 'get',
  //       headers: {
  //         'Content-Type' : 'application/json'
  //       }
  //     })
  //     const data = await response.json();
  //     if (data) {
  //         if(data.status){
  //           console.log(data.message);

  //         } else {
  //           Alert.alert(data.message);
  //         }
  //     } else {
  //       Alert.alert('No data for you');
  //     }
  //   } catch (error) {
  //     Alert.alert(error.message);
  //   }
    
  // }




  return (
    <View style={styles.container}>
          
    <View style={styles.input}>
       <TextInput
        keyboardType = 'number-pad' 
         style={{width:'100%'}}
         mode='outlined'
        value={phoneNumber} 
        onChangeText={(text) => setPhoneNumber(text)}
        label="phone number"
       /> 

        <TextInput
          keyboardType='default'
          secureTextEntry={visible}
          style={{ width: '100%' }}
          mode='outlined'
          value={password}
          onChangeText={(text) => setPassword(text)}
          label="password"
          trailing={props => (
            <IconButton onPress={() => {
              setVisible(!visible)
              setShowEye(!showEye)
            }}
              icon={props => <Icon name={showEye === false ? 'eye-outline' : 'eye-off-outline'}
                {...props} />} {...props} />
          )}
        
       />
      </View>
       
          <Button 
          onPress={login} 
           mode='contained' 
           style={{width:'100%', marginTop:12}} 
           icon='account'
           title='hello'
           >Log n</Button>

</View>
  )
}

export default Login;

const styles = StyleSheet.create({})