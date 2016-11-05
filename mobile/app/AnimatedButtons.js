import React          from 'react';
import Button         from './Button';
import { Components } from 'exponent';
import {
  View,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';


const styles = StyleSheet.create({
  buttonsWrapper: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  showing: {
    opacity: 1,
    transform: [{scale: .8}],
    marginTop: -10,
  },
  hidden: {
    opacity: 0,
    width: 0,
    height: 0
  },
});

export default class AnimatedButtons extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showButtons: false
    }
  }

  toggleButtons() {
    LayoutAnimation.spring();
    this.setState({showButtons: !this.state.showButtons})
  }

  render() {

    const {
      recipe,
      mealId,
      url,
      showInfo,
      showInstructions,
      showPriceBreakdown,
      addMeal,
      removeMeal,
      location,
    } = this.props

    const showing = this.state.showButtons;

    return (
      <View style={styles.buttonsWrapper}>
        { location === 'MealList' &&
          <View style={showing ? styles.showing : styles.hidden}>
            <Button
              onclick={() => { removeMeal(recipe._id, mealId); }}
              icon="ios-remove"
            />
          </View>
        }
        { location === 'AddMeal' &&
          <View style={showing ? styles.showing : styles.hidden}>
            <Button
              onclick={() => { addMeal(recipe._id); }}
              icon="ios-add"
            />
          </View>
        }
        <View style={showing ? styles.showing : styles.hidden}>
          <Button
            onclick={() => showInfo(recipe, mealId)}
            icon="ios-pie-outline"
          />
        </View>
        <View style={showing ? styles.showing : styles.hidden}>
          <Button
            onclick={() => showPriceBreakdown(recipe)}
            icon="ios-cash-outline"
          />
        </View>
        <View style={showing ? styles.showing : styles.hidden}>
          <Button
            onclick={() => showInstructions(url, recipe.label)}
            icon="ios-link-outline"
          />
        </View>
        <View>
          <Button
            onclick={() => this.toggleButtons()}
            icon={showing ? "ios-close" : "ios-more-outline"}
          />
        </View>
      </View>
    );
  }
}

