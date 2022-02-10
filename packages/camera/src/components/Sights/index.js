import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Platform, StyleSheet, ScrollView, Text, Switch, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { useMediaQuery } from 'react-responsive';

import useWindowDimensions from '../../hooks/useWindowDimensions';

import Thumbnail from '../Thumbnail';
import Actions from '../../actions';

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 68,
  },
  text: {
    alignSelf: 'center',
    color: 'white',
    textAlign: 'center',
    lineHeight: 20,
  },
  switchContainer: {
    width: 68,
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  switchText: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
  },
  stickyHeader: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  gradient: {
    position: 'absolute',
  },
  footer: {
    marginTop: 8,
  },
});

function Gradient() {
  const isSmallScreen = useMediaQuery({ maxWidth: 720 });

  const size = useMemo(() => {
    if (isSmallScreen) { return { height: 75, width: 100 }; }
    return { height: 75, width: 125 };
  }, [isSmallScreen]);

  return (
    <Svg {...size} xmlns="http://www.w3.org/2000/svg" style={styles.gradient}>
      <Defs>
        <LinearGradient id="stickyHeaderGradient" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="5%" stopColor="black" />
          <Stop offset="95%" stopColor="transparent" />
        </LinearGradient>
      </Defs>
      <Rect fill="url(#stickyHeaderGradient)" x="0" y="0" width="100%" height="100%" />
    </Svg>
  );
}

export default function Sights({
  buttonOfflineProps,
  contentContainerStyle,
  current,
  dispatch,
  footer,
  ids,
  navigationOptions,
  takenPictures,
  thumbnailStyle,
  tour,
}) {
  const { height: windowHeight } = useWindowDimensions();

  const handlePress = useCallback((id) => {
    if (navigationOptions.allowNavigate) {
      dispatch({ type: Actions.sights.SET_CURRENT_SIGHT, payload: { id } });
    }
  }, [dispatch, navigationOptions.allowNavigate]);

  return (
    <ScrollView
      endFillColor="#000"
      showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      contentContainerStyle={[{
        ...Platform.select({
          native: { maxHeight: windowHeight },
          default: { maxHeight: '100vh' },
        }, contentContainerStyle),
      }]}
    >
      <View style={styles.stickyHeader}>
        <Gradient />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {`${current.index + 1} / ${ids.length} `}
          </Text>
        </View>
        {buttonOfflineProps && (
          <View style={styles.switchContainer}>
            <Switch {...buttonOfflineProps} />
            <Text style={styles.switchText}>{buttonOfflineProps.text}</Text>
          </View>
        )}
      </View>
      <View>
        {Object.values(tour).map(({ id, label, overlay }) => (
          <Thumbnail
            key={`thumbnail-${id}`}
            label={label}
            overlay={overlay}
            picture={takenPictures[id]}
            onPress={() => handlePress(id)}
            onClick={() => handlePress(id)}
            style={thumbnailStyle}
          />
        ))}
        <View style={styles.footer}>{footer}</View>
      </View>
    </ScrollView>
  );
}

Sights.propTypes = {
  buttonOfflineProps: PropTypes.objectOf(PropTypes.any),
  contentContainerStyle: PropTypes.objectOf(PropTypes.any),
  current: PropTypes.shape({ index: PropTypes.number }).isRequired,
  dispatch: PropTypes.func.isRequired,
  footer: PropTypes.element,
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  navigationOptions: PropTypes.shape({
    allowNavigate: PropTypes.bool,
    allowRetake: PropTypes.bool,
    allowSkip: PropTypes.bool,
    retakeMaxTry: PropTypes.number,
    retakeMinTry: PropTypes.number,
  }).isRequired,
  takenPictures: PropTypes.objectOf(PropTypes.object),
  thumbnailStyle: PropTypes.objectOf(PropTypes.any),
  tour: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    overlay: PropTypes.string,
  })).isRequired,
};

Sights.defaultProps = {
  buttonOfflineProps: null,
  contentContainerStyle: {},
  footer: null,
  takenPictures: {},
  thumbnailStyle: {},
};