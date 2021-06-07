import React from "react";
import { StyleSheet, View, Text, Image} from "react-native";

const NoSearch = () => {
    return (
        <View style={{left:130 }}>
               <Image source = {require('../../Asset/Imgur.png')}  style = {{ width: 200, height: 200, left: -50, top: 100}}/>
               <Text style={{top : 120, left : -70, fontSize : 20, color: '#cdcdcd' }}><Text style={{color: '#D20073'}}>Launch</Text> a search to access{"\n"}   the entire Imgur library !</Text>
        </View>
    );

}

export default NoSearch;