import React          from 'react';
import HeadBuffer     from './HeadBuffer';
import ButtonHeader   from './ButtonHeader';
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
        <HeadBuffer />
        <ButtonHeader navigator={this.props.navigator}/>
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