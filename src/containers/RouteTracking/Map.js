import React from "react";
import MapNRoute from "./MapNRoute";
import data from "../../../data.json";

/**
 * This method will be removed in case of api call
 * Filtering all data and reformatting based of react-native-map cordinates req
 */
const route = data.map(({ loc: { coordinates, hd } }) => ({
  hd,
  latitude: coordinates[0],
  longitude: coordinates[1]
}));

const Map = () => {
  return <MapNRoute route={route} />;
};

export default React.memo(Map);
