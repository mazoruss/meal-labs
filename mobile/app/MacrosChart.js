import React from 'react';
import { Dimensions } from 'react-native';
import PieChart from './PieChart';


const width = Dimensions.get('window').width;

export default class MacrosChart extends React.Component {
  constructor(props) {
    super(props);
    this.macroNutrients = this.props.nutrition
      .map(nutrient => [nutrient.label, nutrient.total, nutrient.unit])
      .slice(0, 3)
      // eslint-disable-next-line no-confusing-arrow
      .map(macro => macro[0] === 'Fat' ? [macro[0], macro[1] * 9, macro[2]] : [macro[0], macro[1] * 4, macro[2]]);

    console.log(this.macroNutrients);
  }

  render() {
    return (
      <PieChart
        height={0.9 * width}
        width={0.9 * width}
        data={this.macroNutrients.map(macro => macro[1])}
      />
    );
  }
}
