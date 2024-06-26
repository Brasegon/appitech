import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Linking } from "react-native";

export default function Flag({flags}) {


    return (

        <View style={styles.myCard}>
        <View style={styles.box}>
        <Image source = {require('../../Asset/fantome.png')}  style = {{ width: 40, height: 40}}/>
            <Text style={styles.description2}>{flags.ghost}</Text>
        </View>
        <View style={styles.box}>
        <Image source = {require('../../Asset/bouet.png')}  style = {{ width: 40, height: 40}}/>
            <Text style={styles.description2}>{flags.difficulty}</Text>
        </View>
        <View style={styles.box}>
        <Image source = {require('../../Asset/pouce.png')}  style = {{ width: 40, height: 40}}/>
            <Text style={styles.description2}>{flags.remarkable}</Text>
        </View>
        <View style={styles.box}>
        <Image source = {require('../../Asset/medaille.png')}  style = {{ width: 40, height: 40}}/>
            <Text style={styles.description2}>{flags.medal}</Text>
        </View>
    </View>
    );
}
const styles = StyleSheet.create({
    myCard: {
        backgroundColor: "#ffffff",  flexDirection: "row", alignSelf: "center", marginBottom: 15, maxWidth:3560, paddingTop: 10, 
    },
    box: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: '7%',
        paddingRight: '7%',
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
        marginRight:20,
        left: 7
    },
});