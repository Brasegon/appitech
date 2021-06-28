import React, {useState} from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import EventCalendar from 'react-native-events-calendar';

//get the size of device
let {width} = Dimensions.get('window');

const Calendar = () => {
    const events = [
        { start: '2021-06-22 00:30:00', end: '2021-06-22 01:30:00', title: 'Follow up', summary: 'Cousteau' },
        { start: '2021-06-22 01:30:00', end: '2021-06-22 02:20:00', title: 'Boostrap', summary: 'Sci-fi' },
        { start: '2021-06-22 04:10:00', end: '2021-06-22 04:40:00', title: 'Hackaton trop chiant', summary: 'BDE' },
        { start: '2021-06-22 01:05:00', end: '2021-06-22 01:45:00', title: 'Alpha Workshop', summary: 'Guiness' },
        { start: '2021-06-22 14:30:00', end: '2021-06-22 16:30:00', title: 'Hub Talk', summary: 'Hub' },
        { start: '2021-06-23 01:20:00', end: '2021-06-23 02:20:00', title: 'Workshop 1', summary: 'Cousteau' },
        { start: '2021-06-23 04:10:00', end: '2021-06-23 04:40:00', title: 'Workshop 2', summary: 'Sci-fi' },
        { start: '2021-06-23 00:45:00', end: '2021-06-23 01:45:00', title: 'Workshop 3', summary: 'Retro' },
        { start: '2021-06-23 11:00:00', end: '2021-06-23 12:30:00', title: 'PCP', summary: 'Cousteau' },
  ];

  const eventClicked = (event) => {
    //On Click oC a event showing alert from here
    alert(JSON.stringify(event));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <EventCalendar
          eventTapped={eventClicked}
          // Function on event press
          events={events}
          // Passing the Array of event
          width={width}
          // Container width
          size={60}
          initDate={new Date()}
          //scrollToFirst
          // Scroll to first event of the day (default true)
        />
      </View>
    </SafeAreaView>
  );
};
export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});