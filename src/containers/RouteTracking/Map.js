import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import MapNRoute from './MapNRoute';
import data from '../../../data.json';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

export const LATITUDE_DELTA = 1;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let intervel;

let lastIndex = 0;
let lastTs = 0;

const initialRegion = {
  latitude: data[0].loc.coordinates[0],
  longitude: data[0].loc.coordinates[1],
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

let mapRenderd = false; // flag for map render callback
const lastHd = data[0].hd;
const Map = () => {
  const [route, setRoute] = useState([]);

  /**
   * Returns next set from lastIndex till 1 sec
   */
  const getNextSet = () => {
    const nextRoute = [];
    if (route.length >= data.length) {
      // stops when all data is plotted
      clearInterval(intervel);
      return;
    }
    // eslint-disable-next-line no-plusplus
    for (let i = lastIndex; i < data.length; i++) {
      const {
        loc: { coordinates },
        hd,
        timestamp,
      } = data[i];
      // initiate lastTs with start value (lastIndex)
      if (lastTs === 0) {
        lastTs = timestamp;
      }
      if (timestamp - lastTs > 60000) {
        // 1 min data collected
        lastTs = 0;
        lastIndex = i;
        break;
      }
      nextRoute.push({
        hd: hd || lastHd, // for handling hd undefined
        latitude: coordinates[0],
        longitude: coordinates[1],
      });
    }
    setRoute(route.concat(nextRoute));
  };

  const mapReadyCallback = () => {
    mapRenderd = true;
    getNextSet();
  };

  useEffect(
    () => {
      if (mapRenderd) {
        intervel = setInterval(getNextSet, 1500);
      }
      return () => {
        clearInterval(intervel);
      };
    },
    [route],
  );

  return (
    <MapNRoute
      route={route}
      initialRegion={initialRegion}
      mapReadyCallback={mapReadyCallback}
    />
  );
};

export default React.memo(Map);
