import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import COLORS from '../conts/colors';

const MyCalendar = () => {

  const theme = {
    arrowColor: COLORS.blue,
    monthTextColor: COLORS.blue,
    todayTextColor: COLORS.blue,
    selectedDayTextColor: COLORS.blue,
    selectedDayBackgroundColor: COLORS.blue

  };
  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={styles.container}>

        <Calendar theme={theme} />

      </View>
    </View>
  );
};

export default MyCalendar;


const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});