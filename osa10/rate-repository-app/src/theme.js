import Constants from 'expo-constants';
import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    titles: '#ffffff',
    appBarBackground: '#000000',
    listBackground: '#ffffff',
    background: '#e1e4e8',
    btnBackgroud: '#0366d6',
    inputBackground: '#ffffff',
    inputBorder: '#cccccc',
    error: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  borderRadius: {
    small: 4,
    medium: 8,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
  },
  buttons: {
    primary: {
      backgroundColor: '#0366d6',
      color: '#ffffff',
      paddingVertical: 12,
      borderRadius: 4,
    },
  },
  appBar: {
    height: 50,
    paddingTop: Constants.statusBarHeight,
    alignItems: 'flex-end',
    flexItemHeight: 25,
  },
  list: {
    padding: 10,
    itemSpacing: 10,
  },
};

export default theme;
