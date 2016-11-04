import React        from 'react';
import HeadBuffer   from './HeadBuffer';
import ButtonHeader from './ButtonHeader';
import {
  WebView,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});

const Instructions = ({ navigator, uri, title }) => (
  <View style={styles.container}>
    <HeadBuffer />
    <ButtonHeader navigator={navigator} name={title}/>
    <WebView
      style={{ width }}
      source={{ uri }}
      startInLoadingState={true}
    />
  </View>
);

export default Instructions;