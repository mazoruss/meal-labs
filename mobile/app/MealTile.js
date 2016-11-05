import React           from 'react';
import Button          from './Button';
import AnimatedButtons from './AnimatedButtons';
import { Components }  from 'exponent';
import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';


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
  showPriceBreakdown,
  addMeal,
  removeMeal,
  location,
}) => (
  <View style={styles.tile}>
    <Image
      style={styles.picture}
      source={{ uri: recipe.image }}
    >
      <AnimatedButtons 
        recipe={recipe}
        mealId={mealId}
        url={url}
        showInfo={showInfo}
        showInstructions={showInstructions}
        showPriceBreakdown={showPriceBreakdown}
        addMeal={addMeal}
        removeMeal={removeMeal}
        location={location}
      />
      <Components.BlurView
        style={styles.textBackground}
        tintEffect="light"
      >
        <Text style={styles.headline}>
          {recipe.label}
        </Text>
      </Components.BlurView>
    </Image>
  </View>
);

export default Tile;
