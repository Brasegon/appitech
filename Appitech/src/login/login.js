import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authorize } from "react-native-app-auth";
import httpClient from "../utils/httpClient";
import { Button, Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Video from 'react-native-video';
import moment from 'moment';
import { SafeAreaView } from "react-native";
import { IconButton, Colors } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Mark from "./mark";
import Flag from "./flag";
import Log from "./log";
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import AnimatedLoader from "react-native-animated-loader";

export default function Login ({ isConnected, onConnected, profil, onProfil }) {
    const navigation = useNavigation();
    const [result, onResult] = React.useState({});
    const [gpa, onGPA] = React.useState(0);
    const [log, onLog] = React.useState({});
    const [loading, onLoading] = React.useState(true);
    useAsync();
    function useAsync() {
        useEffect(() => { 
            getInfo();
        }, []);
    }

    async function logout() {
        await AsyncStorage.removeItem("@account");
        onConnected(false);
        navigation.navigate('Splash');
    }

    async function getInfo() {
    var res = await httpClient('/profile', 'get');
    onLoading(false);
    onResult(res.message);
    console.log(res.message);
    onGPA(res.message.gpa[res.message.gpa.length-1].gpa);
    onLog(res.message.logtime);
    console.log(res.message.logtime, "taaaaaaaaaaaaaaaaaaille")
    }

    return (
        <View>
            {loading &&
            <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("./loader.json")}
        animationStyle={styles.lottie}
        speed={1}
      />}
            {!loading &&
            <ScrollView >

                <View style={{flex:1}}>
                    
                    <View style={styles.body}>
                        <View style={{ marginBottom: 0, flex: 1, flexDirection: "row", alignSelf: "center" }}>
                            <View style={styles.box}>
                                <Image source={{uri: result.picture}} style={styles.avatar} />

                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.name}>{result.firstname} {result.lastname}</Text>
                                <Text style={styles.info}>
                                    {result.school_title} | Promo {result.promo}
                                </Text>
                            <View style={{marginBottom : 50}}>
                                <Text style={styles.description}>{result.internal_email} <MaterialCommunityIcons name="email-outline" color={"grey"} size={15} /></Text>
                            <Text style={styles.description}>{result.location} <MaterialCommunityIcons name="city-variant-outline" color={"grey"} size={15} /></Text>
                            </View>
                            </View>
                        </View>
                        <IconButton
                            icon="logout"
                            color="#0f4c75"
                            size={35}
                            style={styles.logout}
                            onPress={logout}
                        />
                        <View style={styles.myCard}>
                            <View style={styles.box}>
                                <Text style={{ color: "grey", fontSize: 13 }}>GPA</Text>
                                <Text style={styles.description2}>{gpa}</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={{ color: "grey", fontSize: 13 }}>Crédits</Text>
                                <Text style={styles.description2}>{result.credits}</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={{ color: "grey", fontSize: 13, textAlign: "center" }}>Recent log</Text>
                                <Text style={styles.description2}>  26H</Text>
                            </View>
                        </View>

                        {log && log.datasets && <Log log={log} />}
                        <View>
                            <Mark />
                            <Flag />
                        </View>


                    </View>

                </View>
            </ScrollView>
            }
        </View>

    );

};

const styles = StyleSheet.create({
    lottie: {
        width: 350,
        height: 350
    },
    title: {
        textAlign: "center",
        fontSize: 40,
    },
    tinyLogo: {
        width: 300,
        height: 300,
    },
    header: {
        backgroundColor: "#0f4c75",
        height: 50,
    },
    myCard: {
        backgroundColor: "#ffffff", flex: 1, flexDirection: "row", alignSelf: "center", marginBottom: 0, top: -30, maxWidth: 380
    },
    box: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: '5%',
        paddingRight: '5%',
    },

    avatar: {
        width: 80,
        left: -30,
        height: 80,
        top: 5,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "grey",
    },
    body: {
        paddingTop: 30,
        paddingBottom: 0,
        backgroundColor: 'white'
    },
    bodyContent: {
        flex: 1,
        alignItems: "center",
        padding: 30,
    },
    name: {
        
        fontSize: 25,
        maxWidth : 180,
        left: -34,
        color: "#0f4c75",
        fontWeight: "600",
        
    },
    info: {
        fontSize: 13,
        color: "#0f4c75",
        left: -30,
    },
    description: {
        fontSize: 11,
        left: -30,
        color: "grey"
    },
    description2: {
        fontSize: 40,
        color: "#0f4c75",
        marginRight: 20
    },
    buttonContainer: {
        marginTop: -130,
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#0f4c75",
        color: "white",
    },
    logout: {
        position: "absolute",
        right: 0,
        top: 0
    },
});