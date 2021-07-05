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

  const LastMessage = () => {

      return (
          <View>
              <View style={styles.container}>
                  <Image source={{ uri: 'https://pbs.twimg.com/profile_images/2784222174/2e6b2dbbf9f52bc9051afad78a454c4c_400x400.jpeg' }} style={styles.avatar} />
                  <Text style={styles.name}>Votre groupe a été inscrit au créneau de Follow-up Follow-up - Bernstein #2</Text>
                  <Text style={styles.informations}>Jacouille <MaterialCommunityIcons name="account" color={"grey"} size={12} /></Text>
                  <Text style={styles.informations}>01/06 • 11h09 <MaterialCommunityIcons name="clock-time-eight-outline" color={"grey"} size={12}></MaterialCommunityIcons></Text>
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

    informations: {
        color : "#3f72af",
        fontSize : 10,
        left : 90,
        top : -20
    }
});
export default LastMessage;