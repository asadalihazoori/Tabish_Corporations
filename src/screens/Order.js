// import { View, Text, StyleSheet } from 'react-native'
// import React, { useState } from 'react'
// import Loader from '../components/Loader';
// import CustomButton from '../components/Button';
// import SaleAPI from '../ApiServices/RMS_Server/SaleAPI';
// import CustomAlert from '../components/CustomAlert';

// export default function Order({ navigation, route }) {
//     const [loading, setLoading] = React.useState(false);

//     const [alertBox, setAlertBox] = useState({
//         showBox: false,
//         title: null,
//         message: null,
//         icon: null,
//         confirmBtn: false
//     });

//     const customer = route.params?.customer;
//     const products = route.params?.products;

//     const createOrder = () => {
//         setLoading(true);
//         SaleAPI.createOrder(customer.customer_id, products)
//             .then((response) => {
//                 handleAlert("Confirmation", "Order Registered Successfully.", "clipboard-check-outline", false);
//                 setLoading(false);
//                 console.log(response);
//             })
//             .catch(error => console.log(error))

//     }

//     const handleAlert = (title, message, icon, confirmBtn) => {
//         setAlertBox(prevState => ({ ...prevState, ["showBox"]: true, ["title"]: title, ["message"]: message, ["icon"]: icon, ["confirmBtn"]: confirmBtn }));
//     };

//     const onCloseAlert = () => {
//         setAlertBox(prevState => ({ ...prevState, ["showBox"]: false }));
//     };

//     return (
//         <View style={styles.container}>
//             <Loader visible={loading} />

//             <View style={{ marginVertical: 20 }}>
//                 <View style={styles.bottomview}>

//                     <CustomButton title={"Place Order"} onPress={createOrder} />
//                 </View>
//                 <CustomAlert visible={alertBox.showBox} onClose={onCloseAlert} title={alertBox.title} message={alertBox.message} icon={alertBox.icon} />
//             </View>
//         </View>
//     )
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginHorizontal: 10,
//         marginVertical: 10,
//         backgroundColor: '#ffffff',
//         borderRadius: 10,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//         // borderWidth: 2,
//         // borderColor: "green"
//         alignItems: 'center'
//     },
//     bottomview: {


//     }
// })  

import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import Loader from '../components/Loader';
import CustomButton from '../components/Button';
import SaleAPI from '../ApiServices/RMS_Server/SaleAPI';
import CustomAlert from '../components/CustomAlert';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../conts/colors';


export default function Order({ navigation, route }) {
    const [loading, setLoading] = React.useState(false);

    const [alertBox, setAlertBox] = useState({
        showBox: false,
        title: null,
        message: null,
        icon: null,
        confirmBtn: false,
    });

    const customer = route.params?.customer;
    const products = route.params?.products;

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        products.forEach((product) => {
            totalPrice += product.price_unit * product.qty;
        });
        return totalPrice.toFixed(2);
    };

    const createOrder = () => {
        setLoading(true);
        SaleAPI.createOrder(customer.customer_id, products)
            .then((response) => {
                handleAlert('Confirmation', 'Order Registered Successfully.', 'clipboard-check-outline', false);
                setLoading(false);
                console.log(response);
            })
            .catch((error) => console.log(error));
    };

    const handleAlert = (title, message, icon, confirmBtn) => {
        setAlertBox((prevState) => ({
            ...prevState,
            showBox: true,
            title: title,
            message: message,
            icon: icon,
            confirmBtn: confirmBtn,
        }));
    };

    const onCloseAlert = () => {
        setAlertBox((prevState) => ({
            ...prevState,
            showBox: false,
        }));
    };

    const renderItem = ({ item }) => (
        <View style={styles.productItem}>
            <Text style={styles.productName}>{item.product_name}</Text>
            <Text style={styles.productQuantity}>Quantity: {item.qty}</Text>
            <Text style={styles.productPrice}>Price: ${item.price_unit.toFixed(2)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Loader visible={loading} />

            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Order Details</Text>
                </View>

                <View style={styles.customerDetails}>
                    <Text style={styles.customerName}>{customer.customer_name}</Text>
                    <Text style={styles.customerLocation}>
                        <Icon name="map-marker" size={16} color={COLORS.blue} /> {customer.customer_address}
                    </Text>
                </View>

                <View style={styles.productsList}>
                    <FlatList
                        data={products}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.product_name}
                    />
                </View>

                <View style={styles.totalPriceView}>
                    <Text style={styles.totalPriceText}>Total Price: ${calculateTotalPrice()}</Text>
                </View>

                <View style={styles.bottomview}>
                    <CustomButton title={'Place Order'} onPress={createOrder} />
                </View>
                <CustomAlert
                    visible={alertBox.showBox}
                    onClose={onCloseAlert}
                    title={alertBox.title}
                    message={alertBox.message}
                    icon={alertBox.icon}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        paddingVertical: 20,
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: 16,
        backgroundColor: '#FFF',
        borderRadius: 20,
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
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.blue,
    },
    customerDetails: {
        marginBottom: 20,
        color: 'black'
    },
    customerName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black'
    },
    customerLocation: {
        fontSize: 16,
        color: '#4CAF50',
        color: 'black'
    },
    productsList: {
        marginBottom: 20,
    },
    productItem: {
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        paddingVertical: 10,
        color: 'black'
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black'
    },
    productQuantity: {
        fontSize: 16,
        color: 'black'
    },
    productPrice: {
        fontSize: 16,
        color: 'black'
    },
    totalPriceView: {
        alignItems: 'center',
        marginVertical: 20,
        color: 'black'
    },
    totalPriceText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    bottomview: {
        width: 100,
        // borderWidth: 1,
        // borderColor: 'black',
        // marginRight: 50
        

    },
});
