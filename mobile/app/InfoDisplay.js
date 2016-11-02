import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import HeaderDisplay from './HeaderDisplay';
import Button from './Button';
import Column from './Column';
import HeadBuffer from './HeadBuffer';
import styleVariables from '../styleVariables';
import AnimationTest from './AnimationTest';

const { orange } = styleVariables;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: width * 0.9,
    marginTop: 10,
  },
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
  header: {
    width,
    height: 44,
    backgroundColor: orange,
    justifyContent: 'flex-start',
    paddingLeft: 20,
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

const InfoDisplay = props => (
  <View style={styles.container}>
    <HeadBuffer />
    <View style={styles.header}>
      <Button
        icon="ios-arrow-back"
        onclick={() => { props.navigator.pop(); }}
      />
    </View>
    <ScrollView contentContainerStyle={styles.scroller}>
      <View style={styles.buttonContainer}>
        <Button
          onclick={() => { props.postMeal(props.recipe._id, props.mealId); }} // eslint-disable-line
          text={props.text}
        />
      </View>
      {/* This section renders animated nutrition info(is a mock atm) */}
      <View>
        <AnimationTest />
      </View>
      {/* This section renders ingredients */}
      <View style={styles.table}>
        <Column
          data={props.recipe.ingredients}
          name="Ingredient"
          index="food"
        />
        <Column
          data={props.recipe.ingredients}
          name="Qty"
          index="quantity"
          alignRight
        />
        <Column
          data={props.recipe.ingredients}
          name="Unit"
          index="measure"
          alignRight
        />
      </View>
      {/* This section renders nutrition info */}
      <View style={styles.table}>
        <Column
          data={compileNutrition(props.recipe.digest)}
          name="Nutrient"
          index="label"
        />
        <Column
          data={compileNutrition(props.recipe.digest)}
          name="Qty"
          index="totalUnit"
          alignRight
        />
        <Column
          data={compileNutrition(props.recipe.digest)}
          name="Daily"
          index="dailyPercent"
          alignRight
        />
      </View>
    </ScrollView>
  </View>
);

export default InfoDisplay;
