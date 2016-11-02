import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Component
} from 'react-native';


export default class AnimationTest extends React.Component {
  constructor () {
    super()
    const width = {steak: 5, cheese: 5, butter: 5}
    this.state = {
      steak: new Animated.Value(width.steak),
      cheese: new Animated.Value(width.cheese),
      butter: new Animated.Value(width.butter)
    }
  }
  
  handleAnimation () {
    const timing = Animated.timing
    const width = {steak: 50, cheese: 45, butter: 25}
    const indicators = ['steak', 'cheese', 'butter']
    Animated.parallel(indicators.map(item => {
      return timing(this.state[item], {toValue: width[item]})
    })).start()
  }
  
  render () {
   const {steak, cheese, butter} = this.state
  
   return (
      <View style={styles.container}>
        <Text onPress={this.handleAnimation.bind(this)}>Click me to animate</Text>
          <Text style={styles.label}>Steak</Text>
          <View style={styles.data}>
            <Animated.View style={[styles.bar, styles.steak, {width: steak}]} />
            <Text style={styles.dataNumber}>50</Text>
          </View>

          <Text style={styles.label}>Cheese</Text>
          <View style={styles.data}>
            <Animated.View style={[styles.bar, styles.cheese, {width: cheese}]} />
            <Text style={styles.dataNumber}>45</Text>
          </View>

          <Text style={styles.label}>Butter</Text>
          <View style={styles.data}>
            <Animated.View style={[styles.bar, styles.butter, {width: butter}]} />          
            <Text style={styles.dataNumber}>25</Text>
          </View>
      </View>
   )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 6
  },
  // Item
  label: {
    color: '#CBCBCB',
    flex: 1,
    fontSize: 12,
    position: 'relative',
    alignSelf: 'flex-end',
    top: 2
  },
  data: {
    flex: 2,
    flexDirection: 'row'
  },
  dataNumber: {
    color: '#CBCBCB',
    fontSize: 11
  },
  // Bar
  bar: {
    borderRadius: 5,
    height: 8,
    marginRight: 5
  },
  steak: {
    backgroundColor: '#F55443'
  },
  cheese: {
    backgroundColor: '#FCBD24'
  },
  butter: {
    backgroundColor: '#59838B'
  }
});