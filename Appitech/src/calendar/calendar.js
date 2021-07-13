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
      onIntra : false,
      onLoading : true,
      modalVisible: false,
      userSelected: [],
      events: [
        /*{ start: '2021-07-12 00:30:00', end: '2021-07-12 01:30:00', title: 'Presentation - MSc Pro', summary: 'Cousteau', registered: true },
        { start: '2021-07-12 01:30:00', end: '2021-07-12 02:20:00', title: 'Boostrap', summary: 'Sci-fi', registered: false  },
        { start: '2021-07-12 04:10:00', end: '2021-07-12 04:40:00', title: 'Hackaton trop chiant', summary: 'BDE', registered: true },
        { start: '2021-07-12 01:05:00', end: '2021-07-12 01:45:00', title: 'Alpha Workshop', summary: 'Guiness', registered: true },
        { start: '2021-07-12 14:30:00', end: '2021-07-12 16:30:00', title: 'Hub Talk', summary: 'Hub' , registered: true},
        { start: '2021-07-13 01:20:00', end: '2021-07-13 02:20:00', title: 'Workshop 1', summary: 'Cousteau' , registered: true},
        { start: '2021-07-13 04:10:00', end: '2021-07-13 04:40:00', title: 'Workshop 2', summary: 'Sci-fi', registered: true },
        { start: '2021-07-13 00:45:00', end: '2021-07-13 01:45:00', title: 'Workshop 3', summary: 'Retro', registered: true },
        { start: '2021-07-13 11:00:00', end: '2021-07-13 12:30:00', title: 'PCP', summary: 'Cousteau', registered: true },
      */]

    };
  }
  
  
  componentDidMount() {
    this.getInfo();
  }

  async getInfo() {
    var res = await httpClient('/calendar', 'get');
    //res.message["summary"] = res.message["summary", "code"]
    this.setState(
      {
        events: res.message,
      }
    )
    this.setState({ loading: false });
    console.log(res);
  }

   eventClicked = (events) => {
    this.showAlert(events);
  };
  
  
 showAlert = (events) => {
  this.setState({
    showAlert: true,
    titre: events.title,
    description: `${events.summary}\n${events.start}\n${events.end}`
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
          showCancelButton={true}
          showConfirmButton={false}
          confirmText="tu n'as rien vus"
          cancelText="Close"
          confirmButtonColor="#2ca9e7"
          onCancelPressed={() => {
            this.hideAlert();
          }}
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