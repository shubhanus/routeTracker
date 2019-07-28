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

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height - 75
};

const MapPanel = () => {
  const [deltaY] = useState(new Animated.Value(Screen.height - 100));
  const [scrollEnabled, setScrollEnabled] = useState(false);
  // const [wrapperHeight, setWrapperHeight] = useState("auto");
  // const wapperRef = useRef(null);

  // useEffect(() => {
  //   const ele = wapperRef;
  //   debugger;
  // }, []);
  // const onLayout = event => {
  //   const { height } = event.nativeEvent.layout;
  //   setWrapperHeight(height);
  // };
  const handelOnSnap = e => {
    if (e.nativeEvent.id === "snap") {
      setScrollEnabled(true);
    }
  };
  // const handelOnSnap = e => {
  //   console.log(e);
  // };
  return (
    <View style={styles.container}>
      <Interactable.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          zIndex: 9,
          opacity: deltaY.interpolate({
            inputRange: [48, Screen.height - 100],
            outputRange: [1, 0],
            extrapolateLeft: "clamp"
          }),
          transform: [
            {
              translateY: deltaY.interpolate({
                inputRange: [48, Screen.height - 100],
                outputRange: [0, -100],
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
          onSnap={handelOnSnap}
          // onDrag={handelDrag}
          snapPoints={[
            { y: 48, id: "snap" },
            // { y: Screen.height - 300 },
            { y: Screen.height - 100 }
          ]}
          onDrag={e => {
            console.log("drag", e.nativeEvent);
          }}
          boundaries={{ top: 48 }}
          initialPosition={{ y: Screen.height - 100 }}
          animatedValueY={deltaY}
        >
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              backgroundColor: "#f7f5ee",
              opacity: deltaY.interpolate({
                inputRange: [48, Screen.height - 100],
                outputRange: [1, 0]
              })
            }}
          />
          <View
            style={[
              styles.panel
              // { height: wrapperHeight }
            ]}
          >
            <View
            // scrollEnabled={scrollEnabled}
            // onScroll={event => {
            //   if (event.nativeEvent.contentOffset.y < -10) {
            //     console.log(event.nativeEvent.contentOffset.y);
            //     setScrollEnabled(false);
            //   }
            // }}
            // scrollEventThrottle={400}
            // onLayout={onLayout}
            >
              {Array(10)
                .fill("")
                .map((v, key) => (
                  <View
                    key={key}
                    style={{
                      height: 150,
                      backgroundColor: "#fff",
                      margin: 8
                    }}
                  />
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
  panel: {
    height: Screen.height + 300
    // padding: 20,
    // backgroundColor: "#f7f5eee8"
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: "black",
    // shadowOffset: { width: 0, height: 0 },
    // shadowRadius: 5,
    // shadowOpacity: 0.4
  },
  map: {
    height: Screen.height,
    width: Screen.width
  }
});

export default MapPanel;
