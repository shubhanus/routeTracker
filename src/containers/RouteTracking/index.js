import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions, Text, Animated } from 'react-native';
import Interactable from 'react-native-interactable';
import AppHeader from '../../components/AppHeader';
import Map from './Map';

export const CARD_HEIGHT = 150; // can be fixed or calculated on layout
const HEADER_HEIGHT = 48; // based on header height

const cards = [
  { title: '1', id: '1' },
  { title: '2', id: '2' },
  { title: '3', id: '3' },
  { title: '4', id: '4' },
  { title: '5', id: '5' },
  { title: '6', id: '6' },
  { title: '7', id: '7' },
  { title: '8', id: '8' },
  { title: '9', id: '9' },
  { title: '10', id: '10' },
];

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - HEADER_HEIGHT,
};

const otherSnapPoints = []; // will be used to snap drag

const MapPanel = () => {
  const [deltaY] = useState(new Animated.Value(Screen.height - CARD_HEIGHT));
  const [wrapperHeight, setWrapperHeight] = useState(
    Screen.height - CARD_HEIGHT,
  );

  /**
   * This method called after snippet card renders
   * Get it's height and set it to state
   * Height will be aplied to draggeble panel
   * Calculate snap points and update otherSnapPoints array
   * @param {object} event react native event
   */
  const onLayout = event => {
    const { height } = event.nativeEvent.layout;
    const totalSnapPoints = Math.floor((height - Screen.height) / CARD_HEIGHT);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= totalSnapPoints; i++) {
      let snapPoint = (i + 1) * CARD_HEIGHT;
      if (snapPoint) {
        snapPoint -= 48;
      }
      otherSnapPoints.push({ y: -snapPoint });
    }
    setWrapperHeight(height);
  };

  return (
    <View style={styles.container}>
      <Interactable.View
        style={[
          styles.headerWrapper,
          {
            opacity: deltaY.interpolate({
              inputRange: [HEADER_HEIGHT, Screen.height - CARD_HEIGHT],
              outputRange: [1, 0],
              extrapolateLeft: 'clamp',
            }),
            transform: [
              {
                translateY: deltaY.interpolate({
                  inputRange: [HEADER_HEIGHT, Screen.height - CARD_HEIGHT],
                  outputRange: [0, -CARD_HEIGHT],
                  // extrapolateLeft: "clamp"
                  extrapolateLeft: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <AppHeader title="Test" deltaY={deltaY} />
      </Interactable.View>
      <Map />
      <View style={styles.panelContainer} pointerEvents="box-none">
        <Interactable.View
          verticalOnly
          snapPoints={[
            { y: HEADER_HEIGHT },
            ...otherSnapPoints,
            { y: Screen.height - CARD_HEIGHT },
          ]}
          initialPosition={{ y: Screen.height - CARD_HEIGHT }}
          animatedValueY={deltaY}
        >
          <Animated.View
            style={[
              styles.cardsBackground,
              {
                opacity: deltaY.interpolate({
                  inputRange: [HEADER_HEIGHT, Screen.height - CARD_HEIGHT],
                  outputRange: [1, 0],
                }),
              },
            ]}
          />
          <View
            style={[styles.panel, { height: wrapperHeight + Screen.height }]}
          >
            <SnippetCards cards={cards} onLayout={onLayout} />
          </View>
        </Interactable.View>
      </View>
    </View>
  );
};

const SnippetCards = ({ cards: snipCards, onLayout }) => (
  <View onLayout={onLayout}>
    {!!snipCards &&
      snipCards.map(({ title, id }) => (
        <View key={id} style={styles.snippetCard}>
          <Text>{title}</Text>
        </View>
      ))}
  </View>
);

SnippetCards.propTypes = {
  cards: PropTypes.array.isRequired,
  onLayout: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  headerWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9,
  },
  snippetCard: {
    height: CARD_HEIGHT - 16,
    backgroundColor: '#fff',
    margin: 8,
  },
  cardsBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#f7f5ee',
  },
  panelContainer: {
    ...StyleSheet.absoluteFill,
  },
  map: {
    height: Screen.height,
    width: Screen.width,
  },
});

export default MapPanel;
