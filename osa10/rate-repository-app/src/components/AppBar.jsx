import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
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
  },
})

const onClick = () => {
    console.log("klik");
}

const AppBar = () => {
  return (
    <Pressable onPress={onClick}>
        <View style={styles.container}>
            <View style={styles.flexItem}>
                <Text fontWeight="bold" fontSize="subheading" color="titles">Repositories</Text>
            </View>
        </View>
    </Pressable>
  )
};

export default AppBar;