import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import VehicleSnippetCard from './VehicleSnippetCard';

const SnippetView = ({ cards, ...rest }) => {
  return (
    <ScrollView style={styles.conianer} {...rest}>
      {!!cards &&
        cards.map(card => <VehicleSnippetCard {...card} key={card.id} />)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  conianer: {
    padding: 10,
    // backgroundColor: '#ddd',
    // paddingHorizontal: 4,
  },
});

export default SnippetView;
