/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { SafeAreaView, View } from "react-native";
import StatusBar from "./src/components/CustomStatusBar";
import Map from "./src/containers/RouteTracking/Map";
import RouteTracking from "./src/containers/RouteTracking";

export default () => {
  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Map /> */}
        <RouteTracking />
      </SafeAreaView>
    </>
  );
};
