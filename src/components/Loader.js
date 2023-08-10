import React, { version } from 'react';
import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import COLORS from '../conts/colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
const Loader = ({ visible = false }) => {
  const { width, height } = useWindowDimensions();
  return (
    visible && (
      <View style={[style.container, { height, width }]}>
        <View style={style.loader}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={{ marginLeft: moderateScale(14), fontSize: scale(14), color: COLORS.black }}>Loading...</Text>
        </View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  loader: {
    height: verticalScale(60),
    backgroundColor: COLORS.white,
    marginHorizontal: moderateScale(50),
    borderRadius: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  container: {
    position: 'absolute',
    zIndex: scale(10),
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});

export default Loader;
