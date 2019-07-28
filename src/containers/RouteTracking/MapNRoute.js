import React, { useEffect, useRef } from "react";
import { StyleSheet, ImageBackground, Dimensions } from "react-native";
import MapView from "react-native-maps";
import markerImage from "../../assets/images/car.png";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "./Map";

const { width, height } = Dimensions.get("window");
const MapNRoute = ({ route, initialRegion, mapReadyCallback }) => {
  const mapRef = useRef(null);

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
        <MapView.Marker
          rotation={route[route.length - 1].hd}
          coordinate={route[route.length - 1]}
        >
          <ImageBackground source={markerImage} style={styles.markerImage} />
        </MapView.Marker>
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
