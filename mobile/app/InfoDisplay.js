import React          from 'react';
import HeaderDisplay  from './HeaderDisplay';
import Column         from './Column';
import HeadBuffer     from './HeadBuffer';
import ButtonHeader   from './ButtonHeader';
import styleVariables from '../styleVariables';
import AnimationTest  from './AnimationTest';

import {
  ScrollView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const { orange } = styleVariables;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
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
      test: 'test',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <HeadBuffer />
        <ButtonHeader navigator={this.props.navigator}/>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => { this.props.navigator.pop(); }}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 20,
              right: 20,
            }}
          >
           {/* <Ionicons
              style={{ backgroundColor: 'transparent' }}
              name={'ios-arrow-back'}
              size={40}
              color="white"
            />*/}
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scroller}>
          {/* This section renders animated nutrition info(is a mock atm) */}
          <View>
            <AnimationTest
              nutrition={[
                { label: 'steak', daily: '78', otherAtr: 'none' },
                { label: 'cheese', daily: '55', otherAtr: 'none' },
                { label: 'butter', daily: '29', otherAtr: 'none' },
              ]}
            />
          </View>
          {/* This section renders ingredients */}
          <View style={styles.table}>
            <Column
              data={this.props.recipe.ingredients}
              name="Ingredient"
              index="food"
            />
            <Column
              data={this.props.recipe.ingredients}
              name="Qty"
              index="quantity"
              alignRight
            />
            <Column
              data={this.props.recipe.ingredients}
              name="Unit"
              index="measure"
              alignRight
            />
          </View>
          {/* This section renders nutrition info */}
          <View style={styles.table}>
            <Column
              data={compileNutrition(this.props.recipe.digest)}
              name="Nutrient"
              index="label"
            />
            <Column
              data={compileNutrition(this.props.recipe.digest)}
              name="Qty"
              index="totalUnit"
              alignRight
            />
            <Column
              data={compileNutrition(this.props.recipe.digest)}
              name="Daily"
              index="dailyPercent"
              alignRight
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default InfoDisplay;
