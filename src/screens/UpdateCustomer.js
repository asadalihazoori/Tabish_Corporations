import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Keyboard, Image, TouchableOpacity } from 'react-native';
import Loader from '../components/Loader';
import COLORS from '../conts/colors';
import Input from '../components/Input';
import CustomButton from '../components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import AccessLocation from '../ApiServices/AccessLocation';
import OpenCage from '../ApiServices/OpenCage';
import CustomerAPI from '../ApiServices/RMS_Server/CustomerAPI';
import LoginRMS from '../ApiServices/RMS_Server/LoginRMS';
import CustomAlert from '../components/CustomAlert';

export default function UpdateCustomer({ route }) {
    const { customer } = route.params;
    const [inputs, setInputs] = React.useState({
        id: null,
        name: null,
        phone: null,
        address: null,
        base64Img1: null,
        base64Img2: null,
        base64Img3: null,
        latitude: null,
        longitude: null
    });

    const [images, setImages] = useState({
        image1: null,
        image2: null,
        image3: null
    });

    const [selectedImages, setselectedImages] = useState({
        image1: 'transparent',
        image2: 'transparent',
        image3: 'transparent'
    });

    const [alertBox, setAlertBox] = useState({
        showBox: false,
        title: null,
        message: null,
        icon: null,
        confirmBtn: false
    });

    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        setInputs({
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
        if (customer.images[0] != false) {
            setImages(prevState => ({ ...prevState, ['image1']: `data:image/png;base64,${customer.images[0]}` }));
        } else {
            setImages(prevState => ({ ...prevState, ['image1']: null }));
        }
        if (customer.images[1] != false) {

            setImages(prevState => ({ ...prevState, ['image2']: `data:image/png;base64,${customer.images[1]}` }));
        } else {
            setImages(prevState => ({ ...prevState, ['image2']: null }));
        }
        if (customer.images[2] != false) {

            setImages(prevState => ({ ...prevState, ['image3']: `data:image/png;base64,${customer.images[2]}` }));
        } else {
            setImages(prevState => ({ ...prevState, ['image3']: null }));
        }

        setErrors({});
        setselectedImages({ image1: 'transparent', image2: 'transparent', image3: 'transparent' })

    }, [route]);

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

        if (inputs.base64Img1 == false) {
            setselectedImages(prevState => ({ ...prevState, ["image1"]: COLORS.red }))
            isValid = false;
        }
        if (inputs.base64Img2 == false) {
            setselectedImages(prevState => ({ ...prevState, ["image2"]: COLORS.red }))
            isValid = false;
        }
        if (inputs.base64Img3 == false) {
            setselectedImages(prevState => ({ ...prevState, ["image3"]: COLORS.red }))
            isValid = false;
        }

        if (isValid) {
            updateCustomer();
        }
    };


    function updateCustomer() {
        if (inputs.base64Img1 != null && inputs.base64Img2 != null, inputs.base64Img3 != null) {

            setLoading(true);
            CustomerAPI.UpdateCustomer(inputs)
                .then((result) => {
                    console.log(result)
                    if (result.id = null) {

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
                setImages(prevState => ({ ...prevState, ['image1']: image.path }));
                setInputs(prevState => ({ ...prevState, ['base64Img1']: image.data }));
            }
            else if (no == 2) {
                setImages(prevState => ({ ...prevState, ['image2']: image.path }));
                setInputs(prevState => ({ ...prevState, ['base64Img2']: image.data }));
            }
            else if (no == 3) {
                setImages(prevState => ({ ...prevState, ['image3']: image.path }));
                setInputs(prevState => ({ ...prevState, ['base64Img3']: image.data }));
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
                            { borderColor: selectedImages.image1 }
                        ]}>
                        {images.image1 ? (
                            <Image source={{ uri: images.image1 }} style={{ width: 100, height: 100, borderRadius: 0 }} />
                        ) : (
                            <Image source={require('../assets/store-icon1.png')} style={{ width: 60, height: 60, borderRadius: 0 }} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => takePhoto(2)}
                        style={[styles.imagebox, { marginLeft: 14, borderColor: selectedImages.image2 }]}>
                        {images.image2 ? (
                            <Image source={{ uri: images.image2 }} style={{ width: 100, height: 100, borderRadius: 0 }} />
                        ) : (
                            <Image source={require('../assets/store-icon1.png')} style={{ width: 60, height: 60, borderRadius: 0 }} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => takePhoto(3)}
                        style={[styles.imagebox, { marginLeft: 14, borderColor: selectedImages.image3 }]}>
                        {images.image3 ? (
                            <Image source={{ uri: images.image3 }} style={{ width: 100, height: 100, borderRadius: 0 }} />
                        ) : (
                            <Image source={require('../assets/store-icon1.png')} style={{ width: 60, height: 60, borderRadius: 0 }} />

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
