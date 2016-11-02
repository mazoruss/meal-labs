import Exponent from 'exponent';
import React from 'react';
import { Navigator } from 'react-native';

import NavBar from './app/NavBar';
import Login from './app/Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      token: null,
      mealList: [],
      searchRecipes: [],
      shoppingList: [],
    };

    this.getToken            = this.getToken.bind(this);
    this.getUserId           = this.getUserId.bind(this);
    this.updateMealList      = this.updateMealList.bind(this);
    this.updateToken         = this.updateToken.bind(this);
    this.updateUserId        = this.updateUserId.bind(this);
    this.updateSearchRecipes = this.updateSearchRecipes.bind(this);
    this.renderScene         = this.renderScene.bind(this);
    this.removeMealFromList  = this.removeMealFromList.bind(this);
  }

  getToken() { return this.state.token; }
  getUserId() { return this.state.userId; }
  updateMealList(mealList) { this.setState({ mealList }); }
  updateToken(token) { this.setState({ token }); }
  updateUserId(userId) { this.setState({ userId }); }
  updateSearchRecipes(searchRecipes) { this.setState({ searchRecipes }); }

  removeMealFromList (meal) {
    console.log('REMOVING', this.state.mealList.length)


    this.setState({
      mealList: this.state.mealList.filter(m => m.recipe.label !== meal.label)
    });

    setTimeout(()=> console.log('AFTER',this.state.mealList.length), 100)
  }

  renderScene(route, navigator) {
    return (
      <route.component
        {...route.passProps}
        navigator={navigator}
        mealList={this.state.mealList}
        getToken={this.getToken}
        getUserId={this.getUserId}
        getSearchRecipes={this.state.searchRecipes}
        updateMealList={this.updateMealList}
        updateToken={this.updateToken}
        updateUserId={this.updateUserId}
        updateSearchRecipes={this.updateSearchRecipes}
        removeMealFromList={this.removeMealFromList}
      />
    );
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ name: 'Login', component: Login }}
        renderScene={this.renderScene}
        configureScene={() => Navigator.SceneConfigs.PushFromRight}
        navigationBar={<NavBar navigator={this.navigator} />}
      />
    );
  }
}

Exponent.registerRootComponent(App);

