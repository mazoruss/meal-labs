import React from 'react';
import { Ionicons } from '@exponent/vector-icons';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import styleVariables from '../styleVariables';

const { orange } = styleVariables;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  header: {
    width,
    height: 44,
    backgroundColor: orange,
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
});

const ButtonHeader = ({ navigator }) => (
  <View style={styles.header}>
    <TouchableOpacity
      style={styles.iconButton}
      onPress={() => { navigator.pop(); }}
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      }}
    >
      <Ionicons
        style={{ backgroundColor: 'transparent' }}
        name={'ios-arrow-back'}
        size={40}
        color="white"
      />
    </TouchableOpacity>
  </View>
);

export default ButtonHeader;
