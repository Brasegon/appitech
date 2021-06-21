import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button, Image, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Btn from 'react-native-micro-animated-button';

export default function registerPage() {
    return (
        <View style={{flex:1, position: 'absolute', 
        top: 200, left: 0, 
        right: 0, bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'}}>
            {/* <View style={styles.title}><Text style={styles.titleText}>Registration <MaterialCommunityIcons name="account-plus" color={"#3f72af"} size={30}></MaterialCommunityIcons></Text></View> */}
            <ScrollView>
            <View style={styles.card}>
                <Image source={require('../../../Asset/logo.png')} style={{ width: 150, height: 120, marginBottom: 10 }} />
                <Text style={styles.titleText}>Registration <MaterialCommunityIcons name="account-plus" color={"#3f72af"} size={30}></MaterialCommunityIcons></Text>

                <TextInput style={styles.input}
                    placeholder="Email" />
                <TextInput style={styles.input}
                    secureTextEntry={true}
                    placeholder="Password"
                />
                <TextInput style={styles.input}
                    placeholder="AutoLogin Link"
                />
                <Btn
                    label="Submit"
                    onPress={() => this.btn.success()}
                    // ref={ref => (this.btn = ref)}
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
        backgroundColor: 'white',
        height : 500,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        textAlign: 'center',
        borderWidth: 0.3,
        borderColor: 'grey',
        width : 350,
        marginTop : 10
    }
});

