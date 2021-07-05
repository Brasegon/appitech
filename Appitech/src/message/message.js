import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Linking } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from "react-native-gesture-handler";
import AnimatedLoader from "react-native-animated-loader";

export default function Flag() {
    const [html, onHtml] = React.useState([]);
    const [loading, onLoading] = React.useState(true);

    useAsync();
    function useAsync() {
        useEffect(() => {
            getInfo();
        }, []);
    }

    async function getInfo() {
        var res = await httpClient('/messages', 'get');
        for(i = 0 ; res.message.length > i ; i++ ) {
            var message = res.message[i];
            onHtml(html => [...html,
                <View style={styles.content}>
                        <Image source={{uri: message.img}} style={styles.avatar} />
                        <Text style={styles.name}>{message.message}</Text>
                        <Text style={styles.informations}>{message.user} <MaterialCommunityIcons name="account" color={"grey"} size={12} /></Text>
                        <Text style={styles.informations}>{message.date} <MaterialCommunityIcons name="clock-time-eight-outline" color={"grey"} size={12}></MaterialCommunityIcons></Text>
                </View>]);
        }
        onLoading(false);
        console.log(res);
    }

    return (
        <View style={{flex:1}}>
            {loading &&
                <AnimatedLoader
                    visible={loading}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("../login/loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                />}


            {!loading &&
            <View>
             <View style={styles.title}><Text style={styles.titleText}>Messages <MaterialCommunityIcons name="cellphone-message" color={"#3f72af"}
             size={30}></MaterialCommunityIcons></Text></View>
                <ScrollView >
                {html}
            </ScrollView >
            </View>
            }
        </View>
    
    );
}
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
    content: {
        marginTop: 8,
        backgroundColor: 'white',
        height: 150
    },
    messageCard: {
        backgroundColor : 'white'
    },
    avatar: {
        width: 60,
        left: 20,
        height: 60,
        top: 35,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "grey",
    },
    name: {
        top : -30,
        fontSize: 15,
        maxWidth: 300,
        left: 90,
        color: "grey",
        fontWeight: "600",
    },
    lineStyle:{
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth
       },
    informations: {
        color : "#3f72af",
        fontSize : 10,
        left : 90,
        top : -20
    }
});