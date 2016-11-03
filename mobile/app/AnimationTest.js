import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 6,
  },
  // Item
  label: {
    color: '#CBCBCB',
    flex: 1,
    fontSize: 12,
    position: 'relative',
    alignSelf: 'flex-end',
    top: 2,
  },
  data: {
    flex: 2,
    flexDirection: 'row',
  },
  dataNumber: {
    color: '#CBCBCB',
    fontSize: 11,
  },
  // Bar
  bar: {
    borderRadius: 5,
    height: 8,
    marginRight: 5,
    backgroundColor: '#59838B',
  },
});

export default class AnimationTest extends React.Component {
  static getWidth(data) {
    const deviceWidth = Dimensions.get('window').width;
    const maxWidth = deviceWidth - 50;
    const width = data < 100 ? (data / 100) * maxWidth : maxWidth;
    return width;
  }

  constructor(props) {
    super(props);
    this.nutrients = {};
    // Initialize nutrient values at 1 so that can animate up
    props.nutrition.forEach((nutrient) => {
      this.nutrients[nutrient.label] = new Animated.Value(1);
    });
    this.handleAnimation = this.handleAnimation.bind(this);
  }

  componentDidMount() {
    const animate = this.handleAnimation;
    setTimeout(animate, 300);
  }


  handleAnimation() {
    Animated.parallel(this.props.nutrition.map(nutrient =>
      Animated.timing(
        this.nutrients[nutrient.label],
        { toValue: AnimationTest.getWidth(nutrient.daily) }
      )
    )).start();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.nutrition.map(nutrient => (
          <View>
            <Text style={styles.label}>{nutrient.label}</Text>
            <View style={styles.data}>
              <Animated.View style={[styles.bar, { width: this.nutrients[nutrient.label] }]} />
              <Text style={styles.dataNumber}>{nutrient.daily}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

