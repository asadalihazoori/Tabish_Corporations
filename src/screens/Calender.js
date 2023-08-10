import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import COLORS from '../conts/colors';
import { scale, verticalScale } from 'react-native-size-matters';

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
    borderRadius: scale(10),
    marginTop: verticalScale(20),
    padding: scale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: scale(0.25),
    shadowRadius: scale(3.84),
    elevation: scale(5),
  }
});