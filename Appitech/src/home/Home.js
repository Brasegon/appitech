import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from './carousel';
import CarouselMark from './carousselMarks';
import Login from '../login/connection/connection'
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';

const Home = ({isConnected, onConnected}) => {
  const [isVisible, setIsVisible] = useState(false)
  const navigation = useNavigation();

  useEffect(() => {
    if (isConnected == false) {
      navigation.navigate('Login');
    }
  }, [])
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={styles.top}>
          <Text style={styles.title}>Hey Valentin,</Text>
          <Text style={styles.subTitle}>Have a good day!</Text>
        </View>
        <View style={styles.containerTop}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', top: 20, left: 25 }}> Next Activity</Text>
          <View style={{ top: -25 }}>
            <Text style={styles.title}>Prochaine activité</Text>
            <View style={{
              backgroundColor: "#F2F1F7",
              width: 350, left: 15, borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30, height: 100
            }}>
              <MaterialCommunityIcons name="calendar-blank-multiple" color={"#0f4c75"} size={50} style={{ position: "absolute", top: 20, left: 20 }} />
              <Text style={{ fontSize: 17, left: 90, top: 15, width: 250, paddingBottom: 5 }}>Review projet de fin d'année</Text>
              <Text style={{ fontSize: 13, left: 90, top: 15, width: 250, color: 'grey' }}>Salle Scifi <MaterialCommunityIcons name="sign-direction" color={"grey"} size={15} /></Text>
              <Text style={{ fontSize: 13, left: 90, top: 15, width: 250, color: 'grey' }}>11h30 <MaterialCommunityIcons name="clock-time-eight-outline" color={"grey"} size={15} /></Text>
            </View>
          </View>
        </View>
        <Text style={styles.partTitle}>Current projects</Text>
        <Carousel />
        <Text style={styles.partTitle}>Last Marks</Text>
        <CarouselMark />

      </View>
    );
  }
  // <MaterialCommunityIcons name="calendar-blank-multiple" color={"#053742"} size={40}></MaterialCommunityIcons>

const styles = StyleSheet.create({
  containerTop: {
    backgroundColor: '#39A2DB',
    height: 200,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 30,
    shadowColor: "#39A2DB",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 1,
    shadowRadius: 16.00,

    elevation: 20,

  },
  partTitle: {
    color : '#053742',
    fontSize : 25,
    marginLeft : 30,
    marginTop : 35,
    fontWeight: 'bold'
  },
  top: {
      height : 120
  },
  container: {
    backgroundColor: '#7cb1c1',
    height : 800,
    borderRadius : 25
  },
  title: {
    color : '#39A2DB',
    fontSize : 20,
    marginLeft : 30,
    marginTop : 35,
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