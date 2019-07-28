/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Map from "./src/containers/RouteTracking/Map";

export default () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Map />
        {/* <RouteTracking /> */}
      </SafeAreaView>
    </>
  );
};
