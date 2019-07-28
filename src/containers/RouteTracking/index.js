/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import Interactable from './Interactable';
import SnippetView from '../../components/SnippetView';
import data from '../../../data.json';
import MapNRoute from './MapNRoute.js';
import AppHeader from '../../components/AppHeader.js';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75,
};

const cards = [
  {
    title: 'Title',
    id: '1',
  },
  {
    title: 'Title',
    id: '2',
  },
  {
    title: 'Title',
    id: '3',
  },
  {
    title: 'Title',
    id: '4',
  },
  {
    title: 'Title',
    id: '5',
  },
  {
    title: 'Title',
    id: '6',
  },
  {
    title: 'Title',
    id: '7',
  },
  {
    title: 'Title',
    id: '8',
  },
  {
    title: 'Title',
    id: '9',
  },
  {
    title: 'Title',
    id: '10',
  },
  {
    title: 'Title',
    id: '11',
  },
];

export default () => {
  const [deltaY] = useState(new Animated.Value(Screen.height - 100));
  const [scrollEnabled, setScrollEnable] = useState(false);
  return (
    <>
      <Animated.View style={[styles.header]}>
        <AppHeader title="Test" />
      </Animated.View>
      <View style={styles.container}>
        <View style={[styles.panelContainer]} pointerEvents={'box-none'}>
          {/* <Animated.View
            pointerEvents={'box-none'}
            style={[
              styles.panelContainer,
              {
                backgroundColor: 'black',
                // opacity: deltaY.interpolate({
                //   inputRange: [0, 50],
                //   outputRange: [0.5, 0],
                //   extrapolateRight: 'clamp',
                // }),
              },
            ]}
          /> */}
          <Interactable.View
            verticalOnly={true}
            onSnap={() => {
              // setScrollEnable(true);
            }}
            snapPoints={[{ y: 64 }, { y: Screen.height - 100 }]}
            // boundaries={{ top: 64 }}
            initialPosition={{ y: Screen.height - 100 }}
            animatedValueY={deltaY}
          >
            <View style={[styles.panel]}>
              <Animated.View
                pointerEvents={'box-none'}
                style={[
                  styles.panelContainer,
                  {
                    backgroundColor: '#ddd',
                    opacity: deltaY.interpolate({
                      inputRange: [64, Screen.height - 100],
                      outputRange: [1, 0],
                      extrapolateRight: 'clamp',
                    }),
                  },
                ]}
              />
              <SnippetView
                pointerEvents="box-none"
                scrollEnabled={false}
                cards={cards}
              />
            </View>
          </Interactable.View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: Screen.height,
    // paddingTop: 20,
    // backgroundColor: '#f7f5eee8',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 0 },
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: Screen.width - 40,
    height: 225,
    marginTop: 30,
  },
  header: {
    marginTop: 20,
    height: 64,
    zIndex: 9,
    ...StyleSheet.absoluteFill,
  },
});
