import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Loader from '../components/Loader';
import COLORS from '../conts/colors';
import { useIsFocused } from '@react-navigation/native';
import LeaveStatusAPI from '../ApiServices/LeaveStatusAPI';

export default function Leaves({ navigation }) {
  console.log("ViewAttendance.js Called");

  const [loading, setLoading] = React.useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const isFocused = useIsFocused();

  const fetchAttendanceData = useCallback(() => { 
    LeaveStatusAPI.getLeaveStatus()
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
      <Text style={styles.cell}>{item.leaves_type[1]}</Text>
      <Text style={styles.cell}>{item.total_leaves}</Text>
      <Text style={styles.cell}>{item.leave_availed}</Text>
      <Text style={styles.cell}>{item.leave_remaining}</Text>
    </View>
  );

  return (

    <View style={styles.container}>
      <Loader visible={loading} />
      <View style={styles.row}>
        <Text style={styles.header}>Type</Text>
        <Text style={styles.header}>Allocated</Text>
        <Text style={styles.header}>Availed</Text>
        <Text style={styles.header}>Remaining</Text>
      </View>
      <FlatList
        data={attendanceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
    // borderWidth: 2,
    // borderColor: "green"
  },

  header: {
    backgroundColor: COLORS.blue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    color: "#FFFFFF",
    // borderWidth: 2,
    // borderColor: "blue"

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
    marginLeft: 2
  },
});
