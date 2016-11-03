import React from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';
import styleVariables from '../styleVariables';


const { orange } = styleVariables;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  logo: {
    width,
    height: 44,
    backgroundColor: orange,
    alignItems: 'center',
  },
  headline: {
    fontSize: 30,
    marginTop: 2,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
  },
});

const HeaderDisplay = ({ recipe }) => (
  <View style={styles.logo}>
    <Text style={styles.headline}>
      {recipe.label}
    </Text>
  </View>
);

export default HeaderDisplay;
