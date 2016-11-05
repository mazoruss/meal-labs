import React from 'react';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import {
  StyleSheet,
  TextInput,
  Dimensions,
  View,
  Text,
  LayoutAnimation,
  TouchableHighlight
} from 'react-native';
import styleVariables from '../styleVariables';

const { orange } = styleVariables;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    height: 30,
    textAlign: 'center'
  },
  searchBarFocused: {
    textAlign: 'left',
    flex: 4,
    backgroundColor: 'white',
    borderRadius: 8,
    height: 30,
    maxWidth: width - 80,
    paddingLeft: 10,
  },
  searchBarWrapper: {
    width: width,
    maxHeight: 48,
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: orange,
    flexDirection: 'row',
    position: 'relative',
  },
  cancelButton: {
    height: 30, 
    opacity: 1, 
    width: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    right: 5,
    position: 'absolute',
    borderRadius: 8
  }
});

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: '' ,
      focused: false
    };
  }

  reset() {
    this.setState({ text: '' });
  }

  toggleFocus(state) {
    LayoutAnimation.spring();
    this.setState({
      focused: state
    });
  }

  render() {
    return (
      <View style={styles.searchBarWrapper}>
        <TextInput
          underlineColorAndroid="transparent"
          value={this.state.text}
          placeholder="Search Meals..."
          returnKeyType={'search'}
          clearButtonMode={'while-editing'}
          blurOnSubmit={true}
          onChangeText={text => this.setState({ text })}
          onFocus={() => this.toggleFocus(true)}
          style={this.state.focused 
            ? styles.searchBarFocused 
            : styles.searchBar}
          onSubmitEditing={() => {
            this.props.enter(this.state.text);
            this.reset();
          }}
          onBlur={() => {
            this.toggleFocus(false)
            this.reset()
          }}
        />
        <TouchableHighlight
          onPress={() => dismissKeyboard() }
          underlayColor={'rgba(0,0,0,.1)'}
          style={this.state.focused 
            ? styles.cancelButton 
            : {width: 0, opacity: 0, height: 30}}
        >
          <Text style={{color: 'white'}}>
            Cancel
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
