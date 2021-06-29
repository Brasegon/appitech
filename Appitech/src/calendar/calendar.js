import React, {useState, Component} from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity, 
  Text
} from 'react-native';
import EventCalendar from 'react-native-events-calendar';

//get the size of device
let {width} = Dimensions.get('window');


export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { showAlert: false };
    this.state = {
      modalVisible: false,
      userSelected: [],
      events: [
        { start: '2021-06-29 00:30:00', end: '2021-06-29 01:30:00', title: 'Follow up', summary: 'Cousteau' },
        { start: '2021-06-29 01:30:00', end: '2021-06-29 02:20:00', title: 'Boostrap', summary: 'Sci-fi' },
        { start: '2021-06-29 04:10:00', end: '2021-06-29 04:40:00', title: 'Hackaton trop chiant', summary: 'BDE' },
        { start: '2021-06-29 01:05:00', end: '2021-06-29 01:45:00', title: 'Alpha Workshop', summary: 'Guiness' },
        { start: '2021-06-29 14:30:00', end: '2021-06-29 16:30:00', title: 'Hub Talk', summary: 'Hub' },
        { start: '2021-06-30 01:20:00', end: '2021-06-30 02:20:00', title: 'Workshop 1', summary: 'Cousteau' },
        { start: '2021-06-30 04:10:00', end: '2021-06-30 04:40:00', title: 'Workshop 2', summary: 'Sci-fi' },
        { start: '2021-06-30 00:45:00', end: '2021-06-30 01:45:00', title: 'Workshop 3', summary: 'Retro' },
        { start: '2021-06-30 11:00:00', end: '2021-06-30 12:30:00', title: 'PCP', summary: 'Cousteau' },
  ]

    };
  }
  
  
  
   eventClicked = (events) => {
    this.showAlert(events);
  };
  
  
 showAlert = (events) => {
  this.setState({
    showAlert: true,
    titre: events.title,
    description: `${events.summary}\n${events.start} ${events.end}`
  });
};

 hideAlert = () => {
  this.setState({
    showAlert: false
  });
};
 
  render() {
    const { showAlert } = this.state;
    const { titre } = this.state;
    const {description} = this.state;
  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <EventCalendar
          eventTapped={this.eventClicked.bind(this)}
          events={this.state.events}
          width={width}
          size={60}
          initDate={new Date()}
          scrollToFirst
        />
        
        
      </View>
      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={titre}
          message={description}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Close"
          confirmButtonColor="#2ca9e7"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
    </SafeAreaView>
  );
      }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});