import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VehicleSnippetCard = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    // boar
  },
});

export default VehicleSnippetCard;
