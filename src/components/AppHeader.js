import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import TouchableIcon from "./TouchableIcon";

const AppHeader = ({ title }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftWrapper}>
          <TouchableIcon name="menu" />
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableIcon name="search" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#006064",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
    // paddingVertical: 8
  },
  leftWrapper: {
    alignItems: "center",
    flexDirection: "row"
  },
  title: {
    color: "#fff",
    fontSize: 18
  }
});

export default AppHeader;
