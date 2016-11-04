import React from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  SegmentedControlIOS,
} from 'react-native';
import HeadBuffer from './HeadBuffer';
import ButtonHeader from './ButtonHeader';
import NutritionStats from './NutritionStats';
import MacrosChart from './MacrosChart';
import Ingredients from './Ingredients';

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
    justifyContent: 'center',
    maxWidth: width,
    padding: 10,
  },
});

class InfoDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    console.log('props.recipe.ingredients from InfoDisplay-', props.recipe.ingredients);
  }
  render() {
    const ingredients = this.props.recipe.ingredients
      .map(ingredient => ({
        ingredient: ingredient.text,
      }));

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
            values={['Ingredients', 'Nutrients', 'Calories']}
            selectedIndex={this.state.selectedIndex}
            onChange={(event) => {
              this.setState({
                selectedIndex: event.nativeEvent.selectedSegmentIndex,
              });
            }}
          />
        </View>
        {this.state.selectedIndex === 0 &&
          <View style={{ flexDirection: 'column' }}>
            <Ingredients recipe={ingredients} />
          </View>
        }
        {/* This section renders animated nutrition info */}
        <View style={styles.visualizations}>
          {this.state.selectedIndex === 1 &&
            <ScrollView contentContainerStyle={styles.scroller}>
              <NutritionStats
                yield={this.props.recipe.yield}
                nutrition={this.props.recipe.digest
                  .map(nutrient => ({ label: nutrient.label, daily: nutrient.daily }))}
              />
            </ScrollView>
          }
          {this.state.selectedIndex === 2 &&
            <MacrosChart
              name={this.props.recipe.label}
              nutrition={this.props.recipe.digest}
              height={width * 0.9}
              width={width * 0.9}
            />
          }
        </View>
      </View>
    );
  }
}

export default InfoDisplay;
