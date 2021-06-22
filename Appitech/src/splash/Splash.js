/**
 * SplashScreen
 * 启动屏
 * from：http://www.devio.org
 * Author:CrazyCodeBoy
 * GitHub:https://github.com/crazycodeboy
 * Email:crazycodeboy@gmail.com
 * @flow
 */
 'use strict';


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
 
 export default class example extends Component {
   componentDidMount(){
     this.timeoutHandle = setTimeout(()=>{
     }, 5000);
 }
 componentWillUnmount(){
   clearTimeout(this.timeoutHandle);
 }
   render() {
     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
         <Image source={require('./Asset/Splash2.gif')} />
       </View>
     )
   }
 }
 const styles = StyleSheet.create({
 
 })