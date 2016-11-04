import React from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  SegmentedControlIOS,
} from 'react-native';
import Column from './Column';
import HeadBuffer from './HeadBuffer';
import ButtonHeader from './ButtonHeader';
import NutritionStats from './NutritionStats';
import MacrosChart from './MacrosChart';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    width,
  },
  visualizations: {
    width: 0.95 * width,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  picture: {
    width: width * 0.9,
    height: 250,
    opacity: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  click: { fontSize: 30 },
  table: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  scroller: {
    marginBottom: 50,
  },
  segmentedControl: {
    flexDirection: 'row',
  },
});

/* eslint-disable no-param-reassign */
const compileNutrition = (data) => {
  const result = [];
  data.forEach((item) => {
    result.push(item);
    if (item.sub) {
      item.sub.forEach((subItem) => {
        subItem.label = ` ${subItem.label}`;
        result.push(subItem);
      });
    }
  });
  result.forEach((item) => {
    const totalUnit = Number(Number(item.total).toFixed(2)).toString() + item.unit;
    item.totalUnit = totalUnit;
    const dailyPercent = `${Number(Number(item.daily).toFixed(1)).toString()}%`;
    item.dailyPercent = dailyPercent;
  });
  return result;
};
/* eslint-enable no-param-reassign */

class InfoDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    console.log('recipe yield--', this.props.recipe.yield);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HeadBuffer />
          <ButtonHeader navigator={this.props.navigator} name={this.props.recipe.label} />
        </View>
        <View style={styles.segmentedControl}>
          <SegmentedControlIOS
            style={{ flex: 1 }}
            tintColor="#59838B"
            values={['Calories', 'Nutrients']}
            selectedIndex={this.state.selectedIndex}
            onChange={(event) => {
              this.setState({
                selectedIndex: event.nativeEvent.selectedSegmentIndex,
              });
            }}
          />
        </View>
        {/* This section renders animated nutrition info */}
        <View style={styles.visualizations}>
          {this.state.selectedIndex === 0 &&
            <MacrosChart
              name={this.props.recipe.label}
              nutrition={this.props.recipe.digest}
              height={width * 0.9}
              width={width * 0.9}
            />
          }
          {this.state.selectedIndex === 1 &&
            <ScrollView contentContainerStyle={styles.scroller}>
              <NutritionStats
                yield={this.props.recipe.yield}
                nutrition={this.props.recipe.digest
                  .map(nutrient => ({ label: nutrient.label, daily: nutrient.daily }))}
              />
            </ScrollView>
          }
        </View>
      </View>
    );
  }
}

export default InfoDisplay;
