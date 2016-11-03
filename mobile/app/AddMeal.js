import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MealTile from './MealTile';
import Searchbar from './Searchbar';
import LogoDisplay from './LogoDisplay';
import InfoDisplay from './InfoDisplay';
import HeadBuffer from './HeadBuffer';

const recipeUrl = 'https://meal-labs.herokuapp.com/api/recipe/';
const mealUrl = 'https://meal-labs.herokuapp.com/api/meal/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentContainer: {
    alignItems: 'center'
  },
});

export default class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.addMeal = this.addMeal.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
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
    }).done();
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

  render() {
    const postMeal = this.postMeal;
    const isInList = this.props.isInList;
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
              showInfo={this.gotoNext}
              key={i}
              addMeal={this.addMeal}
              location='AddMeal'
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

