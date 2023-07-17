import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/screens/DrawerNavigation';
const Stack = createStackNavigator();

export default function App() {
    console.log("App.js Called");
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name='Login' component={Login}
                    options={{ headerShown: false }} />
                <Stack.Screen name='DrawerNavigation' component={DrawerNavigation}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}
