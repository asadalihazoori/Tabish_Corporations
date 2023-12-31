import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Loader from '../components/Loader';
import COLORS from '../conts/colors';
import LeaveStatusAPI from '../ApiServices/Tabish_Server/LeaveStatusAPI';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import CustomAlert from '../components/CustomAlert';

export default function Leaves({ navigation }) {

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
    setAlertBox({ ["showBox"]: true, ["title"]: title, ["message"]: message, ["icon"]: icon, ["confirmBtn"]: confirmBtn });
  };

  const onCloseAlert = () => {
    setAlertBox(prevState => ({ ...prevState, ["showBox"]: false }));
  };

  const fetchAttendanceData = () => {
    LeaveStatusAPI.getLeaveStatus()
      .then((result) => {
        setLoading(false);
        if (result.result) {
          setAttendanceData(result.result);
        }
      }
      )
      .catch(() => {
        setLoading(false);
        handleAlert("Internet Required", 'You are not connected to Network or Server Error.', "wifi-off", false);
      })

  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAttendanceData();
    });

    return unsubscribe;
  }, [navigation]);


  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.leaves_type[1]}</Text>
      <Text style={styles.cell}>{item.total_leaves}</Text>
      <Text style={styles.cell}>{item.leave_availed}</Text>
      <Text style={styles.cell}>{item.leave_remaining}</Text>
    </View>
  );

  return (
    <>
      <Loader visible={loading} />
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.header}>Type</Text>
          <Text style={styles.header}>Allocated</Text>
          <Text style={styles.header}>Availed</Text>
          <Text style={styles.header}>Remaining</Text>
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
              <Text style={styles.text}>No Leaves Record Found !</Text>
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
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(10),
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    color: "#FFFFFF",
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: scale(16),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(15),
    borderBottomWidth: scale(1),
    borderBottomColor: '#DDDDDD',

  },

  cell: {
    fontSize: scale(14),
    width: moderateScale(50),
    color: "#000000",
    marginLeft: 2
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
