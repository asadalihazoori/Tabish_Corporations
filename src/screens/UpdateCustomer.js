import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Keyboard, Image, TouchableOpacity } from 'react-native';
import Loader from '../components/Loader';
import COLORS from '../conts/colors';
import Input from '../components/Input';
import CustomButton from '../components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import AccessLocation from '../ApiServices/AccessLocation';
import OpenCage from '../ApiServices/OpenCage';
import CustomerAPI from '../ApiServices/CustomerAPI';
import LoginRMS from '../ApiServices/LoginRMS';
import CustomAlert from '../components/CustomAlert';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function UpdateCustomer({ route }) {
    const { customer } = route.params;
    const [inputs, setInputs] = React.useState({
        id: customer.customer_id,
        name: customer.customer_name,
        phone: customer.phone,
        address: customer.customer_address,
        base64Img1: customer.images[0],
        base64Img2: customer.images[1],
        base64Img3: customer.images[2],
        latitude: customer.store_latitude,
        longitude: customer.store_longitude
    });
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [image1, setImage1] = useState(customer.images[0]);
    const [image2, setImage2] = useState(customer.images[1]);
    const [image3, setImage3] = useState(customer.images[2]);
    const [selectedImages, setSelectedImages] = React.useState([]);

    const [alertBox, setAlertBox] = useState({
        showBox: false,
        title: null,
        message: null,
        icon: null,
        confirmBtn: false
    });

    useEffect(() => {
        // setInputs(prevState => ({
        //     ...prevState, ['address']: customer.customer_address,
        //     ['name']: customer.customer_name,
        //     ['phone']: customer.phone,
        //     ['latitude']: customer.store_latitude,
        //     ['longitude']: customer.store_longitude
        // }));
        // console.log(customer);
        // getAttributes();
    }, [])


    const onCloseAlert = () => {
        setAlertBox(prevState => ({ ...prevState, ["showBox"]: false }));
    };

    const handleAlert = (title, message, icon, confirmBtn) => {
        setAlertBox(prevState => ({ ...prevState, ["showBox"]: true, ["title"]: title, ["message"]: message, ["icon"]: icon, ["confirmBtn"]: confirmBtn }));
    };

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.name) {
            handleError('Please input name', 'name');
            isValid = false;
        }

        if (!inputs.phone) {
            handleError('Please input phone', 'phone');
            isValid = false;
        }
        if (!inputs.address) {
            handleError('Please input address', 'address');
            isValid = false;
        }
        if (selectedImages.length < 3) {
            console.log('Please select all images');
            isValid = false;

            return;
        }

        if (isValid) {
            addCustomer();
            // console.log("ok")

        } 
    };


    function addCustomer() {
        if (inputs.base64Img1 != null && inputs.base64Img2 != null, inputs.base64Img3 != null) {

            setLoading(true);
            CustomerAPI.UpdateCustomer(inputs)
                .then((result) => {
                    // console.log(result)
                    if (result.result.id != null) {

                        handleAlert("Confirmation", "Customer Updated Successfully.", "clipboard-check-outline", false)
                        setLoading(false);
                    }
                })
                .catch(error => {
                    handleAlert("Internet Required", "Network request failed", "wifi-off", false)
                    setLoading(false);
                });
        }
    }

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    const onConfirmAlert = () => {
        setAlertBox(prevState => ({ ...prevState, ["confirmBtn"]: true }));
        setAlertBox(prevState => ({ ...prevState, ["showBox"]: false }));


    };


    const takePhoto = (no) => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            if (no == 1) {
                setImage1(image.path);
                setInputs(prevState => ({ ...prevState, ['base64Img1']: image.data }));
                setSelectedImages(prevState => [...prevState, no]);
            }
            else if (no == 2) {
                setImage2(image.path);
                setInputs(prevState => ({ ...prevState, ['base64Img2']: image.data }));
                setSelectedImages(prevState => [...prevState, no]);
            }
            else if (no == 3) {
                setImage3(image.path);
                setInputs(prevState => ({ ...prevState, ['base64Img3']: image.data }));
                setSelectedImages(prevState => [...prevState, no]);
            }
        }).catch(error => {
            handleAlert("Warning", "You Cancelled Image Selection", "image-off", false)

        });
    };


    //   function getAttributes() {
    // AccessLocation.getPermission()
    //   .then(({ latitude, longitude }) => {
    //     setInputs(prevState => ({ ...prevState, ['latitude']: latitude }));
    //     setInputs(prevState => ({ ...prevState, ['longitude']: longitude }));

    //     OpenCage.getLocation({ latitude, longitude }).then((address) => {

    //   setInputs(prevState => ({ ...prevState, ['address']: address }));
    //     })
    //       .catch((error) => {
    //         handleAlert("Internet Required", error, "wifi-off", false);
    //       })
    //   })
    //   .catch((error) => {
    //     handleAlert("Internet Required", error, "bomb", false);
    //   });

    //   }

    return (

        <View style={styles.container}>
            <Loader visible={loading} />

            <View style={{ marginVertical: 20 }}>
                <Input
                    onChangeText={text => handleOnchange(text, 'name')}
                    value={inputs.name}
                    onFocus={() => handleError(null, 'name')}
                    iconName="email-outline"
                    label="Name"
                    placeholder="Enter Customer Name "
                    placeholderTextColor="#000000"
                    error={errors.name}

                />

                <Input
                    onChangeText={text => handleOnchange(text, 'phone')}
                    value={inputs.phone}
                    onFocus={() => handleError(null, 'phone')}
                    iconName="phone-outline"
                    label="Phone No."
                    placeholder="Enter Customer Phone no."
                    placeholderTextColor="#000000"
                    error={errors.phone}
                    keyboardType='phone-pad'

                />

                <Input
                    onChangeText={text => handleOnchange(text, 'address')}
                    onFocus={() => handleError(null, 'address')}
                    iconName="map-marker-outline"
                    label="Address"
                    placeholder="Enter Customer address"
                    placeholderTextColor="#000000"
                    error={errors.address}
                    value={inputs.address}
                />
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.label}>Latitude: {inputs.latitude}</Text>
                    <Text style={[styles.label, { marginLeft: 20 }]}>Longitude: {inputs.longitude}</Text>

                </View>

                <Text style={styles.label}>Pictures</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => takePhoto(1)}
                        style={[
                            styles.imagebox,
                            { borderColor: selectedImages.includes(1) ? 'transparent' : COLORS.red }
                        ]}>
                        {image1 ? (
                            <Image source={{ uri: image1 }} style={{ width: 100, height: 100, borderRadius: 0 }} />
                        ) : (
                            <Image source={require('../assets/store-icon1.png')} style={{ width: 60, height: 60, borderRadius: 0 }} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => takePhoto(2)}
                        style={[styles.imagebox, { marginLeft: 14, borderColor: selectedImages.includes(2) ? 'transparent' : COLORS.red, }]}>
                        {image2 ? (
                            <Image source={{ uri: image2 }} style={{ width: 100, height: 100, borderRadius: 0 }} />
                        ) : (
                            <Image source={require('../assets/store-icon1.png')} style={{ width: 60, height: 60, borderRadius: 0 }} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => takePhoto(3)}
                        style={[styles.imagebox, { marginLeft: 14, borderColor: selectedImages.includes(3) ? 'transparent' : COLORS.red, }]}>
                        {image3 ? (
                            <Image source={{ uri: image3 }} style={{ width: 100, height: 100, borderRadius: 0 }} />
                        ) : (
                            <Image source={require('../assets/store-icon1.png')} style={{ width: 60, height: 60, borderRadius: 0 }} />
                            //   <Icon
                            //   name='office-building'
                            //   style={{  fontSize:70, color: COLORS.blue, }}
                            // />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 30 }}>
                    <CustomButton title="Update"
                        onPress={validate}
                    />
                </View>
                <CustomAlert visible={alertBox.showBox} onConfirm={onConfirmAlert} confirmBtn={alertBox.confirmBtn} onClose={onCloseAlert} title={alertBox.title} message={alertBox.message} icon={alertBox.icon} />
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // borderWidth: 2,
        // borderColor: "green"
        alignItems: 'center'
    },

    header: {
        backgroundColor: COLORS.blue,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        color: "#FFFFFF",
        // borderWidth: 2,
        // borderColor: "blue"

    },

    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',

    },

    cell: {
        fontSize: 16,
        width: 80,
        color: "#000000",
        // borderColor: 'green',
        // borderWidth: 2,
        marginLeft: 2
    },
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: COLORS.black,
        marginBottom: 10
    },
    imagebox: {
        width: 100, height: 100, borderRadius: 0,
        // backgroundColor: '#e0e0e0',
        backgroundColor: COLORS.light,
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 0.6,
    }
});
