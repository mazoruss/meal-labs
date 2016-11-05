import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  ActionSheetIOS,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@exponent/vector-icons';

import React from 'react';
import styleVariables from '../styleVariables';
import Button from './Button';

const { orange } = styleVariables;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  logo: {
    width,
    height: 44,
    backgroundColor: orange,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  headline: {
    fontSize: 30,
    marginTop: 2,
    color: 'white',
    fontWeight: '100',
  },
});


class LogoDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.showShareActionSheet = this.showShareActionSheet.bind(this);
  }

  showShareActionSheet() {
    let shoppingList = '';
    this.props.shoppingList.forEach((item) => {
      shoppingList += item;
    });

    ActionSheetIOS.showShareActionSheetWithOptions({
      url: 'https://github.com/language-labs/meal-labs',
      message: shoppingList,
      subject: 'My shoppingList',
    },
    error => alert(error),
    (success, method) => {
      let text;
      if (success) {
        text = `Shared via ${method}`;
      } else {
        text = 'You didn\'t share';
      }
      this.setState({ text });
    });
  }

  render() {
    return (
      <View style={styles.logo}>
        <Text style={styles.headline}>MEAL. LABS</Text>
        {this.props.share &&
          <TouchableOpacity 
            style={{position: 'absolute', top: 5, left: 20}}
            onPress={this.showShareActionSheet}
          >
            <Ionicons
              style={{ backgroundColor: 'transparent' }}
              name='ios-share-outline'
              size={30}
              color="white"
            />
          </TouchableOpacity>
        }
      </View>
    );
  }
};

export default LogoDisplay;
