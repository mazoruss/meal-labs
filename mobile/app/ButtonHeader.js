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
    position: 'relative',
    justifyContent: 'center'
  },
  headline: {
    flex: 1,
    maxWidth: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButton: {
    position: 'absolute',
    left: 10
  },
  headlineText: {
    fontSize: 20, 
    color: 'white', 
    fontWeight: '100',
    marginBottom: 4
  }
});

const ButtonHeader = function button({ navigator, name }) {
  const sliceName = name.length > 30 ? `${name.slice(0, 30)}...` : name;
  
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
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
      <View style={styles.headline}>
        <Text style={styles.headlineText}>
          { sliceName }
        </Text>
      </View>
    </View>
  );
};

export default ButtonHeader;
