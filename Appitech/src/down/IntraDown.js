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
const { height, width } = Dimensions.get('window');
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AnimatedLoader from "react-native-animated-loader";
import LottieView from 'lottie-react-native';
const Down = ({isConnected, onConnected}) => {
const [loading, onLoading] = React.useState(true);
    return (
        <View>
            <Text style={{alignSelf: 'center', fontSize : 30, width:260, color: '#2ca9e7',fontWeight: 'bold',}}>Intranet is down, it will be back soon!</Text>
            <LottieView style={styles.lottie}source={require('./down.json')} autoPlay loop />
        </View>
    )
}
const styles = StyleSheet.create({
    lottie: {
        top : 20,
        width: 300,
        height: 300,
        alignItems: 'center' 
    }
})

export default Down;