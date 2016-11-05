// https://github.com/facebook/react-native/blob/b998e5a7b74905b30b1137a02e14cd5e6f97fccc/Libraries/CustomComponents/Navigator/Navigator.js
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import React from 'react';
import Button from './Button';
import MealList from './MealList';
import ShoppingList from './ShoppingList';
import AddMeal from './AddMeal';
import styleVariables from '../styleVariables';


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
    alignItems: 'center',
  },
});

const moveTo = (navigator, component, name) => {
  navigator.replace({ name, component});
};

const NavBar = (props) => {
  if (props.navigator.getCurrentRoutes().length > 1) {

    const routes = props.navigator.getCurrentRoutes();
    const name = routes[routes.length - 1].name || '';
    console.log(name)
    return (
      <View style={styles.container}>
        <Button
          icon={name === 'mealList' ? 'ios-bookmarks' : 'ios-bookmarks-outline'}
          onclick={() => moveTo(props.navigator, MealList, 'mealList')}
        />
        <Button
          icon={name === 'shoppingList' ? 'ios-basket' : 'ios-basket-outline'}
          onclick={() => moveTo(props.navigator, ShoppingList, 'shoppingList')}
        />
        <Button
          icon={name === 'addMeal' ? 'ios-search' : 'ios-search-outline'}
          onclick={() => moveTo(props.navigator, AddMeal, 'addMeal')}
        />
      </View>
    );
  }
  return null;
};

export default NavBar;
