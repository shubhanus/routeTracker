import React, { useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import markerImage from '../../assets/images/car.png';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 3;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapNRoute = ({ route }) => {
  const initialRegion = useMemo(
    () => ({
      latitude: route[route.length - 1].latitude,
      longitude: route[route.length - 1].longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    [route],
  );

  return (
    <MapView
      provider="google"
      style={styles.map}
      // scrollEnabled={false}
      // zoomEnabled={false}
      // pitchEnabled={false}
      // rotateEnabled={false}
      initialRegion={initialRegion}
    >
      <MapView.Marker
        // title={marker.key}
        image={markerImage}
        rotation={route[route.length - 1].hd}
        // key={marker.key}
        coordinate={route[route.length - 1]}
      />
      <MapView.Polyline
        coordinates={route}
        strokeWidth={1}
        fillColor="rgb(4, 237, 36)"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFill,
    width,
    height,
  },
});

export default MapNRoute;
