import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    ScrollView
  } from 'react-native';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

  const LastMessage = ({resMessage}) => {


      return (
          <View>
              <View style={styles.container}>
                  <Image source={{ uri: resMessage[0].img }} style={styles.avatar} />
                  <Text style={styles.name}>{resMessage[0].message}</Text>
                  <Text style={styles.informations}>{resMessage[0].user} <MaterialCommunityIcons name="account" color={"grey"} size={12} /></Text>
                  <Text style={styles.informations}>{resMessage[0].date} <MaterialCommunityIcons name="clock-time-eight-outline" color={"grey"} size={12}></MaterialCommunityIcons></Text>
              </View>
          </View>
      );
  }

  const styles = StyleSheet.create({
    container: {
        marginLeft : 20,
        marginRight: 20,
        marginBottom : 60,
        borderWidth: 2,
        borderColor : '#2ca9e7',
        borderRadius: 20,
        shadowColor: "#39A2DB",
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
        left: 90,
        color: "grey",
        fontWeight: "600",
        maxWidth : 250
    },

    informations: {
        color : "#3f72af",
        fontSize : 10,
        left : 90,
        top : -20
    }
});
export default LastMessage;