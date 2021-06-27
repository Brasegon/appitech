 import React, { Component } from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   Button,
   Alert,
   Action,
   TouchableOpacity,
   Linking,
 } from 'react-native'
 import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';

const Splash = ({isConnected, onConnected}) => {
const navigation = useNavigation();

setTimeout(() => {
  redirect();
  }, 1500);

function redirect () {
if (isConnected == true) {
  navigation.navigate('Home');
}
else {
  navigation.navigate('Login');
}
}
     return (
       <View style={{backgroundColor:'white', flex : 1}}>
         <Image style={{ top:250, width: 250, flexDirection: 'column',
justifyContent: 'center',
alignSelf: 'center',
height: '26%'}} source={require('../../Asset/Splash2.gif')} />
       </View>
     )
   }
 const styles = StyleSheet.create({
 
 })

 export default Splash;