import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import ProfileAPI from '../ApiServices/ProfileAPI';
import COLORS from '../conts/colors';

export default function CustomerList() {
  const [loading, setLoading] = React.useState(true);
  const [imageSource, setimageSource] = useState(null);
  const [name, setName] = useState(null);
  const [job_title, setJob_id] = useState(null);
  const [identification_id, setIdentification_id] = useState(null);
  const [first_email, setFirst_email] = useState(null);
  const [department_id, setDepartment_id] = useState(null);
  const [phone, setPhone] = useState(null);
  const [home_address, setHome_address] = useState(null);
  const [joining_date, setJoining_date] = useState(null);
  const [manager, setManager] = useState(null);

  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  function getProfile() {
    ProfileAPI.getProfile()
      .then((data) => {
        if (data) {

          const base64String = data.result[0].image;
          setimageSource(`data:image/png;base64,${base64String}`);
          setName(data.result[0].name);
          setJob_id(data.result[0].job_id[1]);
          setPhone(data.result[0].phone);
          setIdentification_id(data.result[0].identification_id);
          setDepartment_id(data.result[0].department_id[1]);
          setFirst_email(data.result[0].first_email);
          setHome_address(data.result[0].home_address);
          setJoining_date(data.result[0].joining_date);
          setManager(data.result[0].parent_id[1])
          setLoading(false);
        }
        else {
          setLoading(false);

        }
      });

  }

  const handlePress = () => {
    setShowInfo(!showInfo);
  };


  if (loading == false) {
    return (
      <View style={{ width: '100%', alignItems: 'center' }}>

        <View style={styles.mainContainer}>
          
          <Text style={styles.headerText}>Customer List</Text>

        </View>
      </View>
    )
  }
  else {
    return (
      <Loader visible={loading} />
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
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
  },
  container: {
    width: '100%',
    backgroundColor: COLORS.blue,
    borderRadius: 10,
    padding: 14,
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: "#000000",
  },

  header: {
    alignItems: 'center',
    marginTop: 10,
  },
  headerText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  infoText: {
    color: '#000000',
    fontSize: 14,
  },
});
