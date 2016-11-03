import React from 'react';
import {
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  searchBar: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,.05)',
    width: width * 0.9,
    margin: 20,
    borderRadius: 2,
    paddingLeft: 10,
    height: 50,
  },
});

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  reset() {
    this.setState({ text: '' });
  }

  render() {
    return (
      <TextInput
        style={styles.searchBar}
        underlineColorAndroid="transparent"
        onChangeText={text => this.setState({ text })}
        placeholder="Search..."
        onSubmitEditing={() => {
          this.props.enter(this.state.text);
          this.reset();
        }}
        returnKeyType={'search'}
      />
    );
  }
}
