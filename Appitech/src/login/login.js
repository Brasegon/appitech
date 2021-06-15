import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authorize } from "react-native-app-auth";
import Config from "../../config";
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

const Login = ({ isConnected, onConnected, profil, onProfil }) => {
    async function init() { }
    async function getProfilInformation() {
        // var result = await httpClient("https://api.imgur.com/3/account/me", "GET");
        onProfil(result);
    }


    function renderItems({ item, index }) {
        var items = item;
        var img;
        var type = items.type;
        if (type.split("/")[0] === "image") {
            img = (
                <Card.Image style={styles.tinyLogo} source={{ uri: items.link }} onPress={() => Linking.openURL(items.link)}>
                </Card.Image>
            );
        } else {
            img = <Video muted={true} source={{
                uri: items.mp4
            }} style={{ width: 300, height: 300 }}
            />
        }
        return (
            <View>
                <Card>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Card.Title style={{ width: '75%', textAlign: "left" }}>
                            {items.title}
                        </Card.Title>
                    </View>
                    <Card.Divider />
                    {img}
                </Card>
            </View>)

    }


    async function loginImgur() {
        try {
            const result = await authorize(Config.oauth);
            await AsyncStorage.setItem("@account", JSON.stringify(result));
            getProfilInformation();
            onConnected(true);
        } catch (error) {
            console.log(error);
        }
    }
    function useAsync() {
        useEffect(() => { }, []);
    }

    async function logout() {
        await AsyncStorage.removeItem("@account");
        onConnected(false);
    }

    useAsync();
    init();

    // const dateObject = new Date(profil.data.created * 1000);
    // const humanDateFormat = new Date(dateObject);

    return (
        <View>

            <ScrollView >

                <View style={styles.container}>

                    <View style={styles.body}>
                        <View style={{ marginBottom: 0, flex: 1, flexDirection: "row", alignSelf: "center" }}>
                            <View style={styles.box}>
                                <Image source='d' style={styles.avatar} />

                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.name}>Valentin Lyon</Text>
                                <Text style={styles.info}>
                                    Pré-Msc | Promo 2023
                                </Text>

                            </View>
                        </View>
                        <IconButton
                            icon="logout"
                            color="#0f4c75"
                            size={35}
                            style={styles.logout}
                            onPress={() => console.log('Pressed')}
                        />
                        <View style={{ alignSelf: "center", marginBottom: 20, marginTop: 10 }} >
                            <Text style={styles.description}>Marseille <MaterialCommunityIcons name="city-variant-outline" color={"grey"} size={15} /></Text>
                            <Text style={styles.description}>France <MaterialCommunityIcons name="earth" color={"grey"} size={15} /></Text>
                            <Text style={styles.description}></Text>

                        </View>
                        <View style={styles.myCard}>
                            <View style={styles.box}>
                                <Text style={{ color: "grey", fontSize: 13 }}>GPA</Text>
                                <Text style={styles.description2}>3.70</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={{ color: "grey", fontSize: 13 }}>Crédits</Text>
                                <Text style={styles.description2}>39</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={{ color: "grey", fontSize: 13, textAlign: "center" }}>Recent log</Text>
                                <Text style={styles.description2}>  26H</Text>
                            </View>
                        </View>

                        <Log />
                        <View>
                            <Mark />
                            <Flag />
                        </View>


                    </View>

                </View>
            </ScrollView>
        </View>

    );

};

const styles = StyleSheet.create({
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
        borderWidth: 4,
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
        left: -12,
        top: -45,
        color: "grey",
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

export default Login;
