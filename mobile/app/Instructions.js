import React          from 'react';
import HeadBuffer     from './HeadBuffer';
import ButtonHeader   from './ButtonHeader';
import {
  WebView,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});

export default class Instructions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <HeadBuffer />
        <ButtonHeader navigator={this.props.navigator}/>
        <WebView
          style={{width: width}}
          source={{uri: this.props.url}}
        />
      </View>
    );
  }
}