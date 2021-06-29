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
   Dimensions
 } from 'react-native'
 import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Splash = ({isConnected, onConnected}) => {
const navigation = useNavigation();

setTimeout(() => {
  redirect();
  }, 1000);

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
         <Image style={{ top:200, width: wp('100%'), flexDirection: 'column',
justifyContent: 'center',
alignSelf: 'center',
height: hp('50%')}} source={require('../../Asset/Splash2.gif')} />
       </View>
     )
   }
 const styles = StyleSheet.create({
 
 })

 export default Splash;