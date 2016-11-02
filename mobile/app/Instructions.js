import React from 'react';
import {
  WebView,
  Text,
  View,
} from 'react-native';

export default class Instructions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>
          {this.props.url}
        </Text>
        <WebView
          style={{flex: 1}}
          source={{uri: this.props.url}}
        />
      </View>
    );
  }
}