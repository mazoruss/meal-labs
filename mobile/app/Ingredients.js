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
    marginLeft: 20,
    marginRight: 20,
  },
  contentContainer: {
    alignItems: 'center',
  },
});

const Ingredients = ({ recipe }) => (
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
          <Text style={{ fontWeight: '100' }} numberOfLines={2}>
            {item.ingredient}
          </Text>
        </View>
      </View>
    ))}
  </ScrollView>
);

export default Ingredients;

