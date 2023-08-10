import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import COLORS from '../conts/colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
const CustomButton = ({ title, onPress = () => { } }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: verticalScale(50),
        width: moderateScale(310),
        backgroundColor: COLORS.blue,
        marginVertical: verticalScale(20),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: scale(18) }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
