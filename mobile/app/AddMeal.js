import React        from 'react';
import MealTile     from './MealTile';
import Searchbar    from './Searchbar';
import LogoDisplay  from './LogoDisplay';
import InfoDisplay  from './InfoDisplay';
import Instructions from './Instructions';
import HeadBuffer   from './HeadBuffer';

import { 
  StyleSheet, 
  View, 
  ScrollView,
  Text,
  ActivityIndicator,
  Dimensions 
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
  loadScreen: {
    flex: 1, 
    height: height - 260, 
    width: width, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

export default class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.addMeal = this.addMeal.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoInstructions = this.gotoInstructions.bind(this);

    this.state = {
      loading: false
    }
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

  setLoading() {
    this.setState({ loading: !this.state.loading })
  }

  getData(searchString) {
    const context = this;
    this.setLoading();

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
    .done(() => context.setLoading())
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
    .then(() => context.updateMeals())
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

  gotoInstructions(uri, title) {
    this.props.navigator.push({
      component: Instructions,
      passProps: {
        uri,
        title
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

          {!this.state.loading && 
            this.props.getSearchRecipes.map((meal, i) => (
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
          {this.state.loading && 
            <View style={styles.loadScreen}>
              <ActivityIndicator />
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}

