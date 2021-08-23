import React, { Component } from 'react';
import { AppRegistry } from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AnimatedLoader from "react-native-animated-loader";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ProgressBarAndroid,
  Alert,
  ScrollView
} from 'react-native';
import SpinkitButton from 'react-native-spinkit-button';
import { IconButton, Colors } from 'react-native-paper';

export default class Craigslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlertRegister: false,
      modalVisible: false,
      loading: true,
      titre : "",
      projects:[],
      isProject: false,
      userSelected: [],
      tmp: "register",
      data: [
        //   { id: 1, name: "T6 - Part-time job", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29', end: '2021-06-29', count: 0, register: false},
        //   { id: 2, name: "T6 - PCP Development", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29', end: '2021-06-29',  count: 1, register: false },
        //   { id: 3, project: "Noob", start_project: '2021-06-29', end_project: '2021-06-29', name: "T6 - Binary Security", image: "https://img.icons8.com/clouds/1000/000000/module.png", start: '2021-06-29', end: '2021-06-29',  count: 2, register: true},
        //   { id: 4, name: "T6 - PHP Framework & REST API", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29', end: '2021-06-29', count: 3, register: false},
        //   { id: 5, name: "T6 - Organizational Theory", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29', end: '2021-06-29',  count: 3, register: false },
        //   { id: 6, name: "T6 - Organizational Theory", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29', end: '2021-06-29',  count: 3, register: false },
        //   { id: 7, name: "T6 - Organizational Theory", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29', end: '2021-06-29',  count: 3, register: false },
        //   { id: 8, name: "T6 - Organizational Theory", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29', end: '2021-06-29',  count: 3, register: false },
        //   { id: 9, name: "T6 - Organizational Theory", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29', end: '2021-06-29',  count: 3, register: false },
        //   { id: 10, name: "T6 - Organizational Theory", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29', end: '2021-06-29',  count: 3, register: false },
      ]
    };
  }


  componentDidMount() {
    this.getInfo();
  }




  async getInfo() {
    var res = await httpClient('/modules', 'get');
    this.setState(
      {
        data: res.message,
      }
    )
    this.setState({ loading: false });
  }

  async registerOrUnregisterProject(link)
  {
    var res = await httpClient('/link', 'post', {link:link});
    console.log(res);
  }

  async showAlertModule(data, tmp) {
    this.setState({ loading: true });
    var projects = await httpClient('/modules/projects?codeinstance=' + data.codeinstance + '&scholaryear=' + data.scolaryear + '&codemodule=' + data.code, 'get');
    this.setState({ loading: false });
    this.setState({
      titre: data.name,
      isProject: true,
      projects : projects.message,
    });
  };

  async registerOrUnregisterModule(link, index)
  {
    var res = await httpClient('/link', 'post', {link:link});
    console.log(res);
    if (res.message && res.message.message) {
      Alert.alert(
        "Modules",
        res.message.message,
        [
          { text: "OK"}
        ]
      );
    } else {
      Alert.alert(
        "Modules",
        "Register/Unregister successfully",
        [
          { text: "OK"}
        ]
      );
    }
    
  }

  render() {
    const { showAlertModule } = this.state;
    const { titre } = this.state;
    const { project_titre } = this.state;
    const { project_start } = this.state;
    const { project_end } = this.state;
    const { status } = this.state;
    const redirectModule = () => {
      this.setState(
        {
          isProject: false
        }
      );
    };

    const progressStyles = StyleSheet.create({
      containerStyle: {
        flex: 1,
        justifyContent: 'space-evenly',
      },
    });
    if (this.state.loading) {
      return (<View style={styles.container}>
        {this.state.loading &&
          <AnimatedLoader
            visible={this.state.loading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("../login/loader.json")}
            animationStyle={styles.lottie}
            speed={1}
          />}</View>)
    } else {
      if (this.state.isProject == false) {
        return (
          <View style={styles.container}>
            <View style={styles.title}><Text style={styles.titleText}>Modules <MaterialCommunityIcons name="folder-open-outline" color={"#3f72af"} size={30}></MaterialCommunityIcons></Text></View>
            <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.data}
              keyExtractor={(item) => {
                return item.name + "-" + item.id;
              }}
              renderItem={({ item, index }) => {
                return (

                  <View style={styles.card} >
                    <View>
                      {item.register && <View><Image style={styles.image} source={{ uri: "https://img.icons8.com/clouds/1000/000000/module.png" }} /><Text style={{ fontSize: 10, color: '#85CFCC', alignSelf: 'center' }}>Registered</Text></View>}
                      {!item.register && <View><Image style={styles.image} source={{ uri: "https://img.icons8.com/bubbles/1000/000000/module.png" }} /><Text style={{ fontSize: 10, color: '#FBCD59', alignSelf: 'center' }}>Not Registered</Text></View>}
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.count}>{item.count} credit(s)</Text>
                      <View style={progressStyles.containerStyle}>
                        <ProgressBarAndroid
                          style={styles.bar}
                          styleAttr="Horizontal"
                          indeterminate={false}
                          progress={item.advance}
                          color="#2196F3"
                        />
                      </View>
                      <Text style={styles.calendarStart}>{item.start} <MaterialCommunityIcons name="clock-start" color={"grey"} size={20} /></Text>
                      <Text style={styles.calendarEnd}>{item.end}</Text>
                      <TouchableOpacity style={styles.followButton} onPress={() => { this.showAlertModule(item, index); }}>
                        <Text style={styles.followButtonTextBase}>Project(s)</Text>
                      </TouchableOpacity>
                      {item.register && <TouchableOpacity style={styles.followButtonRegister} onPress={() => { this.registerOrUnregisterModule(item.unregister_link, index); }}>
                        <Text style={styles.followButtonText}>Unregister</Text>
                      </TouchableOpacity> }

                      {!item.register && <TouchableOpacity style={styles.followButtonRegisterTrue} onPress={() => { this.registerOrUnregisterModule(item.register_link, index); }}>
                        <Text style={styles.followButtonTextTrue}>Register</Text>
                      </TouchableOpacity> }

                    </View>
                  </View>
                )
              }} />

          </View>)
      }
      else {
        if (this.state.loading) {
          return (<View style={styles.container}>
            {this.state.loading &&
              <AnimatedLoader
                visible={this.state.loading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../login/loader.json")}
                animationStyle={styles.lottie}
                speed={1}
              />}</View>)
        } else {
        return (
          <View style={styles.container}>
           
            <View style={styles.titleProject}>
              <View style={{marginBottom:30}}></View>
    

              <IconButton
                                icon="arrow-left-thick"
                                color="#0f4c75"
                                size={35}
                                style={styles.logout}
                                onPress={redirectModule}
                            />

              <Text style={styles.titleTextProject}>{this.state.titre}</Text>

            </View>


          <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.projects}
              keyExtractor={(item) => {
                return item.title;
              }}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cardProject} >
                    <View>
                      {item.registered && <View><Image style={styles.image} source = {require('../../Asset/modules-icon-2.jpg')} /><Text style={{ fontSize: 10, color: '#85CFCC', alignSelf: 'center' }}>Registered</Text></View>}
                      {!item.registered && <View><Image style={styles.image} source = {require('../../Asset/modules-icon-6.jpg')} /><Text style={{ fontSize: 10, color: '#FBCD59', alignSelf: 'center' }}>Not Registered</Text></View>}
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.name}>{item.title}</Text>
                      <View style={progressStyles.containerStyle}>
                        <ProgressBarAndroid
                          style={styles.bar}
                          styleAttr="Horizontal"
                          indeterminate={false}
                          progress={item.advance}
                          color="#2196F3"
                        />
                      </View>
                      <Text style={styles.calendarStart}>{item.start} <MaterialCommunityIcons name="clock-start" color={"grey"} size={20} /></Text>
                      <Text style={styles.calendarEnd}>{item.end}</Text>

                      {item.registered && <TouchableOpacity style={styles.followButtonRegisterProject} onPress={() => { this.registerOrUnregisterProject(item.unregister_link); }}>
                        <Text style={styles.followButtonText}>Unregister</Text>
                      </TouchableOpacity> }

                      {!item.registered && <TouchableOpacity style={styles.followButtonRegisterTrueProject} onPress={() => { this.registerOrUnregisterProject(item.register_link); }}>
                        <Text style={styles.followButtonTextTrue}>Register</Text>
                      </TouchableOpacity> }
                    </View>
                  </View>
                )
              }} />


          </View>
        ); }
      };
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebf0f7"
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7"
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },
  cardProject: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },
  time: {
    left: 70
  },
  name: {
    fontSize: 18,
    maxWidth: 200,
    flex: 1,
    alignSelf: 'auto',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  nameProject: {
    position:'absolute',
    fontSize: 18,
    maxWidth: 200,
    flex: 1,
    alignSelf: 'auto',
    color: "#3399ff",
    fontWeight: 'bold',
  },
  bar: {
    paddingTop: 20,
    marginBottom: -10,
    width: 180
  },
  calendarStart: {
    top: 0,
    fontSize: 15,
  },
  calendarEnd: {
    top: -20,
    left: 105,
    fontSize: 15,
    marginBottom: -15,
  },

  count: {
    fontSize: 12,
    alignSelf: 'auto',
    color: "#6666ff"
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    left : -30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  followButtonRegister: {
    marginTop: -35,
    height: 35,
    width: 100,
    padding: 10,
    left : 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "red",
  },
  followButtonRegisterTrue: {
    marginTop: -35,
    height: 35,
    width: 100,
    padding: 10,
    left : 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "green",
  },
  followButtonRegisterProject: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    left : 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "red",
  },
  followButtonRegisterTrueProject: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    left : 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "green",
  },
  followButtonText: {
    color: "red",
    fontSize: 12,
  },
  followButtonTextBase: {
    color: "#6e6e6e",
    fontSize: 12,
  },
  followButtonTextTrue: {
    color: "green",
    fontSize: 12,
  },
  title: {
    backgroundColor: '#f6f9fb',
    height: 70,

  }, titleProject: {
    backgroundColor: '#f6f9fb',
    height: 130,
  },
  titleText: {
    fontSize: 25,
    color: '#3f72af',
    textAlign: 'center',
    top: 18
  },
  titleTextProject: {
    fontSize: 20,
    color: '#3f72af',
    textAlign: 'center',
    top: 25
  },
  subTitleTextProject: {
    fontSize: 20,
    color: '#3f72af',
    top: 10,
    width : 200,
    left : 50,
  },
  button: {
    marginTop: -10,
    height: 35,
    width: 100,
    padding: 10,
    left : 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "green",
},
textButtonStyle: {
    flex : 1,
    color : "#2887CB",
    textAlign : 'center',
    textAlignVertical: 'center',
    fontSize : 17,
},
labelAndTextContainer: {
    borderWidth: 1,
    width : 120,
    height : 60,
    borderColor: "#2887CB",
    borderRadius: 40,
},
textButtonStyle1: {
    flex : 1,
    color : "#FFAA4C",
    textAlign : 'center',
    textAlignVertical: 'center',
    fontSize : 17,
},
labelAndTextContainer1: {
    borderWidth: 1,
    width : 120,
    height : 60,
    borderColor: "#FFAA4C",
    borderRadius: 40,
},
logout: {
  position : 'absolute',
  left : 0,
  top : 0,
}
});