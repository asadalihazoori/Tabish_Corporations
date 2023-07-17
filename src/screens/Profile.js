import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import ProfileAPI from '../ApiServices/ProfileAPI';
import COLORS from '../conts/colors';

export default function Profile() {
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
          <View style={styles.header}>
            <Image source={{ uri: imageSource }} style={styles.profileImage} />
            <Text style={styles.name}>{name}</Text>
          </View>

          <View style={[styles.container, { backgroundColor: "#de3745" }]}>
            <Text style={styles.headerText}>Job Information</Text>
          </View>
          <View>
            {job_title && (
              <View style={styles.infoRow}>
                <Image source={require('../assets/icons/job.jpg')} style={styles.infoIcon} />
                <Text style={styles.infoText}>Job Title: {job_title}</Text>
              </View>
            )}

            {department_id && (
              <View style={styles.infoRow}>
                <Image source={require('../assets/icons/department.png')} style={styles.infoIcon} />
                <Text style={styles.infoText}>Department: {department_id}</Text>
              </View>
            )}
            {manager && (
              <View style={styles.infoRow}>
                <Image source={require('../assets/icons/manager.png')} style={styles.infoIcon} />
                <Text style={styles.infoText}>Manager: {manager}</Text>
              </View>
            )}
          </View>

          {joining_date && (
            <View style={styles.infoRow}>
              <Image source={require('../assets/icons/calendar.png')} style={styles.infoIcon} />
              <Text style={styles.infoText}>Joined on {joining_date}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Text style={styles.headerText}>Personal Information</Text>
          </TouchableOpacity>

          {showInfo && (
            <View>
              {identification_id && (
                <View style={styles.infoRow}>
                  <Image source={require('../assets/icons/id-card.png')} style={styles.infoIcon} />
                  <Text style={styles.infoText}>CNIC: {identification_id}</Text>
                </View>
              )}
              {phone && (
                <View style={styles.infoRow}>
                  <Image source={require('../assets/icons/telephone.png')} style={styles.infoIcon} />
                  <Text style={styles.infoText}>{phone}</Text>
                </View>
              )}
              {first_email && (
                <View style={styles.infoRow}>
                  <Image source={require('../assets/icons/email.png')} style={styles.infoIcon} />
                  <Text style={styles.infoText}>{first_email}</Text>
                </View>
              )}
              {home_address && (
                <View style={styles.infoRow}>
                  <Image source={require('../assets/icons/location.png')} style={styles.infoIcon} />
                  <Text style={styles.infoText}>{home_address}</Text>
                </View>
              )}
            </View>
          )}

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
    color: "#FFFFFF",
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
