import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import HeadBuffer from './HeadBuffer';
import ButtonHeader from './ButtonHeader';

const priceUrl = '';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});

export default class PriceBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    // this.getData();
  }

  getData() {
    fetch(priceUrl, {
      method: 'GET',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then(res => res.json())
    .then((data) => {
      if (data) {
        console.log(data);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <HeadBuffer />
        <ButtonHeader navigator={this.props.navigator} name={this.props.recipe.label} />
        <Text
          style={{ width }}
        >
          hello world
        </Text>
      </View>
    );
  }
}
