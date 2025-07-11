import Constants from 'expo-constants';

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
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: 'System',
  },
  fontWeights: {
    normal: '400',
    bold: '700',
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
  }
};

export default theme;