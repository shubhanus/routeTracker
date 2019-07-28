import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Platform
} from "react-native";
import MapView, { AnimatedRegion } from "react-native-maps";
import markerImage from "../../assets/images/car.png";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "./Map";

const { width, height } = Dimensions.get("window");
const MapNRoute = ({ route, initialRegion, mapReadyCallback }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [coordinate] = useState(new AnimatedRegion());

  useEffect(() => {
    // whenever route will change region will change
    // to keep marker in center
    if (route.length) {
      const lastCords = route[route.length - 1];
      mapRef.current.animateToRegion({
        latitude: lastCords.latitude,
        longitude: lastCords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      });
      if (Platform.OS === "android") {
        if (markerRef) {
          markerRef.current._component.animateMarkerToCoordinate(
            { latitude: lastCords.latitude, longitude: lastCords.longitude },
            500
          );
        }
      } else {
        coordinate
          .timing({
            latitude: lastCords.latitude,
            longitude: lastCords.longitude
          })
          .start();
      }
    }
  }, [route]);

  return (
    <MapView
      provider="google"
      style={styles.map}
      initialRegion={initialRegion}
      onMapReady={mapReadyCallback}
      ref={mapRef}
    >
      {!!route && !!route.length && (
        <MapView.Marker.Animated
          ref={markerRef}
          rotation={route[route.length - 1].hd}
          coordinate={coordinate}
        >
          <ImageBackground source={markerImage} style={styles.markerImage} />
        </MapView.Marker.Animated>
      )}
      {!!route && !!route.length && (
        <MapView.Polyline
          coordinates={route}
          strokeWidth={2}
          fillColor="rgb(4, 237, 36)"
          strokeColor="rgb(4, 237, 36)"
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width,
    height
  },
  markerImage: {
    width: width * 0.05,
    height: width * 0.075
  }
});

export default MapNRoute;
