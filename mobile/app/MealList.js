import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MealTile from './MealTile';
import InfoDisplay from './InfoDisplay';
import Instructions from './Instructions';
import LogoDisplay from './LogoDisplay';
import HeadBuffer from './HeadBuffer';

const userUrl = 'https://meal-labs.herokuapp.com/api/user/';
const mealUrl = 'https://meal-labs.herokuapp.com/api/meal/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default class MealList extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.addMeal = this.addMeal.bind(this);
    this.removeMeal = this.removeMeal.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoInstructions = this.gotoInstructions.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData(cb) {
    fetch(userUrl + this.props.getUserId(), {
      method: 'GET',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then(res => res.json())
    .then((data) => {
      this.props.updateMealList(data.mealsObjs);
    }).done(() => {
      if (cb) { cb(); }
    });
  }

  addMeal(recipeId) {
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
    .then(() => this.getData())
  }

  removeMeal(recipeId, mealId) {
    fetch(mealUrl + mealId, {
      method: 'DELETE',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then(() => this.getData())
  }

  gotoNext(recipe, mealId) {
    this.props.navigator.push({
      component: InfoDisplay,
      passProps: {
        recipe,
        mealId,
        postMeal: this.postMeal,
        text: 'Remove',
      },
    });
  }

  gotoInstructions(url) {
    this.props.navigator.push({
      component: Instructions,
      passProps: {
        url,
      },
    });
  }

  render() {
    const postMeal = this.postMeal;

    return (
      <View style={styles.container}>
        <HeadBuffer />
        <LogoDisplay />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >
          {this.props.mealList.map((meal, i) => (
            <MealTile
              key={i}
              recipe={meal.recipe}
              url={meal.recipe.url}
              showInfo={this.gotoNext}
              showInstructions={this.gotoInstructions}
              mealId={meal._id} 
              addMeal={this.addMeal}
              removeMeal={this.removeMeal}
              location='MealList'
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

