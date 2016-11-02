import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: .5,
    borderColor: 'rgba(0,0,0,.2)',
    width: width * 0.9,
    margin: 20,
    borderRadius: (width * .9) / 2,
    paddingLeft: 10,
    height: 40
  },
});

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, width: width * 0.9 }}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ text })}
          placeholder="Search..."
          onSubmitEditing={() => this.props.enter(this.state.text)}
          returnKeyType={'search'}
        />
      </View>
    );
  }
}
