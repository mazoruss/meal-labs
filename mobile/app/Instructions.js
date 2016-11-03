import React from 'react';
import {
  WebView,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import HeadBuffer from './HeadBuffer';
import ButtonHeader from './ButtonHeader';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});

const Instructions = ({ navigator, uri }) => (
  <View style={styles.container}>
    <HeadBuffer />
    <ButtonHeader navigator={navigator} />
    <WebView
      style={{ width }}
      source={{ uri }}
    />
  </View>
);

export default Instructions;
