import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, Linking } from "react-native";

export default function Flag() {
    return (

        <View >
            <Image
  source={{ uri: '../../Asset/epitech.png' }}
  style={{ width: 400, height: 400 }}
/>
    </View>
    );
}
const styles = StyleSheet.create({
    myCard: {
        backgroundColor: "#ffffff",  flexDirection: "row", alignSelf: "center", marginBottom: 15, maxWidth:3560, paddingTop: 50, 
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