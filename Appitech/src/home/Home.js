import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  RefreshControl
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from './carousel';
import Login from '../login/connection/connection'
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import LastMessage from './LastMessage';
import AnimatedLoader from "react-native-animated-loader";
import Down from "../down/IntraDown"
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');
const Home = ({isConnected, onConnected}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [resMessage, setResMessage] = useState([]);
  const [intra, onIntra] = useState(false);
  const navigation = useNavigation();
  const [loading, onLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(false);
    onLoading(true);
    getInfo();
  }, []);

  useAsync();
    function useAsync() {
        useEffect(() => {
            getInfo();
            console.log(height)
        }, []);
    }

    async function getInfo() {
        var message = await httpClient('/messages', 'get');
        if (message.code === 5000) {
          onIntra(true);
        }
        setResMessage(message.message);
        onLoading(false);
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
                    source={require("../login/loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                />}

      {!loading &&
      !intra &&
        <View >
          
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
        <Text style={styles.partTitle}>Last message</Text>
        {resMessage.length > 0 && <LastMessage resMessage={resMessage}/>}
      </View>
      </View>

}{!loading &&
      intra && 
        <View style={styles.test} >
          <Down/>
      </View>

}
</ScrollView>
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