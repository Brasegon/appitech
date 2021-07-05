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
import SpinkitButton from 'react-native-spinkit-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Splash = ({isConnected, onConnected}) => {
const navigation = useNavigation();
const [loading, onLoading] = React.useState(false);


async function redirectLogin () {
    onLoading(true);
    console.log("couocu");
  navigation.navigate('Login');
 }

 async function redirectRegister() {
    navigation.navigate('Register');
}

    return (
      <View style={{backgroundColor:'white', flex : 1}}>
        <Image style={{ top:100, width: wp('75%'), flexDirection: 'column',
justifyContent: 'center',
alignSelf: 'center',
height: hp('40%')}} source={require('../../Asset/splash.png')} />
                <View style={{top : 150}}>
                    <SpinkitButton
                        borderRadius={11}
                        onPress={redirectLogin}
                        buttonStyle={styles.button1}
                        label={'Log in'}
                        labelStyle={styles.textButtonStyle}
                        labelAndTextContainer={styles.labelAndTextContainer}

                        size={15}
                        type={'Bounce'}
                        color={'#FFFFFF'}
                        animationDuration={300}
                    />
                </View>
                <View style={{top : 190}}>
                    <SpinkitButton

                        borderRadius={11}
                        onPress={redirectRegister}
                        buttonStyle={styles.button}
                        label={'Register'}
                        labelStyle={styles.textButtonStyle1}
                        labelAndTextContainer={styles.labelAndTextContainer}

                        size={15}
                        type={'Bounce'}
                        color={"#2887CB"}
                        animationDuration={300}
                    />
                </View>
      </View>
    )
  }
const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    button1: {
        left : 0,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    textButtonStyle: {
        flex : 1,
        color : "#2887CB",
        textAlign : 'center',
        textAlignVertical: 'center',
        fontSize : 17

    },
    textButtonStyle1: {
        flex : 1,
        color : "#2887CB",
        textAlign : 'center',
        textAlignVertical: 'center',
        fontSize : 17
    },
    labelAndTextContainer: {
        borderWidth: 1,
        width : 160,
        height : 70,
        borderColor: "#2887CB",
        borderRadius: 40,
    },
    labelAndTextContainer1: {
        borderWidth: 1,
        width : 140,
        height : 70,
        borderColor: "#2887CB",
        borderRadius: 40,
    }
})

export default Splash;