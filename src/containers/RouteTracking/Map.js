import React from 'react';
import MapNRoute from './MapNRoute';
import data from '../../../data.json';

const route = data.map(({ loc: { coordinates, hd } }) => ({
  hd,
  latitude: coordinates[0],
  longitude: coordinates[1],
}));

const Map = () => {
  return <MapNRoute route={route} />;
};

export default React.memo(Map);
