import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button, Image, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import httpClient from '../../utils/httpClient';
import AwesomeAlert from 'react-native-awesome-alerts';
import SpinkitButton from 'react-native-spinkit-button';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { IconButton, Colors } from 'react-native-paper';


export default function registerPage() {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [autoLogin, onChangeAutolink] = React.useState("");
    const [showAlert, onShowAlert] = React.useState(false);
    const [errorMessage, onErrorMessage] = React.useState("");
    const [loading, onLoading] = React.useState(false);
    const navigation = useNavigation();

    async function successButton() {
        onLoading(true);
        var result = await httpClient('/register', 'post', {login:email, password:password, autologin:autoLogin});
        if (result.code == '200') {
            navigation.navigate('Login');
        }
        else {
            onErrorMessage(result.message);
            onShowAlert(true);
            onLoading(false);
        }
    }

    async function goBack() {
        navigation.navigate('Choose');
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
                    <Text style={styles.titleText}>Registration <MaterialCommunityIcons name="account-plus" color={"#3f72af"} size={30}></MaterialCommunityIcons></Text>

                    <TextInput style={styles.input}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder="Email" />

                    <TextInput style={styles.input}
                        secureTextEntry={true}
                        onChangeText={onChangePassword}
                        value={password}
                        placeholder="Password"
                    />
                    <TextInput style={styles.input}
                        onChangeText={onChangeAutolink}
                        value={autoLogin}
                        placeholder="AutoLogin Link"
                    />
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
                    <Text style={{ color: 'grey', fontSize: 12, fontStyle: 'italic' }}>If you are already registered, <Text onPress={() => navigation.navigate('Login')} style={{ textDecorationLine: 'underline', color: '#006DFD', fontSize: 14 }}> log in</Text></Text>
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

