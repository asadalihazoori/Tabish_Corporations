import { View, StyleSheet, Image, SafeAreaView, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../conts/colors';
import CustomButton from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import LoginAPI from '../ApiServices/Tabish_Server/LoginAPI';
import CustomAlert from '../components/CustomAlert';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
        message: null,
        icon: null,
        confirmBtn: false
    });


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
                                handleAlert("Employee Not Found", `Please Login Again ${employee}`, "account-cancel-outline", false);
                            }
                        })
                        .catch((error) => {
                            setLoading(false);
                            handleAlert("Internet Required", error, "wifi-off", false);
                        })

                }
                else if (response == false) {
                    setLoading(false);
                    handleError('Incorrect username', 'username');
                    handleError('Or Incorrect password', 'password');
                    return false;
                }

            })
            .catch((error) => {
                setLoading(false);
                handleAlert("Internet Required", 'You are not connected to Network or Server Error.', "wifi-off", false);
            })
    }

    const handleAlert = (title, message, icon, confirmBtn) => {
        setAlertBox(prevState => ({ ...prevState, ["showBox"]: true, ["title"]: title, ["message"]: String(message), ["icon"]: icon, ["confirmBtn"]: confirmBtn }));
    };

    const onCloseAlert = () => {
        setAlertBox(prevState => ({ ...prevState, ["showBox"]: false }));
    };

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

            <View style={{ marginVertical: verticalScale(20) }}>
                <Input
                    onChangeText={text => handleOnchange(text, 'username')}
                    onFocus={() => handleError(null, 'username')}
                    iconName="email-outline"
                    label="Username"
                    placeholder="Enter your username "
                    placeholderTextColor="#000000"
                    error={errors.username}
                    keyboardType='email-address'
                    autoCapitalize='none'
                />

                <Input
                    onChangeText={text => handleOnchange(text, 'password')}
                    onFocus={() => handleError(null, 'password')}
                    iconName="lock-outline"
                    label="Password"
                    placeholder="Enter your password"
                    placeholderTextColor="#000000"
                    error={errors.password}
                    autoCapitalize='none'
                    password
                />
                <View style={{ marginTop: verticalScale(20) }}>
                    <CustomButton title="Login" onPress={validate} />
                </View>
            </View>
            <CustomAlert visible={alertBox.showBox} onClose={onCloseAlert} title={alertBox.title} message={alertBox.message} icon={alertBox.icon} />
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
        fontSize: scale(40),
        fontWeight: 'bold',
        color: COLORS.black,
    },

    image: {
        width: moderateScale(330),
        marginBottom: verticalScale(20),
        marginTop: verticalScale(70)
    }
});