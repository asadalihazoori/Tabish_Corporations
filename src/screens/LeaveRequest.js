import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Loader from '../components/Loader';
import COLORS from '../conts/colors';
import AttendanceRecord from '../ApiServices/AttendenceRecord';
import { useIsFocused } from '@react-navigation/native';

export default function LeaveRequest({ navigation }) {
  console.log("ViewAttendance.js Called");

  const [loading, setLoading] = React.useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const isFocused = useIsFocused();

  const fetchAttendanceData = useCallback(() => { 
    AttendanceRecord.ViewAttendance()
      .then((result) => {
        if (result) {
          setAttendanceData(result.result)
        }
        else {
          setLoading(false)
        }
      }
      )
      .then(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchAttendanceData();
  }, [fetchAttendanceData, isFocused]);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.time}</Text>
      <Text style={styles.cell}>{item.attendance_status}</Text>
    </View>
  );



  return (

    <View style={styles.container}>
      <Loader visible={loading} />
      <View style={styles.row}>
        <Text style={styles.header}>Date</Text>
        <Text style={styles.header}>Time</Text>
        <Text style={styles.header}>Status</Text>
      </View>
      {/* <FlatList
        data={attendanceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      /> */}
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  header: {
    backgroundColor: COLORS.blue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    color: "#FFFFFF"
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',

  },

  cell: {
    fontSize: 16,
    width: 80,
    color: "#000000",
    // borderColor: 'green',
    // borderWidth: 2,
  },
});
