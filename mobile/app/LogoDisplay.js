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

    this.state = {
      text: 'stuff',
    };
    this.showShareActionSheet = this.showShareActionSheet.bind(this);
  }

  showShareActionSheet() {
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: 'https://www.google.com',
      message: 'message to go with the shared url',
      subject: 'a subject to go in the email heading',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter',
      ],
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
