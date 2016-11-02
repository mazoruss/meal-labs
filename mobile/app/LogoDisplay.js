import React          from 'react';
import styleVariables from '../styleVariables';
import { 
  View, 
  Dimensions, 
  Text, 
  StyleSheet 
} from 'react-native';

const { orange } = styleVariables;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  logo: {
    width,
    height: 44,
    backgroundColor: orange,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  headline: {
    fontSize: 30,
    marginTop: 2,
    color: 'white',
  },
});

const LogoDisplay = () => (
  <View style={styles.logo}>
    <Text style={styles.headline}>Meal Labs</Text>
  </View>
);

export default LogoDisplay;
