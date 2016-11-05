import React          from 'react';
import LogoDisplay    from './LogoDisplay';
import HeadBuffer     from './HeadBuffer';
import compileList    from '../lib/compileList';
import CheckBox       from './CheckBox';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Dimensions, 
  Text,
  TouchableOpacity,
} from 'react-native';

const width = Dimensions.get('window').width;

export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <HeadBuffer />
        <ScrollView>
          {this.props.shoppingList.map((item, i) => (
            <View 
              key={i}
              style={[styles.row, 
                {backgroundColor: i % 2 === 0 
                  ? 'rgba(0,0,0,.03)'
                  : 'transparent'}
            ]}>
              <View style={[styles.column, {flex: 4}]}>
                <Text style={{fontWeight: '100'}}>
                  {item.ingredient}
                </Text>
              </View>
              <View style={[styles.column, {flex: 2}]}>
                <Text style={{fontWeight: '100'}}>
                  {item.quantity}
                </Text>
              </View>
              <View style={[styles.checkBox]}>
                <CheckBox
                  isChecked={item.checked}
                  press={() => this.props.setChecked(i)}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  row: {
    width: width,
    height: 60,
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1, 
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
  },
  column: {
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    flexDirection: 'row'
  },
  checkBox: {
    flex: 1, 
    justifyContent: 'flex-end', 
    alignItems: 'center', 
    flexDirection: 'row'
  },
  contentContainer: {
    alignItems: 'center',
  }
});
