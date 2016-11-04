import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PieChart from './PieChart';

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    flex: 1,
    marginTop: 5,
    justifyContent: 'space-between',
    margin: 5,
    borderWidth: 1,
  },
  charts: {
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  macros: {
    alignSelf: 'flex-start',
    flex: 2,
    marginTop: 5,
    marginLeft: 5,
    // marginLeft: 5,
  },
  recommended: {
    alignSelf: 'center',
  },
  chartsRight: {
    // alignSelf: 'flex-end',
    // marginRight: 5,
    height: 200,
    justifyContent: 'space-between',
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
  },
  legend: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    borderWidth: 1,
    marginTop: 20,
    marginRight: 20,
  },
  key: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  keyColor: {
    marginTop: 5,
  },
});

export default class MacrosChart extends React.Component {
  constructor(props) {
    super(props);
    // Only pay attention to Fat, Carbs, and Protein for macros pie chart
    this.macroNutrients = this.props.nutrition
      .map(nutrient => [nutrient.label, nutrient.total, nutrient.unit])
      .slice(0, 3)
      // Fats have 9 calories per gram, proteins and carbs have 4 calories per gram
      // eslint-disable-next-line no-confusing-arrow
      .map(macro => macro[0] === 'Fat' ? [macro[0], macro[1] * 9, macro[2]] : [macro[0], macro[1] * 4, macro[2]]);

    this.colors = ['#4DC4E6', '#333333', '#999999', '#DF8165', '#F5F5F5', '#90C456', '#374E5C', '#4a697c'];
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> % of Calories from...</Text>
        <View style={styles.charts}>
          <View style={styles.macros}>
            <PieChart
              height={0.69 * this.props.height}
              width={0.69 * this.props.width}
              data={this.macroNutrients.map(macro => macro[1])}
              colors={this.colors}
            />
          </View>
          <View style={styles.chartsRight}>
            <View style={styles.legend}>
              {this.macroNutrients.map((macro, index) => (
                <View style={styles.key} key={index}>
                  <Text> {macro[0]} </Text>
                  <View style={styles.keyColor}>
                    <PieChart
                      height={10}
                      width={10}
                      data={[1]}
                      colors={[this.colors[index]]}
                    />
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.recommended}>
              <Text> Recommended </Text>
              <PieChart
                height={0.29 * this.props.height}
                width={0.29 * this.props.width}
                data={[25, 55, 20]}
                colors={this.colors}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
