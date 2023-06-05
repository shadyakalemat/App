import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View,Alert, TouchableOpacity } from 'react-native';
import {Button, ActivityIndicator,MD2Colors} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IconButton,TextInput} from '@react-native-material/core';
import  Icon from '@expo/vector-icons/MaterialCommunityIcons';


const Sinup = (props) => {
 
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Password, setPassword] = useState('');
    const [isLoading, setIsLOading] = useState(false);
    const [Name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [token, setToken] = useState(null);
      
    const [showEye, setShowEye] = useState(false);
    const [visible, setVisible] = useState(true);
    

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
      //console.log(token)
  
  /*const creatNewAccount = async () => {
    const getAccounts_url = 'http://10.70.3.254:3001/api/register';

    if (Name !== "" && email !== "" && Password !== "" && PhoneNumber !== "") {
      const response = await fetch(getAccounts_url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Name: Name,
          email: email,
          Password: Password,
          PhoneNumber: PhoneNumber
        })
      })
      // setName("");
      const data = await response.json();
      if (data) {
        if (data.status) {
          {
            Alert.alert(data.message.verficationCode)
            AsyncStorage.setItem('vdata', JSON.stringify(data.message.PhoneNumber))
            props.navigation.navigate("LogIn")
          }
        }
        else {
          Alert.alert(data.message);
        }
      } else {
        Alert.alert('No data for you');
      }
    } else {
      Alert.alert('All inputs is required');
    }


  }*/


   const creatNewAccount = async () => {
    const getAccounts_url = 'http://10.70.1.37:3001/api/register';
    if (Name !== "" && email !== "" && Password !== "" && PhoneNumber !== "") {
      const response = await fetch(getAccounts_url, {
        method: 'post',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          Name: Name,
          email: email,
          PhoneNumber: PhoneNumber,
          Password: Password,
        })
      })
      const responseData = await response.json();
      if (responseData) {
        if (responseData.status){
         Alert.alert("welcome"+responseData.message.verficationCode)
         console.log(responseData.message.verficationCode);
         AsyncStorage.setItem('vdata', JSON.stringify(responseData.message.PhoneNumber))
         console.log(responseData.message.PhoneNumber);
         props.navigation.navigate("Verify")
          //props.verifyMyCode();
        } else {
          Alert.alert(responseData.message);
          //Alert.alert(responseData.message.verficationCode)
        }
      } else {
        Alert.alert("No Data")
      }
    } else {
      Alert.alert("All inputs is required")
    }
  } 
//   const creatNewAccount = async () => {
//     const getAccounts_url = 'http://10.70.3.254:3001/api/register';
//     if (Name !== ""  && email !== "" && PhoneNumber !== ""  && Password !== "") {
//         const response = await fetch(getAccounts_url, {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 Name:Name,
//                 email: email,
//                 PhoneNumber:PhoneNumber,
//                 Password: Password
//             })
//         })
//         const data = await response.json()
//         if (data) {
//             if (data.status) {
//                 Alert.alert(data.message.verficationCode);
//                 AsyncStorage.setItem('vdata', JSON.stringify(data.message.PhoneNumber))
//                 props.navigation.navigate("Verify");
//                 //props.navigation.navigate("liveRoom")
//                // setAuthView("verifycode")
//             }
//             else {
//                 Alert.alert(data.message)
//             }
//         }
//         else {
//             Alert.alert("no data");
//         }

//     }
//     else {
//         Alert.alert("all input require");
//     }

// }
    return (
      <View style={styles.container}>
            
          <View style={styles.input}>
          <TextInput 
               keyboardType='default'
               //secureTextEntry={true}
               //style={{width:'100%'}}
               mode='outlined'
               value={Name} 
               onChangeText={(text) => setName(text)}
              // placeholder="name"
               label="name"
             /> 
             
            <TextInput 
               keyboardType='email-address'
              // secureTextEntry={true}
              // style={{width:'100%',borderRadius:30,borderRadius:30}}
               mode='outlined'
               value={email} 
               onChangeText={(text) => setEmail(text)}
               label="email address"
               
             /> 
             <TextInput
              keyboardType = 'number-pad' 
               style={{width:'100%'}}
               mode='outlined'
              value={PhoneNumber} 
              onChangeText={(text) => setPhoneNumber(text)}
              label="phone number"
             /> 
  
              <TextInput 
               keyboardType='default'
               secureTextEntry={visible}
               style={{width:'100%'}}
               mode='outlined'
               value={Password} 
               onChangeText={(text) => setPassword(text)}
               label="password"
              // placeholder='password'
               trailing={props => (
                <IconButton  onPress={() => {
                  setVisible(!visible)
                  setShowEye(!showEye)}}
                icon={props => <Icon name={showEye === false ? 'eye-outline' : 'eye-off-outline'}
                 {...props} />} {...props} />
              )}
             />
            </View>
               {
                isLoading ? (
                  <ActivityIndicator animating={true} size={30}/>
                ) : (
                  <Button 
                  onPress={creatNewAccount} 
                   mode='contained' 
                   style={{width:'100%', marginTop:12}} 
                   icon='account'>Create Account</Button>
                )
               }
              
            

                 {/* <Button 
                  onPress={verifyMyCode} 
                   mode='contained' 
                   style={{width:'100%', marginTop:12}} 
                   icon='account'>verify</Button> */}
      </View>
    );
  }
  export default Sinup;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#ddcd',
      padding:30,
     //backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width:'97%',
      borderRadius:3,
      backgroundColor:'#ffdd00',
      
    }
  });