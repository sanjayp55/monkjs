/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  createElement,
  Platform,
  StyleSheet, Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    maxWidth: '100%',
    borderRadius: 150,
    width: 68,
    height: 68,
    backgroundColor: '#fff',
  },
});

export default function Controls({ api, containerStyle, elements, ...passThroughProps }) {
  const { height: windowHeight } = useWindowDimensions();
  const handlePress = useCallback((onPress) => () => onPress(api), [api]);

  return (
    <View
      acccessibilityLabel="Controls"
      style={[styles.container, containerStyle, Platform.select({
        native: { maxHeight: '100vh' },
        default: { maxHeight: windowHeight },
      })]}
    >
      {elements.map(({
        children,
        component = TouchableOpacity,
        onPress,
        ...rest
      }, i) => (
        createElement(component, {
          key: `camera-control-${i}`,
          onPress: handlePress(onPress),
          style: StyleSheet.flatten([styles.button]),
          ...rest,
          ...passThroughProps,
        }, children)
      ))}
    </View>
  );
}

Controls.propTypes = {
  api: PropTypes.shape({
    goNextSight: PropTypes.func,
    startUploadAsync: PropTypes.func,
    takePictureSync: PropTypes.func,
  }),
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  elements: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.element,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
  })),
};

Controls.defaultProps = {
  api: {},
  containerStyle: null,
  elements: [],
};

Controls.CaptureButtonProps = {
  accessibilityLabel: 'Take picture',
  children: (
    <Text style={{
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      height: '100%',
      fontSize: 10,
      textTransform: 'uppercase',
    }}
    >
      Take picture
    </Text>
  ),
  style: {
    maxWidth: '100%',
    backgroundColor: '#fff',
    width: 84,
    height: 84,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 84,
    borderColor: 'white',
    borderWidth: 4,
    overflow: 'hidden',
    shadowColor: 'white',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: '4px 4px',
  },
};