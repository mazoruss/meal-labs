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
      showButtons: false,
      bookmarked: false
    }
  }

  toggleButtons() {
    LayoutAnimation.spring();
    this.setState({showButtons: !this.state.showButtons})
  }

  addBookmark(id) {
    this.props.addMeal(id);
    this.setState({bookmarked: true}); 
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
    const bookmarked = this.state.bookmarked;

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
              icon={bookmarked 
                ? "ios-bookmark" 
                : "ios-bookmark-outline"}
              onclick={() => { 
                bookmarked ? null : this.addBookmark(recipe._id)
              }}
            />
          </View>
        }
        <View style={showing ? styles.showing : styles.hidden}>
          <Button
            icon="ios-pie-outline"
            onclick={() => {
              showInfo(recipe, mealId)
              this.toggleButtons()
            }}
          />
        </View>
        <View style={showing ? styles.showing : styles.hidden}>
          <Button
            icon="ios-cash-outline"
            onclick={() => {
              showPriceBreakdown(recipe)
              this.toggleButtons()
            }}
          />
        </View>
        <View style={showing ? styles.showing : styles.hidden}>
          <Button
            icon="ios-link-outline"
            onclick={() => {
              showInstructions(url, recipe.label)
              this.toggleButtons()
            }}
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

