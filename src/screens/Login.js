import { View, Text, StyleSheet, Image, SafeAreaView, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../conts/colors';
import CustomButton from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import LoginAPI from '../ApiServices/Tabish_Server/LoginAPI';
import ErrorBox from '../components/ErrorBox';

export default function Login({ navigation, route, handleLoginSuccess }) {
    const [inputs, setInputs] = React.useState({
        username: null,
        password: null,
    });
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const [alertBox, setAlertBox] = useState({
        showBox: false,
        title: null,
        message: null
    });

    const onCloseAlert = () => {
        setAlertBox(prevState => ({ ...prevState, ["showBox"]: false }));
    };


    function login() {
        setLoading(true);

        LoginAPI.LoginUser(inputs)
            .then(response => {
                console.log("user_id", response);
                if (Number.isInteger(response)) {
                    LoginAPI.getEmployee(response)
                        .then(employee => {
                            console.log("employee", employee)
                            if (Number.isInteger(employee)) {
                                setLoading(false);
                                handleLoginSuccess();
                                navigation.navigate("DrawerNavigation");
                            }
                            else {
                                setLoading(false);
                                setAlertBox(prevState => ({ ...prevState, ["showBox"]: true, ["title"]: "Employee not found", ["message"]: employee }));
                            }
                        })
                        .catch((error) => {
                            setLoading(false);
                            console.log(error)
                            setAlertBox(prevState => ({ ...prevState, ["showBox"]: true, ["title"]: "Internet Required", ["message"]: error }));
                        })

                }
                else if (response == false) {
                    setLoading(false);
                    handleError('', 'username');
                    handleError('Incorrect username or password', 'password');
                    return false;
                }

            })
            .catch((error) => {
                setLoading(false);
                setAlertBox(prevState => ({ ...prevState, ["showBox"]: true }));
                setAlertBox(prevState => ({ ...prevState, ["title"]: "Internet Required" }));
                setAlertBox(prevState => ({ ...prevState, ["message"]: error }));
                // "Network Request Failed or Server is not Responding"
            })


    }

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.username) {
            handleError('Please input username', 'username');
            isValid = false;
        }

        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        }

        if (isValid) {
            login();
        }
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };


    return (
        <SafeAreaView style={Style.container}>
            <Loader visible={loading} />

            <Image style={Style.image} resizeMode="contain" source={require('../assets/logo/tabish_logo.png')} />

            <View style={{ marginVertical: 20 }}>
                <Input
                    onChangeText={text => handleOnchange(text, 'username')}
                    onFocus={() => handleError(null, 'username')}
                    iconName="email-outline"
                    label="Username"
                    placeholder="Enter your username "
                    placeholderTextColor="#000000"
                    error={errors.username}
                />

                <Input
                    onChangeText={text => handleOnchange(text, 'password')}
                    onFocus={() => handleError(null, 'password')}
                    iconName="lock-outline"
                    label="Password"
                    placeholder="Enter your password"
                    placeholderTextColor="#000000"
                    error={errors.password}
                    password
                />
                <View style={{ marginTop: 30 }}>
                    <CustomButton title="Login" onPress={validate} />
                </View>
            </View>
            <ErrorBox visible={alertBox.showBox} onClose={onCloseAlert} title={alertBox.title} message={alertBox.message} />
        </SafeAreaView>
    )
}

const Style = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
        alignItems: 'center',

    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        color: COLORS.black,
    },

    image: {
        width: 330,
        marginBottom: 20,
        marginTop: 80
    }
});