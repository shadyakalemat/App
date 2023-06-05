import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View,Alert, TouchableOpacity, Modal  } from 'react-native';
import {Button,TextInput, ActivityIndicator,MD2Colors} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Calendar from 'react-native-calendars/src/calendar'

const CreateNewStore = ({navigation}) => {
    

  const [firstName, setFirstName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [nameStore, setNameStore] = useState('');
  const [address, setAdress] = useState('');
  const [image, setImage] = useState('');
  const [calenderShow, setCalenderShow] = useState('');

  
  




  return (
    <View style={styles.container}>
            
          <View style={styles.input}>
  
             <TextInput 
               keyboardType='default'
               //secureTextEntry={true}
               //style={{width:'100%'}}
               mode='outlined'
               value={firstName} 
               onChangeText={(text) => setFirstName(text)}
               placeholder="first name"
             /> 
             
            <TextInput 
               keyboardType='number-pad'
              // secureTextEntry={true}
              // style={{width:'100%',borderRadius:30,borderRadius:30}}
               mode='outlined'
               value={mobile} 
               onChangeText={(text) => setMobile(text)}
               placeholder="mobile"
               //keyboardType="numeric"
             /> 
             <TextInput
              keyboardType = 'default' 
               style={{width:'100%'}}
               mode='outlined'
              value={password} 
              onChangeText={(text) => setPassword(text)}
              placeholder="password"
             /> 
  
              <TextInput 
               keyboardType='default'
              // secureTextEntry={true}
               style={{width:'100%'}}
               mode='outlined'
               value={nameStore} 
               onChangeText={(text) => setNameStore(text)}
               placeholder="name store"
             />

             <TextInput 
               keyboardType='default'
              // secureTextEntry={true}
               style={{width:'100%'}}
               mode='outlined'
               value={address} 
               onChangeText={(text) => setAdress(text)}
               placeholder="address"
             />
             <TouchableOpacity onPress={() => setCalenderShow(true)} style={{backgroundColor:'black',
               borderRadius:10,
               margin:10,
               padding:10,
               width:200,
               alignItems:'center'
            }}>
              <Text style={{color:'white', fontSize:22}}>Show Calendars</Text>
             </TouchableOpacity>

             <Modal visible={calenderShow} animationType="fade" >
               <Calendar style={{borderRadius:10, elevation:4, margin:10}} />
             </Modal>
            </View>
                {/* <Button 
                onPress={creatNewAccount} 
                 mode='contained' 
                 style={{width:'100%', marginTop:12}} 
                 icon='account'>Create Account</Button> */}
      </View>
  )
}

export default CreateNewStore;

const styles = StyleSheet.create({})