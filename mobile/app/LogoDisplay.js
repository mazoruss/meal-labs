import {
  View,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';

import React from 'react';
import styleVariables from '../styleVariables';

const { orange } = styleVariables;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  logo: {
    width,
    height: 44,
    backgroundColor: orange,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  headline: {
    fontSize: 30,
    marginTop: 2,
    color: 'white',
    fontWeight: '100',
  },
});

const LogoDisplay = () => (
  <View style={styles.logo}>
    <Text style={styles.headline}>MEAL. LABS</Text>
  </View>
);

export default LogoDisplay;
