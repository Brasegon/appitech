import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Linking, RefreshControl } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from "react-native-gesture-handler";
import AnimatedLoader from "react-native-animated-loader";
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');
import Down from "../down/IntraDown"

export default function Flag() {
    const [html, onHtml] = React.useState([]);
    const [loading, onLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [intra, onIntra] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(false);
        onLoading(true);
        getInfo();
    }, []);
    useAsync();
    function useAsync() {
        useEffect(() => {
            getInfo();
        }, []);
    }

    async function getInfo() {
        var res = await httpClient('/messages', 'get');
        if (res.code === 5000) {
            onIntra(true);
        }
        for(i = 0 ; res.message.length > i ; i++ ) {
            var message = res.message[i];
            onHtml(html => [...html,
                <View style={styles.content} key={i}>
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
                    source={require("../login/loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                />}


            {!loading && !intra &&
            <View>
             <View style={styles.title}><Text style={styles.titleText}>Messages <MaterialCommunityIcons name="cellphone-message" color={"#3f72af"}
             size={30}></MaterialCommunityIcons></Text></View>
             <View>
                {html}
             </View>
            </View>
            }
            {!loading && intra &&
             <View style={styles.test} >
             <Down/>
         </View>
            }
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    test: {
        backgroundColor: "#fff",
        height: height - 50,
        justifyContent: 'center', //Centered vertically
           alignItems: 'center', // Centered horizontally
           flex:1
      },
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