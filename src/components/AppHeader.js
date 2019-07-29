import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import TouchableIcon from './TouchableIcon';

const AppHeader = ({ title }) => (
  <View style={styles.container}>
    <View style={styles.leftWrapper}>
      <TouchableIcon name="menu" />
      <Text style={styles.title}>{title}</Text>
    </View>
    <TouchableIcon name="search" />
  </View>
);

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#006064',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 8
  },
  leftWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AppHeader;
