import React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
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
  <ScrollView styles={styles.container}>
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
);

export default Ingredients;

