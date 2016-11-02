import React from 'react';
import { Ionicons } from '@exponent/vector-icons';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity
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
    width: 100
  }
});

const Button = ({ text, icon, onclick }) => { 
  if(text !== undefined) {
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
    )
  }
  return (
      <TouchableOpacity 
        onPress={onclick}
        hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
      >
        <Ionicons 
          name={icon} 
          size={39} 
          color="white" 
          onPress={onclick} 
        /> 
      </TouchableOpacity>
  ) 
};

export default Button;
