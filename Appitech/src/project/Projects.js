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
    this.state = { showAlert: false };
    this.state = {
      modalVisible: false,
      userSelected: [],
      data: [
        { id: 1, name: "T6 - Part-time job", image: "https://img.icons8.com/color/96/000000/module.png", count: 0, },
        { id: 2, name: "T6 - PCP Development", image: "https://img.icons8.com/color/96/000000/module.png", count: 1 },
        { id: 3, name: "T6 - Binary Security", image: "https://img.icons8.com/color/96/000000/module.png", count: 2 },
        { id: 4, name: "T6 - PHP Framework & REST API", image: "https://img.icons8.com/color/96/000000/module.png", count: 3 },
        { id: 5, name: "T6 - Organizational Theory", image: "https://img.icons8.com/color/96/000000/module.png", count: 3 },
        { id: 6, name: "T6 - Organizational Theory", image: "https://img.icons8.com/color/96/000000/module.png", count: 3 },
        { id: 7, name: "T6 - Organizational Theory", image: "https://img.icons8.com/color/96/000000/module.png", count: 3 },
        { id: 8, name: "T6 - Organizational Theory", image: "https://img.icons8.com/color/96/000000/module.png", count: 3 },
        { id: 9, name: "T6 - Organizational Theory", image: "https://img.icons8.com/color/96/000000/module.png", count: 3 },
        { id: 10, name: "T6 - Organizational Theory", image: "https://img.icons8.com/color/96/000000/module.png", count: 3 },

      ]
    };
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  clickEventListener = (item) => {
    Alert.alert('Current activities : ' + item.name, 'NOOB debriefing : 17/05/2021, 08:42 & 23/05/2021, 14:00\n---\nNOOB : 03/05/2021, 08:42 & 16/05/2021, 23:42\n---\nKick-off - Binary Security : 26/04/2021, 08:42 & 18/05/2021, 23:42');
  }
    
  render() {
    const { showAlert } = this.state;
    const itemname = this.name;

    return (
      <View style={styles.container}>
        <View style={styles.title}><Text style={styles.titleText}>Project <MaterialCommunityIcons name="calendar-text" color={"#3f72af"} size={30}></MaterialCommunityIcons></Text></View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Project Name"
          message="You are Not Registered"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Ok"
          confirmText="Register Me"
          confirmButtonColor="#008080"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
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
                <Image style={styles.image} source={{ uri: item.image }} />
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.count}>{item.count} crédit(s)</Text>
                  <TouchableOpacity style={styles.followButton} onPress={() => { this.showAlert();}}>
                      <Text style={styles.followButtonText}>Details</Text>
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
    flex: 1,
    alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  count: {
    fontSize: 15,
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