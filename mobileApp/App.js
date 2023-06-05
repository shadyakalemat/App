//import Account from './account'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
import Singup from './SignUp';
import CreateNewStore from './CreatNewStore';
import { StyleSheet, Text, View,Dimensions,Image } from 'react-native'
import React from 'react';
import Verify from './Verify';
//import BackgroundImg from './BackgroungImg';

import Video from 'react-native-video';

//const { height } = Dimensions.get("window");
const Stack = createStackNavigator();
//import Main from './main'
import Account from './account'
//"./../assets/video1.mp4"
const App = () => {
 /* const onBuffer = (data) =>{
    console.log("on buffer", data)
  }*/

  
 /* const onError = (data) =>{
    console.log("error", data)
  }*/
   //  <Stack.Screen name="Verify" component={Verify}/>
  return (
     <>
   
      {/* <View style={{flex: 1}}>
       <Video source={require("./assets/image.mp4")}
        style={styles.backgroundVideo}
        onBuffer={onBuffer}
        onError={onError}
        repeat={true}
        resizeMode={"cover"}/> 
    </View>  */}
     
      <NavigationContainer>
   
         <Stack.Navigator>
        <Stack.Screen  name="Main" component={Account}/>
        <Stack.Screen  name="LogIn" component={Login}/>
         <Stack.Screen name="SingUp" component={Singup}/>
        <Stack.Screen name="Verify" component={Verify} />
       </Stack.Navigator>
      </NavigationContainer>  
   </>
  )
}

const styles = StyleSheet.create({
  backgroundVideo: {
  height: '100%',
 // position: "absolute",
 position:'absolute',
  //top: 0,
  left: 0,
  alignItems: 'stretch',
  bottom: 0,
  right: 0
  }
  });

export default App

