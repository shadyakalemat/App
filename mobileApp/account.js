import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Video from 'react-native-video'
import { StatusBar } from 'expo-status-bar'


const Main = ({navigation}) => {
  return (
    <View style={styles.container}>

      {/* <View>
              <Video source={require("./assets/image.mp4")}
              style={styles.backgroundVideo}
              muted={false}
              repeat={true}
              resizeMode={"cover"}
              ignoreSilentSwitch={'obey'} />
      </View> */}
          
     <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LogIn")}>
      <Text style={{textAlign:'center',fontSize:22,justifyContent:'center'}}>Log In</Text> 
      </TouchableOpacity>
       
       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SingUp")}>
        <Text style={{textAlign:'center',fontSize:22}}>Create New Account</Text>  
       </TouchableOpacity>

       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CreateNewStore")}>
        <Text style={{textAlign:'center',fontSize:22}}>Create New Store</Text>  
       </TouchableOpacity> 

      

    </View>
  )
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 35,
    paddingVertical:12,
    paddingStart:70,
    paddingEnd:50,
    flexDirection:'column',
    marginVertical:1,
    top:120
    

  },
  button: {
    alignItems: 'center',
    //backgroundColor: '#FC33FF',
    //backgroundColor: 'rgba(52, 52, 52, 0.8)',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: 10,
    height:'8%',
    width:'95%',
    justifyContent:'space-between',
    paddingLeft:20,
    borderRadius:19,
    margin:3,
    opacity:0.7,
    borderWidth: 2,
    borderColor: 'black',
   
    
  },
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
