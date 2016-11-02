// https://github.com/facebook/react-native/blob/b998e5a7b74905b30b1137a02e14cd5e6f97fccc/Libraries/CustomComponents/Navigator/Navigator.js
import React          from 'react';
import Button         from './Button';
import MealList       from './MealList';
import ShoppingList   from './ShoppingList';
import AddMeal        from './AddMeal';
import styleVariables from '../styleVariables';

import { 
  StyleSheet, 
  View, 
  Dimensions 
} from 'react-native';

const width = Dimensions.get('window').width;
const { orange } = styleVariables;

const styles = StyleSheet.create({
  container: {
    width,
    height: 60,
    backgroundColor: orange,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});

const moveTo = (navigator, component) => {
  navigator.replace({ component });
};

const NavBar = (props) => {
  if (props.navigator.getCurrentRoutes().length > 1) {
    return (
      <View style={styles.container}>
        <Button 
          icon="ios-search-outline"   
          onclick={() => moveTo(props.navigator, AddMeal)} 
        />
        <Button 
          icon="ios-list"  
          onclick={() => moveTo(props.navigator, MealList)} 
        />
        <Button 
          icon="ios-basket-outline" 
          onclick={() => moveTo(props.navigator, ShoppingList)} 
        />
      </View>
    );
  }
  return null;
};

export default NavBar;
