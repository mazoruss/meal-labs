import React from 'react';
import { Components } from 'exponent';
import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';
import Button from './Button';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  tile: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  picture: {
    height: 340,
    width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  headline: {
    width,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '100',
    color: 'rgba(0,0,0,.9)',
  },
  textBackground: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsWrapper: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

const Tile = ({
  recipe,
  mealId,
  url,
  showInfo,
  showInstructions,
  addMeal,
  removeMeal,
  location,
}) => (

  <View style={styles.tile}>
    <Image
      style={styles.picture}
      source={{ uri: recipe.image }}
    >
      <Components.BlurView
        style={styles.textBackground}
        tintEffect="light"
      >
        <Text style={styles.headline}>
          {recipe.label}
        </Text>
      </Components.BlurView>
      <View style={styles.buttonsWrapper}>
        { location === 'MealList' &&
          <Button
            onclick={() => { removeMeal(recipe._id, mealId); }}
            icon='ios-remove'
          />
        }
        { location === 'AddMeal' && 
          <Button
            onclick={() => { addMeal(recipe._id); }}
            icon='ios-add'
          />
        }
        <Button
          onclick={() => showInfo(recipe, mealId)}
          icon='ios-analytics-outline'
        />
        <Button
          onclick={() => showInstructions(url)}
          icon='ios-link-outline'
        />
      </View>
    </Image>
  </View>
);

export default Tile;