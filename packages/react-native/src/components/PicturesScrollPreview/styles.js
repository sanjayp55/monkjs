import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column-reverse',
    width: 125,
    ...Platform.select({
      native: { height: '100%' },
      default: { height: '100vh' },
    }),
  },
  scrollContainer: {
    flex: 1,
    overflow: 'visible',
    padding: 8,
  },
  gradient: {
    position: 'absolute',
    top: 153,
    width: 104,
    height: 50,
    alignSelf: 'center',
    zIndex: 10,
  },
  sightsIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sightsIndicatorText: {
    position: 'relative',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 11,
    width: 62,
    height: 28,
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 9,
    lineHeight: 28,
  },
  sightsIndicatorCounter: {
    width: 62,
    borderRadius: 9,
    height: 28,
    position: 'absolute',
  },
});
export default styles;