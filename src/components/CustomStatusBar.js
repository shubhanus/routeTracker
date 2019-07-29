import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from '../utils/statusBar';
// import { colors } from "../../config/theme";

const CustomStatusBar = () => {
  const statusBarHeight = getStatusBarHeight();
  return Platform.OS === 'ios' ? (
    <View
      style={[
        {
          height: statusBarHeight,
          backgroundColor: 'transparent',
        },
      ]}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
    </View>
  ) : (
    <StatusBar
      barStyle="light-content"
      translucent
      backgroundColor="transparent"
    />
  );
};
export default CustomStatusBar;
