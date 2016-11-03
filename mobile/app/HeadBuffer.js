import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import styleVariables from '../styleVariables';

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
