import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
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
  },
  steak: {
    backgroundColor: '#F55443',
  },
  cheese: {
    backgroundColor: '#FCBD24',
  },
  butter: {
    backgroundColor: '#59838B',
  },
});

export default class AnimationTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // Initialize nutrient values at 1 so that can animate up
    props.nutrition.forEach((nutrient) => {
      this.state[nutrient.label] = new Animated.Value(1);
    });
    this.handleAnimation = this.handleAnimation.bind(this);
  }

  componentDidMount() {
    const animate = this.handleAnimation;
    setTimeout(animate, 300);
  }

  handleAnimation() {
    const timing = Animated.timing;
    const width = { steak: 100, cheese: 145, butter: 205 };
    const indicators = ['steak', 'cheese', 'butter'];
    Animated.parallel(indicators.map(item =>
      timing(this.state[item], { toValue: width[item] })
    )).start();
  }

  render() {
    const { steak, cheese, butter } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Steak</Text>
        <View style={styles.data}>
          <Animated.View style={[styles.bar, styles.steak, { width: steak }]} />
          <Text style={styles.dataNumber}>50</Text>
        </View>

        <Text style={styles.label}>Cheese</Text>
        <View style={styles.data}>
          <Animated.View style={[styles.bar, styles.cheese, { width: cheese }]} />
          <Text style={styles.dataNumber}>45</Text>
        </View>

        <Text style={styles.label}>Butter</Text>
        <View style={styles.data}>
          <Animated.View style={[styles.bar, styles.butter, { width: butter }]} />
          <Text style={styles.dataNumber}>25</Text>
        </View>
      </View>
    );
  }
}

