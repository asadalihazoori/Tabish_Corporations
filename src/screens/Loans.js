import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Loader from '../components/Loader';
import COLORS from '../conts/colors';
import AttendanceRecord from '../ApiServices/Tabish_Server/AttendenceRecord';
import { useIsFocused } from '@react-navigation/native';
import LoanStatusAPI from '../ApiServices/Tabish_Server/LoanStatusAPI';

export default function Leaves({ navigation }) {
    console.log("ViewAttendance.js Called");

    const [loading, setLoading] = React.useState(true);
    const [attendanceData, setAttendanceData] = useState([]);
    const isFocused = useIsFocused();

    const fetchAttendanceData = useCallback(() => { 
        LoanStatusAPI.getLoanStatus()
            .then((result) => {
                if (result) {
                    setAttendanceData(result.result)
                }
                else {
                    setLoading(false)
                }
            }
            )
            .then(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchAttendanceData();
    }, [fetchAttendanceData, isFocused]);

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={[styles.cell2, { width: 40 }]}>{item.date}</Text>
            <Text style={[styles.cell2, { width: 60 }]}>{item.type[1]}</Text>
            <Text style={[styles.cell2, { width: 60 }]}>{item.amount}</Text>
            <Text style={[styles.cell2, { width: 65 }]}>{item.received}</Text>
            <Text style={[styles.cell2, { width: 72 }]}>{item.remaining}</Text>
            <Text style={[styles.cell2, { width: 65 }]}>{item.state}</Text>
        </View>
    );



    return (

        <View style={styles.container}>
            <Loader visible={loading} />

            <View style={[styles.row, { backgroundColor: COLORS.blue }]}>

                <Text style={[styles.header, { width: 40 }]}>Date</Text>
                <Text style={[styles.header, { width: 60 }]}>Type</Text>
                <Text style={[styles.header, { width: 60 }]}>Amount</Text>
                <Text style={[styles.header, { width: 65 }]}>Received</Text>
                <Text style={[styles.header, { width: 72 }]}>Remaining</Text>
                <Text style={[styles.header, { width: 65 }]}>Status</Text>
            </View>
            <FlatList
                data={attendanceData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
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
    },

    header: {
        textAlign: 'center',
        paddingVertical: 10,
        color: "#FFFFFF",
        // borderWidth: 2,
        // borderColor: "blue",
    },

    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 3,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
    },

    cell2: {

        textAlign: 'center',
        paddingVertical: 10,
        color: "black",
        // borderWidth: 2,
        // borderColor: "blue"

    },
});
