import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Linking, RefreshControl, Alert, TextInput, Modal, Pressable } from "react-native";
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
import AwesomeAlert from 'react-native-awesome-alerts';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import AnimatedLoader from "react-native-animated-loader";

import SpinkitButton from 'react-native-spinkit-button';
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');
import Down from "../down/IntraDown"
export default function Login({ isConnected, onConnected, profil, onProfil }) {
    const navigation = useNavigation();
    const [result, onResult] = React.useState({});
    const [gpa, onGPA] = React.useState(0);
    const [log, onLog] = React.useState({});
    const [notes, onNotes] = React.useState([]);
    const [flags, onFlags] = React.useState({});
    const [showAlert, onShowAlert] = React.useState(false);
    const [loading, onLoading] = React.useState(true);
    const [errorMessage, onErrorMessage] = React.useState("");
    const [refreshing, setRefreshing] = React.useState(false);
    const [intra, onIntra] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(false);
        onLoading(true);
        getInfo();
    }, []);
    const [modalVisible, setModalVisible] = useState(false);
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [autoLogin, onChangeAutolink] = React.useState("");
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

    async function editProfile()
    {
        onLoading(true);
        var res = await httpClient('/editProfile', 'put', {login:email, password:password, autologin:autoLogin});
        if (res.code == '200') {
            setModalVisible(!modalVisible);
            onLoading(false);
        }
        else {
            onErrorMessage(res.message);
            onShowAlert(true);
            onLoading(false);
        }
    }

    async function getInfo() {
        var res = await httpClient('/profile', 'get');
        if (res.code === 5000) {
            onIntra(true);
            onLoading(false);
            return;
        }
        onLoading(false);
        onResult(res.message);
        onGPA(res.message.gpa[res.message.gpa.length - 1].gpa);
        onLog(res.message.logtime);
        onNotes(res.message.notes);
        onFlags(res.message.flags);
    }

    return (
        <ScrollView refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
            {loading &&
                <AnimatedLoader
                    visible={loading}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("./loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                />}
            {!loading && !intra &&
             <View >

                    <View style={{ flex: 1 }}>

                        <View style={styles.body}>
                            <View style={{ marginBottom: 0, flex: 1, flexDirection: "row", alignSelf: "center" }}>
                                <View style={styles.box}>
                                    <Image source={{ uri: result.picture }} style={styles.avatar} />

                                </View>

                                <View style={{ marginTop: 30 }}>
                                    <Text style={styles.name}>{result.firstname} {result.lastname}</Text>
                                    <Text style={styles.info}>
                                        {result.school_title} | Promo {result.promo}
                                    </Text>
                                    <View style={{ marginBottom: 50 }}>
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
                            <IconButton
                                icon="account-cog"
                                color="#0f4c75"
                                size={35}
                                style={styles.settings}
                                onPress={() => setModalVisible(!modalVisible)}
                            />


                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Profile settings</Text>


                                        <TextInput style={styles.input}
                                            onChangeText={onChangeEmail}
                                            value={email}
                                            placeholder="New Email" />

                                        <TextInput style={styles.input}
                                            secureTextEntry={true}
                                            onChangeText={onChangePassword}
                                            value={password}
                                            placeholder="New Password"
                                        />
                                        <TextInput style={styles.input}
                                            onChangeText={onChangeAutolink}
                                            value={autoLogin}
                                            placeholder="New AutoLogin Link"
                                        />

                                        <SpinkitButton
                                            width={200}
                                            height={40}
                                            borderRadius={11}
                                            onPress={editProfile}
                                            buttonStyle={styles.button}
                                            label={'Confirm'}
                                            labelStyle={styles.textButtonStyle}
                                            loading={loading}
                                            labelAndTextContainer={styles.labelAndTextContainer}
                                            size={15}
                                            type={'Bounce'}
                                            color={'#FFFFFF'}
                                            animationDuration={300}
                                        />

                                        <SpinkitButton
                                            width={200}
                                            height={40}
                                            borderRadius={11}
                                            onPress={() => setModalVisible(!modalVisible)}
                                            buttonStyle={styles.button}
                                            label={'Close'}
                                            labelStyle={styles.textButtonStyle}
                                            loading={loading}
                                            labelAndTextContainer={styles.labelAndTextContainer}
                                            size={15}
                                            type={'Bounce'}
                                            color={'#FFFFFF'}
                                            animationDuration={300}
                                        />
                                    </View>
                                </View>
                            </Modal>

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
                                    {log && log.datasets && <Text style={styles.description2}> {Math.round((log.datasets[0].total) * 10) / 10}H</Text>}
                                </View>
                            </View>

                            {log && log.datasets && <Log log={log} />}
                            <View>
                            {notes && notes.length > 0 && <Mark notes={notes} />}
                            {flags !== '' && flags.ghost !== '' && <Flag flags={flags} />}
                        </View>
                        <AwesomeAlert
                            show={showAlert}
                            showProgress={false}
                            title="Error, account not edited"
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

                    </View>

                    </View>
                </View>
            }
        {!loading && intra && 
             <View style={styles.test} >
             <Down/>
         </View>
            }
        </ScrollView>

    );

};

const styles = StyleSheet.create({
    test: {
        backgroundColor: "#fff",
        height: height - 50,
        justifyContent: 'center', //Centered vertically
           alignItems: 'center', // Centered horizontally
           flex:1
      },
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
        top: 25,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "grey",
    },
    body: {
        paddingTop: 40,
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
        maxWidth: 180,
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
    settings: {
        position: "absolute",
        right: 50,
        top: 0
    },
    logout: {
        position: "absolute",
        right: 0,
        top: 0
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        marginTop: 20,
    },
    textButtonStyle: {
        flex: 1,
        color: "#2887CB",
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    labelAndTextContainer: {
        borderWidth: 1,
        width: 200,
        height: 40,
        borderColor: "#2887CB",
        borderRadius: 40,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        textAlign: 'center',
        borderWidth: 0.3,
        borderColor: 'grey',
        width: 200,
        marginTop: 10
    },
});