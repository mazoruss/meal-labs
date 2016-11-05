import React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: height - 180,
    justifyContent: 'flex-start'
  },
  row: {
    width,
    height: 60,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const Ingredients = ({ recipe }) => (
  <View style={styles.container} >
    <ScrollView>
      {recipe.map((item, i) => (
        <View
          key={i}
          style={[styles.row,
            { backgroundColor: i % 2 === 0
              ? 'rgba(0,0,0,.1)'
              : 'transparent' },
          ]}
        >
          <View>
            <Text style={{ fontWeight: '100' }} >
              {item.ingredient}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  </View>
);

export default Ingredients;

