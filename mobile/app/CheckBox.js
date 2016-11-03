import React                from 'react';
import { Ionicons }         from '@exponent/vector-icons';
import { TouchableOpacity } from 'react-native';
import styleVariables       from '../styleVariables';

const { gray } = styleVariables;

const Checked = () => (
  <Ionicons 
    style={{backgroundColor: 'transparent'}}
    name={'ios-checkmark-circle'} 
    size={30} 
    color={gray}
  /> 
);

const Unchecked = () => (
  <Ionicons 
    style={{backgroundColor: 'transparent'}}
    name={'ios-radio-button-off'} 
    size={30} 
    color={gray} 
  /> 
);

const CheckBox = ({isChecked, press}) => (
  <TouchableOpacity onPress={press}>
    {isChecked ? Checked() : Unchecked()}
  </TouchableOpacity>
); 

export default CheckBox;