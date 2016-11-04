import React from 'react';
import { Ionicons } from '@exponent/vector-icons';
import {
  View,
  Text,
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
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  headline: {
    fontSize: 30,
    marginTop: 2,
    color: 'white',
    fontWeight: '100',
    flex: 1,
  },
});

const ButtonHeader = function button({ navigator, name }) {
  const sliceName = name.length > 14 ? `${name.slice(0, 14)}...` : name;

  return (
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
          style={{ backgroundColor: 'transparent', width: 50 }}
          name={'ios-arrow-back'}
          size={40}
          color="white"
        />
      </TouchableOpacity>
      <Text>
        <Text style={styles.headline}>
          {sliceName}
        </Text>
      </Text>
    </View>
  );
};

export default ButtonHeader;
