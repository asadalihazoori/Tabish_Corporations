import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import sessionDetail from '../conts/sessionDetail';

function Logout() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate('Login');

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
      params: { username: '', password: '' },
    });

    sessionDetail.session_Id = null;
    sessionDetail.Id = null;
    sessionDetail.employee_id = null;
    sessionDetail.emp_code = null;
    sessionDetail.Department = null;
    sessionDetail.shift = null;
    sessionDetail.profile_image = null;

    sessionDetail.employee_name = null;
    sessionDetail.job_title = null;

  }, [navigation]);

  return (
    <View>
      <Text>You have been logged out.</Text>
    </View>
  );
}

export default Logout;
