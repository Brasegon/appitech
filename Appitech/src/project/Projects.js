import React, { Component } from 'react';
import { AppRegistry } from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView
} from 'react-native';

export default class Craigslist extends Component {

  constructor(props) {
    super(props);
    this.state = { showAlertRegister: false };
    this.state = {
      modalVisible: false,
      userSelected: [],
      data: [
        { id: 1, name: "T6 - Part-time job", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29 00:30:00', end: '2021-06-29 01:30:00', count: 0, register: false},
        { id: 2, name: "T6 - PCP Development", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29 00:30:00', end: '2021-06-29 01:30:00',  count: 1, register: false },
        { id: 3, name: "T6 - Binary Security", image: "https://img.icons8.com/clouds/1000/000000/module.png", start: '2021-06-29 00:30:00', end: '2021-06-29 01:30:00',  count: 2, register: true},
        { id: 4, name: "T6 - PHP Framework & REST API", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29 00:30:00', end: '2021-06-29 01:30:00', project: "Noob",  count: 3, register: false},
        { id: 5, name: "T6 - Organizational Theory", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29 00:30:00', end: '2021-06-29 01:30:00',  count: 3, register: false },
        { id: 6, name: "T6 - Organizational Theory", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29 00:30:00', end: '2021-06-29 01:30:00',  count: 3, register: false },
        { id: 7, name: "T6 - Organizational Theory", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29 00:30:00', end: '2021-06-29 01:30:00',  count: 3, register: false },
        { id: 8, name: "T6 - Organizational Theory", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29 00:30:00', end: '2021-06-29 01:30:00',  count: 3, register: false },
        { id: 9, name: "T6 - Organizational Theory", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29 00:30:00', end: '2021-06-29 01:30:00',  count: 3, register: false },
        { id: 10, name: "T6 - Organizational Theory", image: "https://img.icons8.com/bubbles/1000/000000/module.png", start: '2021-06-29 00:30:00', end: '2021-06-29 01:30:00',  count: 3, register: false },

      ]
    };
  }

  eventClicked = (data) => {
    this.showAlertRegister(data);
  };

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
      projects: data.project
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
    const { projects } = this.state;

    
    return (
      <View style={styles.container}>
        <View style={styles.title}><Text style={styles.titleText}>Project <MaterialCommunityIcons name="calendar-text" color={"#3f72af"} size={30}></MaterialCommunityIcons></Text></View>
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
          message="Include Project"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Ok"
          confirmText="Module Me"
          confirmButtonColor="#008080"
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
                                  <TouchableOpacity onPress={() => { this.showAlertRegister(item);}}>
                <Image style={styles.image} source={{ uri: item.image }} />
                </TouchableOpacity>
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.calendar}>Start : {item.start}</Text>
                  <Text style={styles.calendar}>End : {item.end}</Text>
                  <Text style={styles.count}>{item.count} crédit(s)</Text>
                  <TouchableOpacity style={styles.followButton} onPress={() => { this.showAlertModule(item);}}>
                      <Text style={styles.followButtonText}>Project(s)</Text>
                  </TouchableOpacity>

                </View>
              </TouchableOpacity>
            )
          }} />
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

  name: {
    fontSize: 18,
    maxWidth: 180,
    flex: 1,
    alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },

  calendar: {
    fontSize: 15,
    alignSelf: 'auto',
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