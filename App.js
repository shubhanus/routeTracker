/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import RouteTracking from './src/containers/RouteTracking';
// eslint-disable-next-line no-unused-vars
import StatusBar from './src/components/CustomStatusBar';

export default () => (
  <SafeAreaView style={{ flex: 1 }}>
    <RouteTracking />
  </SafeAreaView>
);
