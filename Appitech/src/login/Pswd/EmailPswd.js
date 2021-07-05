import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button, Image, ScrollView, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SpinkitButton from 'react-native-spinkit-button';
import httpClient from '../../utils/httpClient';
import AwesomeAlert from 'react-native-awesome-alerts';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton, Colors } from 'react-native-paper';


export default function registerPage({isConnected, onConnected}) {

    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const navigation = useNavigation();
    const [loading, onLoading] = React.useState(false);
    const [showAlert, onShowAlert] = React.useState(false);
    const [showAlertPswd, onShowAlertPswd] = React.useState(false);
    const [errorMessage, onErrorMessage] = React.useState("");

    if (isConnected == true) {
        navigation.navigate('Home');
    }
    async function successButton() {
        onLoading(true);
        var result = await httpClient('/login', 'post', {login:email, password:password});
        if (result.code == '200') {
            await AsyncStorage.setItem('@account', JSON.stringify(result.message));
            onConnected(true);
            navigation.navigate('Home');
        }
        else {
            onErrorMessage(result.message);
            onShowAlert(true);
            onLoading(false);
        }
    }

    async function goBack() {
        navigation.navigate('Login');
    }
    return (
        <View style={{backgroundColor:'white', flex : 1}}>
            <ScrollView>
            <IconButton
                                icon="arrow-left-thick"
                                color="#0f4c75"
                                size={35}
                                style={styles.logout}
                                onPress={goBack}
                            />
                <View style={styles.card}>
                    <Image source={require('../../../Asset/logo.png')} style={{ width: 150, height: 120, marginBottom: 10 }} />
                    <Text style={styles.titleText}>Enter your email adress <MaterialCommunityIcons name="at" color={"#3f72af"} size={30}></MaterialCommunityIcons></Text>

                    <TextInput style={styles.input}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder="Recovery email address" />
                     <SpinkitButton
                        width={270}
                        height={40}
                        borderRadius={11}
                        onPress={successButton}
                        buttonStyle={styles.button}
                        label={'Submit'}
                        labelStyle={styles.textButtonStyle}
                        loading={loading}
                        labelAndTextContainer={styles.labelAndTextContainer}

                        size={15}
                        type={'Bounce'}
                        color={'#FFFFFF'}
                        animationDuration={300}
                    />

                </View>
            <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Error, account not created"
                    message={errorMessage}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmButtonColor="#0f4c75"
                    onCancelPressed={() => {
                        onShowAlert(false);
                        
                    }}
                    onConfirmPressed={() => {
                        onShowAlert(false);
                    }}
                />

                <AwesomeAlert
                    show={showAlertPswd}
                    showProgress={false}
                    title="Check your Email !"
                    message="A temporary password has been send, enter it with your email address to connect "
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmButtonColor="#0f4c75"
                    onCancelPressed={() => {
                        onShowAlertPswd(false);
                        
                    }}
                    onConfirmPressed={() => {
                        onShowAlertPswd(false);
                    }}
                />
            </ScrollView>
            
        </View>
    );
};
const styles = StyleSheet.create({
    title: {
        backgroundColor : '#f6f9fb',
        height:70,
 
    },
    titleText: {
        fontSize:25,
        color: '#3f72af',
        textAlign:'center',
        marginBottom: 30
    },
    card: {
        top : 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height : 700
    },
    input: {
        textAlign: 'center',
        borderWidth: 0.3,
        borderColor: 'grey',
        width : 350,
        marginTop : 10
    },
    button: {
        marginTop : 30,
        marginBottom: 10,
    },
    textButtonStyle: {
        flex : 1,
        color : "#2887CB",
        textAlign : 'center',
        textAlignVertical: 'center'
    },
    labelAndTextContainer: {
        borderWidth: 1,
        width : 250,
        height : 40,
        borderColor: "#2887CB",
        borderRadius: 40,
    }
});

