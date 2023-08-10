import React, { useEffect } from 'react'
import { BackHandler, View, StyleSheet } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Attendance from './Attendance'
import ViewAttendance from './ViewAttendance'
import Profile from './Profile'
import Logout from './Logout'
import sessionDetail from '../conts/sessionDetail';
import COLORS from '../conts/colors';
import Calender from './Calender';
import Leaves from './Leaves';
import Loans from './Loans';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const ODrawer = createDrawerNavigator();

export default function DrawerNavigation() {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);


  const CustomDrawerContent = (props) => {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: 'row', marginTop: verticalScale(14) }}>
                <Avatar.Image
                  source={{ uri: sessionDetail.profile_image }}
                  size={100}
                />
                <View style={{ marginLeft: moderateScale(10), flexDirection: 'column', marginTop: verticalScale(20) }}>
                  <Title style={styles.title}>{sessionDetail.employee_name}</Title>
                  <Caption style={styles.caption}>{sessionDetail.job_title}</Caption>
                </View>
              </View>
            </View>

            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="account-outline" color={color} size={scale(size)} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Profile</Text>}
                onPress={() => {
                  props.navigation.navigate('Profile');
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="home-outline" color={color} size={scale(size)} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Attendance</Text>}
                onPress={() => {
                  props.navigation.navigate('Attendance');
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="file-eye-outline" color={color} size={scale(size)} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Attendance Report</Text>}
                onPress={() => {
                  props.navigation.navigate('Attendance Report');
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="calendar" color={color} size={scale(size)} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Calender</Text>}
                onPress={() => {
                  props.navigation.navigate('Calender');
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="exit-run" color={color} size={scale(size)} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Leave Status</Text>}
                onPress={() => {
                  props.navigation.navigate('Leave Status');
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="currency-rupee" color={color} size={scale(size)} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Loans /Advances</Text>}
                onPress={() => {
                  props.navigation.navigate('Loans / Advances');
                }}
              />
            </Drawer.Section>

          </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="exit-to-app" color={color} size={scale(size)} style={{ color: COLORS.blue }} />
            )}
            label={() => <Text style={{ color: COLORS.black }}> Logout</Text>}
            onPress={() => {
              props.navigation.navigate('Logout');
            }}
          />
        </Drawer.Section>
      </View>
    );
  };

  return (
    <ODrawer.Navigator
      initialRouteName="Attendance"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <ODrawer.Screen name="Attendance" component={Attendance} />
      <ODrawer.Screen name="Attendance Report" component={ViewAttendance} />
      <ODrawer.Screen name="Logout" component={Logout} />
      <ODrawer.Screen name="Profile" component={Profile} />
      <ODrawer.Screen name="Calender" component={Calender} />
      <ODrawer.Screen name="Leave Status" component={Leaves} />
      <ODrawer.Screen name="Loans / Advances" component={Loans} />

    </ODrawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: moderateScale(18),
  },
  title: {
    fontSize: scale(14),
    marginTop: verticalScale(3),
    fontWeight: 'bold',
  },
  caption: {
    fontSize: scale(8),
    lineHeight: scale(14),
  },
  drawerSection: {
    marginTop: verticalScale(14),
  },
  bottomDrawerSection: {
    marginBottom: verticalScale(14),
    borderTopColor: '#f4f4f4',
    borderTopWidth: scale(1),
  },

});