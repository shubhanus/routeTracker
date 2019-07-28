/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { SafeAreaView } from "react-native";
import RouteTracking from "./src/containers/RouteTracking";
import StatusBar from "./src/components/CustomStatusBar";

export default () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RouteTracking />
    </SafeAreaView>
  );
};
