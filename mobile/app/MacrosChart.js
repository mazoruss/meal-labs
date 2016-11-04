import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PieChart from './PieChart';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    // margin: 5,
  },
  charts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#3D3D3D',
    fontSize: 30,
    fontWeight: '100',
    marginBottom: 10,
  },
  legendText: {
    color: '#3D3D3D',
    fontSize: 12,
    fontWeight: '100',
  },
  minorText: {
    color: '#3D3D3D',
    fontSize: 12,
    fontStyle: 'italic',
    alignSelf: 'center',
    fontWeight: '100',
  },
  macros: {
    alignSelf: 'flex-start',
    flex: 27,
    marginTop: 5,
  },
  recommended: {
    alignSelf: 'center',
  },
  chartsRight: {
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 10,
  },
  legend: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  key: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  keyColor: {
    marginLeft: 5,
    marginTop: 4,
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

    this.colors = ['#ff6b6b', '#383f51', '#dddbf1'];
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Calorie Breakdown (%)</Text>
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
                  <Text style={styles.legendText}>
                    {macro[0]}
                  </Text>
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
              <Text style={styles.minorText}>
                Optimal
              </Text>
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
