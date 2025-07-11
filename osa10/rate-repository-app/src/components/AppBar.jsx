import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import { Link } from "react-router-native";
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.appBar.paddingTop,
    backgroundColor: theme.colors.appBarBackground,
    display: 'flex',
    height: theme.appBar.height,
    alignItems: theme.appBar.alignItems,
  },
  flexItem: {
    height: theme.appBar.flexItemHeight,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.list.padding,
    marginLeft: theme.list.itemSpacing,
  },
})

const AppBar = () => {
  return (
    
        <View style={styles.container}>
            <View style={styles.flexItem}>
                <Link to="/list">
                    <Text fontWeight="bold" fontSize="subheading" color="titles">Repositories</Text>
                </Link>
                <Link to="/signin">
                    <Text fontWeight="bold" fontSize="subheading" color="titles">Sign In</Text>
                </Link>
            </View>
        </View>
  )
};

export default AppBar;