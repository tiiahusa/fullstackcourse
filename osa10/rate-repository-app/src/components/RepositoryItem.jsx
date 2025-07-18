import { View, TouchableHighlight, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import formatNum from '../utils/utils';

const styles = StyleSheet.create({
  container: {
    padding: theme.list.padding,
    backgroundColor: theme.colors.listBackground,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: theme.list.itemSpacing,
  },
  logo: {
    width: 66,
    height: 58,
    marginRight: theme.list.itemSpacing,
  },
  infoSection: {
    flexShrink: 1,
    gap: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
});

const RepositoryItem = ({ item, index, separators }) => {
  const handlePress = () => {
    console.log('Pressed item:', item);
  };

  return (
    <TouchableHighlight
      key={index}
      onPress={handlePress}
      onShowUnderlay={separators?.highlight}
      onHideUnderlay={separators?.unhighlight}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
          <View style={styles.infoSection}>
            <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
            <Text>{item.description}</Text>
            <Text color="btn">{item.language}</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text fontWeight="bold">{formatNum(item.stargazersCount)}</Text>
            <Text>Stars</Text>
          </View>
          <View style={styles.statItem}>
            <Text fontWeight="bold">{formatNum(item.forksCount)}</Text>
            <Text>Forks</Text>
          </View>
          <View style={styles.statItem}>
            <Text fontWeight="bold">{formatNum(item.reviewCount)}</Text>
            <Text>Reviews</Text>
          </View>
          <View style={styles.statItem}>
            <Text fontWeight="bold">{formatNum(item.ratingAverage)}</Text>
            <Text>Rating</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default RepositoryItem;
