import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/screens/DrawerNavigation';
const Stack = createStackNavigator();

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to set isLoggedIn to true after successful login
    const handleLoginSuccess = () => {
        console.log('called');
        setIsLoggedIn(true);
        
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isLoggedIn ? 'DrawerNavigation' : 'Login'}>
                
                <Stack.Screen name='Login'  options={{ headerShown: false}}>
                    {(props) => <Login {...props} handleLoginSuccess={handleLoginSuccess} />}
                </Stack.Screen>
                <Stack.Screen name='DrawerNavigation' component={DrawerNavigation}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}
