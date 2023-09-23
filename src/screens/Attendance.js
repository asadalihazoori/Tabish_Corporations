import { View, Text, StyleSheet, Image, TouchableOpacity, Button, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { RadioButton } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-crop-picker';
import Loader from '../components/Loader';
import AccessLocation from '../ApiServices/AccessLocation';
import OpenCage from '../ApiServices/OpenCage';
import AttendanceAPI from '../ApiServices/Tabish_Server/AttendanceAPI';
import COLORS from '../conts/colors';
import CustomAlert from '../components/CustomAlert';
import CheckDistance from '../ApiServices/CheckDistance';
import sessionDetail from '../conts/sessionDetail';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function Attendance({ navigation }) {
  const [loading, setLoading] = React.useState(false);
  const [attendance, submitAttendance] = useState(true);
  const [image, setImage] = useState(null);
  const [distance, setDistance] = useState(null);

  const [alertBox, setAlertBox] = useState({
    showBox: false,
    title: null,
    message: null,
    icon: null,
    confirmBtn: false
  });

  const [data, setData] = React.useState({
    latitude: null,
    longitude: null,
    location: null,
    date: null,
    dummyDate: null,
    time: null,
    macAddress: null,
    checkStatus: 'checkin',
    base64Img: null,
    machine_id: sessionDetail.Id,
    department: sessionDetail.Department,
    date_time: null
  });

  useEffect(() => {
    getAttributes();
  }, [])

  useEffect(() => {
    let intervalId;

    if (attendance) {
      intervalId =
        setInterval(() => {
          var hours = new Date().getHours();
          var min = new Date().getMinutes();
          var sec = new Date().getSeconds();
          var time = `${hours}:${min}:${sec}`;
          setData(prevState => ({ ...prevState, time }));
        }, 1000);
    }

    return () => clearInterval(intervalId);

  }, [attendance]);

  const handleAlert = (title, message, icon, confirmBtn) => {
    setAlertBox(prevState => ({ ...prevState, ["showBox"]: true, ["title"]: title, ["message"]: message, ["icon"]: icon, ["confirmBtn"]: confirmBtn }));
  };

  const onCloseAlert = () => {
    setAlertBox(prevState => ({ ...prevState, ["showBox"]: false }));
  };

  const onConfirmAlert = () => {
    setAlertBox(prevState => ({ ...prevState, ["confirmBtn"]: true }));
    setAlertBox(prevState => ({ ...prevState, ["showBox"]: false }));

    getAttributes();
    submitAttendance(true);
    setImage(null);
    setData(prevState => ({ ...prevState, ['base64Img']: null }));
  };

  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 600,
      height: 800,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setImage(image.path);
      setData(prevState => ({ ...prevState, ['base64Img']: image.data }));

    }).catch(error => {
      handleAlert("Warning", "You Cancelled Image Selection", "image-off", false)

    });
  }

  function getAttributes() {
    AccessLocation.getPermission()
      .then(({ latitude, longitude }) => {
        setData(prevState => ({ ...prevState, ['latitude']: latitude }));
        setData(prevState => ({ ...prevState, ['longitude']: longitude }));

        const distance = CheckDistance({ latitude, longitude });
        setDistance(distance.toFixed(2));
        console.log("distance", distance);
        // if (distance > 75) {
        //   handleAlert("Out of Range", `You are ${distance.toFixed(2)} meters away from WareHouse`, "warehouse", false);
        // }

        OpenCage.getLocation({ latitude, longitude }).then((address) => {

          setData(prevState => ({ ...prevState, ['location']: address }));
        })
          .catch((error) => {
            handleAlert("Internet Required", error, "wifi-off", false);
          })
      })
      .catch((error) => {
        handleAlert("Internet Required", error, "bomb", false);
      });

    const currentDate = new Date();
    const date = currentDate.toISOString().split('T')[0];
    const dummyDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    setData(prevState => ({ ...prevState, date }));
    setData(prevState => ({ ...prevState, dummyDate }));


    DeviceInfo.getMacAddress().then((mac) => {
      setData(prevState => ({ ...prevState, ['macAddress']: mac }));
    });

  }

  function rollCall() {
    if (data.base64Img != null && attendance && distance <= 75) {

      setLoading(true);
      AttendanceAPI.submitAttendance(data)

        .then((result) => {
          if (result.result != null) {
            submitAttendance(false);

            handleAlert("Confirmation", "Attendence Submitted", "clipboard-check-outline", false)
            setLoading(false);
          }
          else {
            handleAlert("Attendence Not Submitted", result.error.data.message, "exclamation-thick", false)
            setLoading(false);
          }
        })
        .catch(error => {
          handleAlert("Internet Required", 'You are not conncted to any Network.', "wifi-off", false)
          setLoading(false);
        });
    }
    else {
      if (!attendance) {
        handleAlert("Attendance Already Submitted", "Do you want to submit again?", "arrow-u-left-bottom-bold", true);
      }
      else if (distance > 75) {
        handleAlert("Out of Range", `You are ${distance} meters away from WareHouse`, "warehouse", false);
      }
      else {
        handleAlert("Alert", "Image Required", "image-remove", false);
      }
    }

  }
  return (

    <View style={{ width: '100%', alignItems: 'center' }}>
      <Loader visible={loading} />

      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: scale(24), fontWeight: 'bold', marginLeft: moderateScale(10), color: "#000000" }}>Attendance</Text>
        </View>

        <View style={{ width: '100%', alignItems: 'center', marginTop: verticalScale(15), }}>

          <TouchableOpacity
            onPress={takePhoto}
            style={{
              width: moderateScale(200), height: moderateScale(200), borderRadius: scale(100), backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center',
            }}>
            {image ? (
              <Image source={{ uri: image }} style={{ width: moderateScale(200), height: moderateScale(200), borderRadius: scale(100) }} />
            ) : (
              <Image source={require('../assets/logo/avatar.png')} style={{ width: moderateScale(140), height: moderateScale(140), borderRadius: scale(50) }} />
            )}
          </TouchableOpacity>



          <View style={{ margin: 5 }}>
            <Text style={[styles.text, { marginTop: verticalScale(10) }]}>Area: <Text style={{ fontSize: scale(14) }}>{data.location} </Text></Text>
            <Text style={[styles.text, { marginTop: verticalScale(10) }]}>Time: <Text style={{ fontSize: scale(14) }}>{data.dummyDate + " " + data.time} </Text></Text>

            <View style={{ width: '100%', marginTop: verticalScale(10) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="checkin" color={COLORS.blue} uncheckedColor={COLORS.blue} onPress={() => setData(prevState => ({ ...prevState, ['checkStatus']: 'checkin' }))} status={data.checkStatus === 'checkin' ? 'checked' : 'unchecked'} />
                <Text style={[styles.text, { fontSize: scale(14) }]}>Check In</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(6) }}>
                <RadioButton value="Checkout" color={COLORS.blue} uncheckedColor={COLORS.blue} onPress={() => setData(prevState => ({ ...prevState, ['checkStatus']: 'Checkout' }))} status={data.checkStatus === 'Checkout' ? 'checked' : 'unchecked'} />
                <Text style={[styles.text, { fontSize: scale(14) }]}>Check Out</Text>
              </View>
            </View>
          </View>


          <TouchableOpacity
            onPress={rollCall}
            activeOpacity={0.7}
            style={styles.touchableOpacity}>
            <Text style={styles.touchableOpacityText}>Submit Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { navigation.navigate("Attendance Report") }}
            activeOpacity={0.7}
            style={styles.touchableOpacity}>
            <Text style={styles.touchableOpacityText}>View Attendance</Text>
          </TouchableOpacity>

        </View>
        <CustomAlert visible={alertBox.showBox} onConfirm={onConfirmAlert} confirmBtn={alertBox.confirmBtn} onClose={onCloseAlert} title={alertBox.title} message={alertBox.message} icon={alertBox.icon} />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(10),
    marginTop: verticalScale(20),
    padding: scale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: scale(0.25),
    shadowRadius: scale(3.84),
    elevation: scale(5),
  },

  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F2F5'
  },

  header: {
    fontWeight: 'bold',
    fontSize: scale(25),
  },

  text: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
    fontFamily: 'Helvetica Neue',
  },

  touchableOpacity: {
    height: verticalScale(50),
    width: moderateScale(260),
    backgroundColor: COLORS.blue,
    marginVertical: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10)
  },

  touchableOpacityText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: scale(16)
  },

  button: {
    backgroundColor: "transparent",
    foregroundColor: "#fff",
  }
});
