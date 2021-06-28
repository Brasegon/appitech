import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from './carousel';
import Login from '../login/connection/connection'
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';

const Home = ({isConnected, onConnected}) => {
  const [isVisible, setIsVisible] = useState(false)
  const navigation = useNavigation();
  
  useEffect(() => {
    // if (isConnected == false) {
    //   navigation.navigate('Login');
    // }
  }, [])
    return (
      <ScrollView >   
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View >
        <LinearGradient colors={['#2F80ED', '#56CCF2']} style={styles.top}>
          <Text style={styles.title}>Hey Valentin,</Text>
          <Text style={styles.subTitle}>Have a good day!</Text>
          </LinearGradient>
        </View>
        <View style={styles.containerTop}>
          <Text style={{ fontSize: 25,  color: '#053742', fontWeight: 'bold', top: 15, left: 25 }}> Next Activity</Text>
            <View style={{top:15}}>
              <MaterialCommunityIcons name="calendar-blank-multiple" color={"#0f4c75"} size={50} style={{ position: "absolute", top: 20, left: 20 }} />
              <Text style={{ fontSize: 17, left: 90, top: 15, width: 250, paddingBottom: 5 }}>Review projet de fin d'année</Text>
              <Text style={{ fontSize: 13, left: 90, top: 15, width: 250, color: 'grey' }}>Salle Scifi <MaterialCommunityIcons name="sign-direction" color={"grey"} size={15} /></Text>
              <Text style={{ fontSize: 13, left: 90, top: 15, width: 250, color: 'grey' }}>11h30 <MaterialCommunityIcons name="clock-time-eight-outline" color={"grey"} size={15} /></Text>
          </View>
        </View>
        <View style={{top:-45}}>
          <Text style={styles.partTitle}>Current projects</Text>
          <Carousel/>
          </View>
        <Text style={styles.partTitle}>Last Marks</Text>
      </View>
      </ScrollView>
    );
  }

const styles = StyleSheet.create({
  containerTop: {
    position:'relative',
    backgroundColor: 'white',
    top : -80,
    height: 150,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20,
    shadowColor: "#39A2DB",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 1,
    shadowRadius: 16.00,
      elevation: 20
  },
  partTitle: {
    color : '#053742',
    fontSize : 25,
    marginLeft : 30,
    fontWeight: 'bold',
    marginBottom:20
  },
  top: {
      height : 220,
      backgroundColor : 'blue',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25
  },
  container: {
    backgroundColor: '#7cb1c1',
    height : 800,
    borderRadius : 25
  },
  title: {
    color : 'white',
    fontSize : 20,
    marginLeft : 30,
    marginTop : 45,
    fontWeight: 'bold'
  },
  subTitle : {
    color : '#053742',
    fontSize : 25,
    marginLeft : 30,
    marginTop : 3,
    fontWeight: 'bold'
  },
  tinyLogo : {
    height : 60,
    width : 235,
    top : 20,
    left : 25
  }
});

export default Home;