import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TouchableIcon = ({
  name,
  size = 24,
  color = '#fff',
  style = {},
  ...rest
}) => (
  <TouchableOpacity {...rest} style={[styles.conainer, style]}>
    <Icon name={name} size={size} color={color} />
  </TouchableOpacity>
);

TouchableIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  conainer: {
    padding: 12,
  },
});

export default TouchableIcon;
