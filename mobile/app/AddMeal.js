import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MealTile from './MealTile';
import Searchbar from './Searchbar';
import LogoDisplay from './LogoDisplay';
import InfoDisplay from './InfoDisplay';
import Instructions from './Instructions';
import HeadBuffer from './HeadBuffer';

const userUrl = 'https://meal-labs.herokuapp.com/api/user/';
const recipeUrl = 'https://meal-labs.herokuapp.com/api/recipe/';
const mealUrl = 'https://meal-labs.herokuapp.com/api/meal/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentContainer: {
    alignItems: 'center',
  },
});

export default class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.addMeal = this.addMeal.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoInstructions = this.gotoInstructions.bind(this);
  }

  updateMeals() {
    fetch(userUrl + this.props.getUserId(), {
      method: 'GET',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then(res => res.json())
    .then((data) => {
      this.props.updateMealList(data.mealsObjs);
    });
  }

  getData(searchString) {
    fetch(recipeUrl + searchString, {
      method: 'GET',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then(res => res.json())
    .then((data) => {
      if (data) {
        this.props.updateSearchRecipes(data);
      }
    })
  }

  addMeal(recipeId) {
    var context = this;

    fetch(mealUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.getToken(),
      },
      body: JSON.stringify({
        userId: this.props.getUserId(),
        recipeId,
      }),

    })
    .then(() => context.updateMeals());
  }

  gotoNext(recipe) {
    this.props.navigator.push({
      component: InfoDisplay,
      passProps: {
        recipe,
        postMeal: this.postMeal,
        text: 'Add',
      },
    });
  }

  gotoInstructions(uri) {
    this.props.navigator.push({
      component: Instructions,
      passProps: {
        uri,
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <HeadBuffer />
        <LogoDisplay />

        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >
          <Searchbar enter={this.getData} />

          {this.props.getSearchRecipes.map((meal, i) => (
            <MealTile
              recipe={meal}
              url={meal.url}
              showInfo={this.gotoNext}
              showInstructions={this.gotoInstructions}
              key={i}
              addMeal={this.addMeal}
              location="AddMeal"
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

