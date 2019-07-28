import React, { useMemo } from "react";
import { Dimensions, StyleSheet, ImageBackground } from "react-native";
import MapView from "react-native-maps";
import markerImage from "../../assets/images/car.png";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 3;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapNRoute = ({ route }) => {
  const initialRegion = useMemo(
    () => ({
      latitude: route[route.length - 1].latitude,
      longitude: route[route.length - 1].longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }),
    [route]
  );

  return (
    <MapView provider="google" style={styles.map} initialRegion={initialRegion}>
      <MapView.Marker
        rotation={route[route.length - 1].hd}
        coordinate={route[route.length - 1]}
      >
        <ImageBackground
          source={markerImage}
          style={{
            width: width * 0.05,
            height: width * 0.075
          }}
        />
      </MapView.Marker>
      <MapView.Polyline
        coordinates={route}
        strokeWidth={2}
        fillColor="rgb(4, 237, 36)"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width,
    height
  }
});

export default MapNRoute;
