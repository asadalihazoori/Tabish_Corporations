import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import Loader from '../components/Loader';
import COLORS from '../conts/colors';
import AttendanceRecord from '../ApiServices/Tabish_Server/AttendenceRecord';
import { useIsFocused } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CustomAlert from '../components/CustomAlert';

export default function ViewAttendance({ navigation }) {

  const [loading, setLoading] = React.useState(true);
  const [attendanceData, setAttendanceData] = useState([]);

  const [alertBox, setAlertBox] = useState({
    showBox: false,
    title: null,
    message: null,
    icon: null,
    confirmBtn: false
  });

  const handleAlert = (title, message, icon, confirmBtn) => {
    setAlertBox(prevState => ({ ...prevState, ["showBox"]: true, ["title"]: title, ["message"]: message, ["icon"]: icon, ["confirmBtn"]: confirmBtn }));
  };

  const onCloseAlert = () => {
    setAlertBox(prevState => ({ ...prevState, ["showBox"]: false }));
  };

  const fetchAttendanceData = () => {
    AttendanceRecord.ViewAttendance()
      .then((result) => {
        setLoading(false)
        if (result.result) {
          setAttendanceData(result.result)
        }
        else {
          handleAlert("Odoo Server Error", result.error.data.message, "server-off", false);
        }
      }
      )
      .catch(() => {
        setLoading(false);
        handleAlert("Internet Required", 'You are not connected to Network or Server Error.', "wifi-off", false);

      })
  };

  const TimeFormattor = (inputTime) => {

    const [hours, minutes, seconds] = inputTime.split(':');
    const formattedHours = parseInt(hours) > 12 ? parseInt(hours) - 12 : hours == 0 ? 12 : hours;
    const amOrPm = parseInt(hours) >= 12 ? 'PM' : 'AM';

    const formattedTime = `${formattedHours}:${minutes}:${seconds} ${amOrPm}`;
    return formattedTime;
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAttendanceData();
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={[styles.cell, { marginRight: 0 }]}>{TimeFormattor(item.time)}</Text>
      <Text style={[styles.cell, { marginLeft: 0 }]}>{item.attendance_status == 'checkin' ? 'CheckIn' :
        (item.attendance_status == 'Checkout') ? 'CheckOut' :
          (item.attendance_status == false) ? 'Not Found' :
            `${item.attendance_status}`}</Text>
    </View>
  );



  return (
    <>
      <Loader visible={loading} />
      <View style={styles.container}>
        <View style={[styles.row, { columnGap: 30 }]}>
          <Text style={[styles.header, { textAlign: 'center' }]}>Time</Text>
          <Text style={[styles.header, { textAlign: 'center' }]}>Date</Text>
          <Text style={[styles.header, { textAlign: 'center' }]}>Status</Text>
        </View>

        {loading ? <></> :
          attendanceData.length > 0 ?
            <FlatList
              data={attendanceData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
            :
            <View style={styles.nullContainer}>
              <Text style={styles.text}>No Attendance Record Found !</Text>
            </View>
        }
        <CustomAlert visible={alertBox.showBox} onClose={onCloseAlert} title={alertBox.title} message={alertBox.message} icon={alertBox.icon} />
      </View>
    </>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(10),
    backgroundColor: '#ffffff',
    borderRadius: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: scale(0.25),
    shadowRadius: scale(3.84),
    elevation: scale(5),
  },

  header: {
    backgroundColor: COLORS.blue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(10),
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    width: moderateScale(85),
    color: "#FFFFFF"
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: scale(16),
  },

  row: {
    flexDirection: 'row',
    columnGap: moderateScale(30),
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(15),
    borderBottomWidth: scale(1),
    borderBottomColor: '#DDDDDD',

  },

  cell: {
    fontSize: scale(14),
    width: moderateScale(87),
    color: "#000000",
  },

  nullContainer: {
    marginTop: verticalScale(50),
    alignContent: 'center',
    textAlign: 'center',

  },

  text: {
    fontSize: scale(16),
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center'
  }
});
