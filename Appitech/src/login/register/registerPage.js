import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button, Image, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Btn from 'react-native-micro-animated-button';
import httpClient from '../../utils/httpClient';
import config from '../../utils/config';


export default function registerPage() {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [autoLogin, onChangeAutolink] = React.useState("");
    async function successButton() {
        var result = await httpClient(config.url + '/register', 'post', {login:email, password:password, autologin:autoLogin});
        console.log(result.message);
    }
    return (
        <View style={{backgroundColor:'white', flex : 1}}>
            <ScrollView>
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
                    <Btn
                        label="Submit"
                    onPress={() => successButton()}
                    successIcon="check" style={{marginTop: 30}}
                />
                <Text style={{color:'grey', fontSize:12, fontStyle: 'italic'}}>If you are already registered, <Text style={{textDecorationLine: 'underline', color:'#006DFD', fontSize:14}}>log in</Text></Text>
            </View>
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
    }
});

