import { View, Text } from 'react-native'
import React from 'react'
import COLORS from '../conts/colors'

export default function Payslip() {
    return (
        <View style={{ width: '100%', alignItems: 'center' }}>

            <View style={{ width: '90%', backgroundColor: '#FFFFFF', borderRadius: 10, marginTop: 30, padding: 20 }}>
            <Text style={{color: COLORS.black}}>Payslip</Text>
            </View>
        </View>
    )
}