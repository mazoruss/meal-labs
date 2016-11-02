import React from 'react';
import styleVariables from '../styleVariables';
import { View, Dimensions, StyleSheet } from 'react-native';

const { orange } = styleVariables;

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  buffer: {
    width,
    height: 22,
    backgroundColor: orange,
  },
});

const HeadBuffer = () => (
  <View style={styles.buffer} />
);

export default HeadBuffer;
