import React from 'react';
import { Components } from 'exponent';
import styleVariables from '../styleVariables';
import Button from './Button'
import { 
  View, 
  Image, 
  Dimensions, 
  Text, 
  StyleSheet, 
  TouchableHighlight 
} from 'react-native';

const { gray } = styleVariables;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  tile: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  picture: {
    height: 340,
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative'
  },
  headline: {
    width: width,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '100',
    color: 'rgba(0,0,0,.9)'
  },
  textBackground: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsWrapper: {
    position: 'absolute',
    bottom: 20,
    right: 20
  }
});

const Tile = ({ 
  recipe,
  mealId,
  url,
  showInfo,
  addMeal,
  removeMeal,
  location
}) => (

  <View style={styles.tile}>
    <Image
      style={styles.picture}
      source={{ uri: recipe.image }}
    > 
      <Components.BlurView 
        style={styles.textBackground}
        tintEffect='light'
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
      </View>
    </Image>
  </View>
);

export default Tile;