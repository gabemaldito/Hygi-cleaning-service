import { Platform } from 'react-native';

export const Layout = {
  borderRadius: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  shadows: {
    card: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
};

export default Layout;
