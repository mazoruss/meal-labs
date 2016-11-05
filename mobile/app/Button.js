import React from 'react';
import { Components } from 'exponent';
import { Ionicons } from '@exponent/vector-icons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container2: {
    width: 100,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 5,
  },
  text: {
    justifyContent: 'center',
    fontSize: 20,
  },
  iconWrapper: {
    width: 100,
  },
  iconButton: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: 2,
    paddingTop: 3,
  },
  blurWrapper: {
    height: 55,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Button = ({ text, icon, onclick }) => {
  if (text !== undefined) {
    return (
      <TouchableOpacity onPress={onclick}>
        <View
          style={styles.container2}
          elevation={3}
        >
          <Text style={styles.text}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={styles.iconButton}
      onPress={onclick}
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      }}
    >
      <Components.BlurView
        tintEffect="default"
        style={styles.blurWrapper}
      >
        <Ionicons
          style={{ backgroundColor: 'transparent' }}
          name={icon}
          size={30}
          color="rgba(0,0,0,.7)"
        />
      </Components.BlurView>
    </TouchableOpacity>
  );
};

export default Button;
