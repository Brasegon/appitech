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

export default class Craigslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlertRegister: false,
      modalVisible: false,
      loading: true,
      userSelected: [],
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
    this.setState({loading: false});
    console.log(this.state.loading, 'loadign');
    }

  showAlertRegister = (data) => {
    this.setState({
      showAlertRegister: true,
      titre: data.name
    });
  };

  hideAlertRegister = () => {
    this.setState({
      showAlertRegister: false
    });
  };

  showAlertModule = (data) => {
    this.setState({
      showAlertModule: true,
      titre: data.name,
      project_titre: data.project,
      project_start: data.start_project,
      project_end: data.end_project
    });
  };

  hideAlertModule = () => {
    this.setState({
      showAlertModule: false
    });
  };

  clickEventListener = (item) => {
    Alert.alert('Unit description : ' + item.name, 'Binary Security:\n\nTOPICS COVERED:\n\nA study of the vulnerabilities associated with application development. A non-exhaustive list of areas covered:\n\n\t* Reverse Engineering:\n\t* Anti-debugging techniques (Corrupted ELF format, stripped binaries, Packing, checksum on the binary itself, stack corruption, ptrace etc.)\n\t* Different Architectures/Formats: Elf, PE, x86, x64, ARM\n\t* Exploitation\n\t* Vulnerabilities\n\t* Buffer Overflow\n\t* Stack Based\n\t* Heap Based\n\t* Integer Overflow\n\t* Use after free\n\t* Format string\n\t* Techniques\n\t* Debugging (r2 / GDB)\n\t* Ret-to-X (code, libc etc.), Stack pivot, ROP\n\t* Loading binaries (auxvv, GOT / PLT)\n\t* Bypassing protections (NX, ASLR, ASCII-Armor etc.)\n\t* Malloc Des-Maleficarum Houses\n\nTIMELINE:\n\nThere is only one project for this unit. Over the course of the projects duration, the goal is to take advantage of the weaknesses and obtain the permissions or informations for the infrastructures that were set up for the project. It is a platform in which groups of students compete and try to obtain the highest score, sometimes at the cost of the other teams.\n\nBefore the project, some conference held by security experts will be accessible to help you enter into the world of binary security.\n\nVALIDATION CRITERIA:\n\nA broad knowledge of reverse and detecting and exploiting applicative vulnerabilities will be among the criteria needed to validate the unit.')
  };

  render() {
    const { showAlertRegister } = this.state;
    const { showAlertModule } = this.state;
    const { titre } = this.state;
    const { project_titre } = this.state;
    const { project_start } = this.state;
    const { project_end } = this.state;
    const progressStyles = StyleSheet.create({
      containerStyle: {
      flex: 1,
      justifyContent: 'space-evenly',
      },
      });


    
    return (
      <View style={styles.container}>
        {this.state.loading &&
                <AnimatedLoader
                    visible={this.state.loading}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("../login/loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                />}

      {!this.state.loading && this.state.data.length > 0 && <View> 
        <View style={styles.title}><Text style={styles.titleText}>Modules <MaterialCommunityIcons name="calendar-text" color={"#3f72af"} size={30}></MaterialCommunityIcons></Text></View>
        <AwesomeAlert
          show={showAlertRegister}
          showProgress={false}
          data={this.state.data}
          title={titre}
          message="You are Not Registered"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Ok"
          confirmText="Register Me"
          confirmButtonColor="#008080"
          onCancelPressed={() => {
            this.hideAlertRegister();
          }}
          onConfirmPressed={() => {
            this.hideAlertRegister();
          }}
        />
        <AwesomeAlert
          show={showAlertModule}
          showProgress={false}
          data={this.state.data}
          title={titre}
          message={"Project : "+ project_titre + "\n\tStart : " + project_start + "\n\tEnd : " + project_end}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Ok"
          confirmText="Unregister"
          confirmButtonColor="#800000"
          onCancelPressed={() => {
            this.hideAlertModule();
          }}
          onConfirmPressed={() => {
            this.hideAlertModule();
          }}
        />
        <FlatList
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (

              <TouchableOpacity style={styles.card} onPress={() => { this.clickEventListener(item) }}>
                <TouchableOpacity onPress={() => { this.showAlertRegister(item); }}>
                  {item.register && <View><Image style={styles.image} source={{uri: "https://img.icons8.com/clouds/1000/000000/module.png"}}/><Text style={{fontSize:10, color:'#85CFCC', alignSelf:'center'}}>Registered</Text></View>}
                  {!item.register && <View><Image style={styles.image} source={{uri: "https://img.icons8.com/bubbles/1000/000000/module.png"}}/><Text style={{fontSize:10, color:'#FBCD59', alignSelf:'center'}}>Not Registered</Text></View>}
                </TouchableOpacity>
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
                  <TouchableOpacity style={styles.followButton} onPress={() => { this.showAlertModule(item); }}>
                    <Text style={styles.followButtonText}>Project(s)</Text>
                  </TouchableOpacity>

                </View>
              </TouchableOpacity>
            )
          }} />
          </View>
         }
      </View>
    );
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
  time: {
    left : 70
  },  
  name: {
    fontSize: 18,
    maxWidth: 200,
    flex: 1,
    alignSelf: 'auto',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  bar: {
    paddingTop: 20,
    marginBottom : -10,
    width : 180
  },
  calendarStart: {
    top : 0,
    fontSize: 15,
  },
  calendarEnd: {
    top : -20,
    left : 105,
    fontSize: 15,
    marginBottom : -15,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  followButtonText: {
    color: "#6e6e6e",
    fontSize: 12,
  },
  title: {
    backgroundColor: '#f6f9fb',
    height: 70,

  },
  titleText: {
    fontSize: 25,
    color: '#3f72af',
    textAlign: 'center',
    top: 18
  },
});