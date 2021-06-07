import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

  
export default class Home extends React.Component {     
  render() {
    return (
      <View style={styles.container}>

              <View style={{ backgroundColor: '#bbe1fa' }}>
        <View style={styles.container2}>
        <Image source={require('../../Asset/Appitech.png')} style={{ width: 230, height: 60, top:20, left: 80 }} />

            </View>
            </View>



        <View style={{ backgroundColor: '#0f4c75' }}>
                  <LinearGradient colors={['#bbe1fa', '#3282b8']} style={styles.container1}>
                <View style={{top:-25}}>
                    <Text style={styles.title}>Prochaine activité</Text>
                    <View style={{backgroundColor:"#F2F1F7",
                                  width:350, left:30, top:60, borderBottomLeftRadius: 30,
                                  borderBottomRightRadius: 30,
                                  borderTopRightRadius: 30,
            borderTopLeftRadius: 30, height: 100}}>
      <MaterialCommunityIcons name="calendar-blank-multiple" color={"#0f4c75"} size={50} style={{position:"absolute", top:20, left:20}} /> 
                    <Text style={{fontSize:17, left:90, top:15, width:250, paddingBottom:5}}>Review projet de fin d'année</Text>
                    <Text style={{fontSize:13, left:90, top:15, width:250, color:'grey'}}>Salle Scifi <MaterialCommunityIcons name="sign-direction" color={"grey"} size={15} /></Text>
                    <Text style={{fontSize:13, left:90, top:15, width:250 , color:'grey'}}>11h30 <MaterialCommunityIcons name="clock-time-eight-outline" color={"grey"} size={15} /></Text>

                    </View>
                    </View>
                  </LinearGradient>
        </View>

    <View style={{ backgroundColor: '#231332' }}>
        <View style={styles.container3}>
            <View style={{top:-30}}>
        <Text style={styles.title}>Projets en cours</Text>
        <View style={{backgroundColor:"#F2F1F7",
                                  width:350, left:30, top:60, borderBottomLeftRadius: 30,
                                  borderBottomRightRadius: 30,
                                  borderTopRightRadius: 30,
            borderTopLeftRadius: 30, height: 140}}>
      <MaterialCommunityIcons name="folder-open-outline" color={"#0f4c75"} size={50} style={{position:"absolute", top:20, left:20}} /> 
                    <Text style={{fontSize:17, left:90, top:15, width:250, paddingBottom:5}}>Epicture</Text>
                    <Text style={{fontSize:17, left:90, top:15, width:250, paddingBottom:5}}>E-Commerce</Text>
                    <Text style={{fontSize:17, left:90, top:15, width:250, paddingBottom:5}}>My_FTP</Text>
                    <Text style={{fontSize:17, left:90, top:15, width:250, paddingBottom:5}}>Minishell2</Text>

                    </View>
                    </View>
                    <View style={{marginTop:20}}>
                    <Text style={styles.title}>Dernières notes</Text>
        <View style={{backgroundColor:"#F2F1F7",
                                  width:350, left:30, top:60, borderBottomLeftRadius: 30,
                                  borderBottomRightRadius: 30,
                                  borderTopRightRadius: 30,
            borderTopLeftRadius: 30, height: 90}}>
      <MaterialCommunityIcons name="checkbox-marked-outline" color={"#0f4c75"} size={50} style={{position:"absolute", top:20, left:20}} /> 
                    <Text style={{fontSize:17, left:90, top:15, width:250, paddingBottom:5}}>Devops : <Text style={{color : "#0f4c75"}}>A</Text></Text>
                    <Text style={{fontSize:17, left:90, top:15, width:250, paddingBottom:5}}>Java : <Text style={{color : "#0f4c75"}}>B</Text></Text>
                    </View>
                    </View>

        </View>
    </View>


      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container1: {
    height: 230,
    padding: 10,
    borderBottomLeftRadius:100,
  },
  container2: {
    backgroundColor: 'white',
    height: 130,
    padding: 10,
    borderBottomLeftRadius:100,
  },
  container3: {
      backgroundColor : '#0f4c75',
    height: 600,
    padding: 10,
    borderBottomLeftRadius:100,
  },
  title: {
      fontSize: 20,
      color : 'white',
      left : 50,
      top : 45

  }
});