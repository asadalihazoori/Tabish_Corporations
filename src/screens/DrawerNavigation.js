
import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
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
import LeaveRequest from './LeaveRequest';
import Payslip from './Payslip';
import Loans from './Loans';
import AddCustomer from './AddCustomer';
import CustomerList from './CustomerList';
import UpdateCustomer from './UpdateCustomer';
import Products from './Products';

const ODrawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const CustomDrawerContent = (props) => {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Avatar.Image
                  source={{ uri: sessionDetail.profile_image }}
                  size={100}
                />
                <View style={{ marginLeft: 15, flexDirection: 'column', marginTop: 25 }}>
                  <Title style={styles.title}>{sessionDetail.employee_name}</Title>
                  <Caption style={styles.caption}>{sessionDetail.job_title}</Caption>
                </View>
              </View>
            </View>

            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="account-outline" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Profile</Text>}
                onPress={() => {
                  props.navigation.navigate('Profile');
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="home-outline" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Attendance</Text>}
                onPress={() => {
                  props.navigation.navigate('Attendance');
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="file-eye-outline" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Attendance Report</Text>}
                onPress={() => {
                  props.navigation.navigate('Attendance Report');
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="calendar" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Calender</Text>}
                onPress={() => {
                  props.navigation.navigate('Calender');
                }}
              />
              {/* <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="file-document-multiple-outline" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Payslips</Text>}
                onPress={() => {
                  props.navigation.navigate('Payslip');
                }}
              /> */}
              <DrawerItem
                icon={({ color, size }) => (
                  // <Icon name="list-status" color={color} size={size} style={{ color: COLORS.blue }} />
                  <Icon name="exit-run" color={color} size={size} style={{ color: COLORS.blue }} />
                  // <Icon name="send-check-outline" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Leave Status</Text>}
                onPress={() => {
                  props.navigation.navigate('Leave Status');
                }}
              />
              {/* <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="exit-run" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Leave Request</Text>}
                onPress={() => {
                  props.navigation.navigate('Leave Request');
                }}
              /> */}
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="currency-rupee" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Loans /Advances</Text>}
                onPress={() => {
                  props.navigation.navigate('Loans / Advances');
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="account-multiple-plus-outline" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Add Customer</Text>}
                onPress={() => {
                  props.navigation.navigate('Add Customer');
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  // <Image source={require('../assets/icons/customer.png')} style={{height: size, width: size, tintColor: COLORS.blue}} />
                  <Icon name="account-box-multiple-outline" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Customers List / Update</Text>}
                onPress={() => {
                  props.navigation.navigate('Customers List');
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  // <Image source={require('../assets/icons/customer.png')} style={{height: size, width: size, tintColor: COLORS.blue}} />
                  <Icon name="atom" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Products</Text>}
                onPress={() => {
                  props.navigation.navigate('Products');
                }}
              />
               <DrawerItem
                icon={({ color, size }) => (
                  // <Image source={require('../assets/icons/customer.png')} style={{height: size, width: size, tintColor: COLORS.blue}} />
                  <Icon name="cart-outline" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Orders</Text>}
                onPress={() => {
                  props.navigation.navigate('Customers List');
                }}
              />
            </Drawer.Section>
            
          </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="exit-to-app" color={color} size={size} style={{ color: COLORS.blue }} />
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
      <ODrawer.Screen name="Leave Request" component={LeaveRequest} />
      <ODrawer.Screen name="Payslip" component={Payslip} />
      <ODrawer.Screen name="Loans / Advances" component={Loans} />
      <ODrawer.Screen name="Add Customer" component={AddCustomer} />
      <ODrawer.Screen name="Customers List" component={CustomerList} />
      <ODrawer.Screen name="Update Customers" component={UpdateCustomer} />
      <ODrawer.Screen name="Products" component={Products} />
    </ODrawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 9,
    lineHeight: 14,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  infoIcon: {
    // width: 20,
    // height: 20,

    // backgroundColor: 'red'
  },
});