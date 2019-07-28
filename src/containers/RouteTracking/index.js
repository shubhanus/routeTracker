import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Animated,
  ScrollView
} from "react-native";
import Interactable from "react-native-interactable";
import AppHeader from "../../components/AppHeader";
import Map from "./Map";
import TouchableIcon from "../../components/TouchableIcon";

const CARD_HEIGHT = 150; // can be fixed or calculated on layout
const HEADER_HEIGHT = 48; // based on header height
const cards = [
  { title: "1" },
  { title: "2" },
  { title: "3" },
  { title: "4" },
  { title: "5" },
  { title: "6" },
  { title: "7" },
  { title: "8" },
  { title: "9" },
  { title: "10" }
];

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height - HEADER_HEIGHT
};

const otherSnapPoints = []; // will be used to snap drag
const MapPanel = () => {
  const [deltaY] = useState(new Animated.Value(Screen.height - CARD_HEIGHT));
  const [wrapperHeight, setWrapperHeight] = useState(
    Screen.height - CARD_HEIGHT
  );
  const onLayout = event => {
    const { height } = event.nativeEvent.layout;
    const totalSnapPoints = Math.floor((height - Screen.height) / CARD_HEIGHT);
    for (let i = 0; i <= totalSnapPoints; i++) {
      let snapPoint = (i + 1) * CARD_HEIGHT;
      if (snapPoint) {
        snapPoint -= 48;
      }
      otherSnapPoints.push({ y: -snapPoint });
    }
    setWrapperHeight(height);
  };

  return (
    <View style={styles.container}>
      <Interactable.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          zIndex: 9,
          opacity: deltaY.interpolate({
            inputRange: [HEADER_HEIGHT, Screen.height - CARD_HEIGHT],
            outputRange: [1, 0],
            extrapolateLeft: "clamp"
          }),
          transform: [
            {
              translateY: deltaY.interpolate({
                inputRange: [HEADER_HEIGHT, Screen.height - CARD_HEIGHT],
                outputRange: [0, -CARD_HEIGHT],
                // extrapolateLeft: "clamp"
                extrapolateLeft: "clamp"
              })
            }
          ]
        }}
      >
        <AppHeader title="Test" deltaY={deltaY} />
      </Interactable.View>
      <Map />
      <View style={[styles.panelContainer]} pointerEvents={"box-none"}>
        <Interactable.View
          verticalOnly={true}
          snapPoints={[
            { y: HEADER_HEIGHT },
            ...otherSnapPoints,
            { y: Screen.height - CARD_HEIGHT }
          ]}
          initialPosition={{ y: Screen.height - CARD_HEIGHT }}
          animatedValueY={deltaY}
        >
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              backgroundColor: "#f7f5ee",
              opacity: deltaY.interpolate({
                inputRange: [HEADER_HEIGHT, Screen.height - CARD_HEIGHT],
                outputRange: [1, 0]
              })
            }}
          />
          <View
            style={[styles.panel, { height: wrapperHeight + Screen.height }]}
          >
            <View onLayout={onLayout}>
              {!!cards &&
                cards.map((v, key) => (
                  <View
                    key={key}
                    style={{
                      height: CARD_HEIGHT - 16,
                      backgroundColor: "#fff",
                      margin: 8
                    }}
                  >
                    <Text>{v.title}</Text>
                  </View>
                ))}
            </View>
          </View>
        </Interactable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#efefef"
  },
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  map: {
    height: Screen.height,
    width: Screen.width
  }
});

export default MapPanel;
