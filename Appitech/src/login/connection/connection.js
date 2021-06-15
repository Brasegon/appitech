import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Btn from 'react-native-micro-animated-button';

export default function registerPage() {
    return (
        <View >
            <View style={styles.title}><Text style={styles.titleText}>Log In <MaterialCommunityIcons name="account-arrow-right" color={"#3f72af"} size={30}></MaterialCommunityIcons></Text></View>
            <View style={styles.card}>
                <Image source={require('../../../Asset/logo.png')} style={{ width: 150, height: 120, top: -50 }} />

                <TextInput style={styles.input}
                    placeholder="Email" />
                <TextInput style={styles.input}
                    secureTextEntry={true}
                    placeholder="Password"
                />
                <Btn
                    label="Submit"
                    onPress={() => this.btn.success()}
                    // ref={ref => (this.btn = ref)}
                    successIcon="check"
                />
                <Text style={{color:'grey', fontSize:12, fontStyle: 'italic'}}>Go to the <Text style={{textDecorationLine: 'underline', color:'#006DFD', fontSize:14}}>Register Page</Text></Text>
            </View>
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
        top : 18
    },
    card: {
        backgroundColor: 'white',
        marginTop: 50,
        height : 500,
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        top : -30,
        textAlign: 'center',
        borderWidth: 0.3,
        borderColor: 'grey',
        width : 250,
        marginTop : 10
    }
});

