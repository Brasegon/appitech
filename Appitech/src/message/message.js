import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, Linking } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Flag() {
    return (

    <View>
    <View style={styles.title}><Text style={styles.titleText}>Messages <MaterialCommunityIcons name="cellphone-message" color={"#3f72af"} size={30}></MaterialCommunityIcons></Text></View>
    <View style={styles.content}>
    <View style={styles.messageCard}>
        <View style={styles.box}>
            <Image source={''} style={styles.avatar}  />
            <Text style={styles.name}>Votre groupe a été inscrit au créneau de Follow-up Follow-up - Bernstein #2</Text>
            <Text style={styles.informations}>Brandon Segers <MaterialCommunityIcons name="account" color={"grey"} size={12} /></Text>
            <Text style={styles.informations}>01/06 • 11h09 <MaterialCommunityIcons name="clock-time-eight-outline" color={"grey"} size={12}></MaterialCommunityIcons></Text>

        </View>
    </View>

    
    

    </View>
    <View style={styles.content}>
    <View style={styles.messageCard}>
        <View style={styles.box}>
            <Image source={''} style={styles.avatar}  />
            <Text style={styles.name}>Votre groupe a été inscrit au créneau de Follow-up Follow-up - Bernstein #2</Text>
            <Text style={styles.informations}>Brandon Segers <MaterialCommunityIcons name="account" color={"grey"} size={12} /></Text>
            <Text style={styles.informations}>01/06 • 11h09 <MaterialCommunityIcons name="clock-time-eight-outline" color={"grey"} size={12}></MaterialCommunityIcons></Text>

        </View>
    </View>

    
    

    </View>
    <View style={styles.content}>
    <View style={styles.messageCard}>
        <View style={styles.box}>
            <Image source={''} style={styles.avatar}  />
            <Text style={styles.name}>Votre groupe a été inscrit au créneau de Follow-up Follow-up - Bernstein #2</Text>
            <Text style={styles.informations}>Brandon Segers <MaterialCommunityIcons name="account" color={"grey"} size={12} /></Text>
            <Text style={styles.informations}>01/06 • 11h09 <MaterialCommunityIcons name="clock-time-eight-outline" color={"grey"} size={12}></MaterialCommunityIcons></Text>

        </View>
    </View>

    
    

    </View>
    <View style={styles.content}>
    <View style={styles.messageCard}>
        <View style={styles.box}>
            <Image source={''} style={styles.avatar}  />
            <Text style={styles.name}>Votre groupe a été inscrit au créneau de Follow-up Follow-up - Bernstein #2</Text>
            <Text style={styles.informations}>Brandon Segers <MaterialCommunityIcons name="account" color={"grey"} size={12} /></Text>
            <Text style={styles.informations}>01/06 • 11h09 <MaterialCommunityIcons name="clock-time-eight-outline" color={"grey"} size={12} /></Text>

        </View>
    </View>

    
    

    </View>
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
        height: 130
    },
    messageCard: {
        backgroundColor : 'white'
    },
    avatar: {
        width: 60,
        left: 20,
        height: 60,
        top: 20,
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