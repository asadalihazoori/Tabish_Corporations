import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Loader from '../components/Loader';
import COLORS from '../conts/colors';
import LoanStatusAPI from '../ApiServices/Tabish_Server/LoanStatusAPI';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import CustomAlert from '../components/CustomAlert';

export default function Leaves({ navigation }) {

    const [loading, setLoading] = React.useState(true);
    const [attendanceData, setAttendanceData] = useState([]);

    const [alertBox, setAlertBox] = useState({
        showBox: false,
        title: null,
        message: null,
        icon: null,
        confirmBtn: false
    });

    const handleAlert = (title, message, icon, confirmBtn) => {
        setAlertBox(prevState => ({ ...prevState, ["showBox"]: true, ["title"]: title, ["message"]: message, ["icon"]: icon, ["confirmBtn"]: confirmBtn }));
    };

    const onCloseAlert = () => {
        setAlertBox(prevState => ({ ...prevState, ["showBox"]: false }));
    };

    const fetchAttendanceData = () => {
        LoanStatusAPI.getLoanStatus()
            .then((result) => {
                setLoading(false);
                if (result.result) {
                    setAttendanceData(result.result)
                }
            }
            )
            .catch(() => {
                setLoading(false)
                handleAlert("Internet Required", 'You are not connected to Network or Server Error.', "wifi-off", false);

            })
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchAttendanceData();
        });

        return unsubscribe;
    }, [navigation]);


    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={[styles.cell2, { width: moderateScale(40) }]}>{item.date}</Text>
            <Text style={[styles.cell2, { width: moderateScale(60) }]}>{item.type[1]}</Text>
            <Text style={[styles.cell2, { width: moderateScale(60) }]}>{item.amount}</Text>
            <Text style={[styles.cell2, { width: moderateScale(62) }]}>{item.received}</Text>
            <Text style={[styles.cell2, { width: moderateScale(69) }]}>{item.remaining}</Text>
            <Text style={[styles.cell2, { width: moderateScale(48) }]}>{item.state}</Text>
        </View>
    );



    return (
        <>
            <Loader visible={loading} />
            <View style={styles.container}>

                <View style={[styles.row, { backgroundColor: COLORS.blue }]}>

                    <Text style={[styles.header, { width: moderateScale(40) }]}>Date</Text>
                    <Text style={[styles.header, { width: moderateScale(60) }]}>Type</Text>
                    <Text style={[styles.header, { width: moderateScale(60) }]}>Amount</Text>
                    <Text style={[styles.header, { width: moderateScale(62) }]}>Received</Text>
                    <Text style={[styles.header, { width: moderateScale(69) }]}>Remaining</Text>
                    <Text style={[styles.header, { width: moderateScale(48) }]}>Status</Text>
                </View>
                {attendanceData.length > 0 ?
                    <FlatList
                        data={attendanceData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    :
                    <View style={styles.nullContainer}>
                        <Text style={styles.text}>No Advance / Loans Record Found !</Text>
                    </View>}
                <CustomAlert visible={alertBox.showBox} onClose={onCloseAlert} title={alertBox.title} message={alertBox.message} icon={alertBox.icon} />
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: moderateScale(10),
        marginVertical: verticalScale(10),
        backgroundColor: '#ffffff',
        borderRadius: scale(10),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: scale(0.25),
        shadowRadius: scale(3.84),
        elevation: scale(5),
    },

    header: {
        textAlign: 'center',
        paddingVertical: verticalScale(10),
        color: "#FFFFFF",
    },

    headerText: {
        fontWeight: 'bold',
        fontSize: scale(16),
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(3),
        paddingVertical: verticalScale(14),
        borderBottomWidth: scale(1),
        borderBottomColor: '#DDDDDD',
    },

    cell2: {

        textAlign: 'center',
        paddingVertical: verticalScale(10),
        color: "black",
    },

    nullContainer: {
        marginTop: verticalScale(50),
        alignContent: 'center',
        textAlign: 'center',

    },

    text: {
        fontSize: scale(16),
        color: 'black',
        fontWeight: 'bold',
        alignSelf: 'center'
    }
});
