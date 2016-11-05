import React from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from 'react-native';
import HeadBuffer from './HeadBuffer';
import ButtonHeader from './ButtonHeader';

const priceUrl = 'https://meal-labs.herokuapp.com/api/price/';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
  loadScreen: {
    flex: 1,
    height: height - 120,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class PriceBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);

    this.state = {
      loading: false,
    };
  }

  componentWillMount() {
    this.getData(() => this.setLoading());
  }

  setLoading() {
    this.setState({ loading: !this.state.loading });
  }

  getData(cb) {
    this.setLoading();

    const ingredients = this.props.recipe.ingredients;
    let ingredientsString = '';
    ingredients.forEach((item) => {
      ingredientsString = ingredientsString.concat(item.text).concat('\n');
    });

    fetch(priceUrl + ingredientsString, {
      method: 'GET',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
    })
    .done(() => cb ? cb() : null);
  }

  render() {
    return (
      <View style={styles.container}>
        <HeadBuffer />
        <ButtonHeader navigator={this.props.navigator} name={this.props.recipe.label} />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >
          {!this.state.loading &&
            <Text
              style={{ width }}
            >
              hello world
            </Text>
          }
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
