import React from 'react';
import { Components } from 'exponent';
import styleVariables from '../styleVariables';
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
    justifyContent: 'flex-start'
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
  }
});

const Tile = ({ 
  recipe,
  url,
  mealId,
  showInfo
}) => (
  <TouchableHighlight onPress={() => showInfo(recipe, url, mealId)}>
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
      </Image>
    </View>
  </TouchableHighlight>
);

export default Tile;
