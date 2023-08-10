import React from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard } from 'react-native';
import COLORS from '../conts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const Input = ({
  label,
  iconName,
  error,
  password,
  value,
  keyboardType,
  onFocus = () => { },
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{ marginBottom: verticalScale(20) }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
                ? COLORS.darkBlue
                : COLORS.light,
            alignItems: 'center',
          },
        ]}>
        <Icon
          name={iconName}
          style={{ color: COLORS.blue, fontSize: scale(20), marginRight: moderateScale(10) }}
        />
        <TextInput
          value={value}
          keyboardType={keyboardType}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ color: COLORS.black, flex: 1 }}
          {...props}

        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{ color: COLORS.blue, fontSize: scale(20) }}
          />
        )}
      </View>
      {error && (
        <Text style={{ marginTop: verticalScale(7), color: COLORS.red, fontSize: scale(12) }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: verticalScale(5),
    fontSize: scale(14),
    color: COLORS.black,
    marginBottom: verticalScale(10)
  },
  inputContainer: {
    height: verticalScale(50),
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: scale(15),
    borderWidth: scale(0.5),
    width: moderateScale(310)
  },
});

export default Input;
