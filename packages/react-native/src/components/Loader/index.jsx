import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

import Animated, {
  cancelAnimation,
  Easing,
  withRepeat,
  withTiming,
  useSharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const NativeInnerCircle = ({ animated }) => {
  const radius = useSharedValue(10);

  const animatedProps = useAnimatedProps(() => {
    // draw a circle
    const path = `
    M 50, 50
    m -${radius.value}, 0
    a ${radius.value},${radius.value} 0 1,0 ${radius.value * 2},0
    a ${radius.value},${radius.value} 0 1,0 ${-radius.value * 2},0
    `;
    return {
      d: path,
    };
  });

  useEffect(() => {
    if (animated) {
      radius.value = withRepeat(withTiming(30, {
        duration: 700,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }), -1, true);
    } else {
      cancelAnimation(radius);
      radius.value = 10;
    }
  }, [animated, radius]);

  return (
    <AnimatedPath
      animatedProps={animatedProps}
      fill="black"
    />
  );
};

NativeInnerCircle.propTypes = {
  animated: PropTypes.bool,
};

NativeInnerCircle.defaultProps = {
  animated: false,
};

const DefaultInnerCircle = ({ animated }) => (
  <Circle
    fill="#000"
    cx="0"
    cy="0"
    r="10"
    transform="translate(50 50)"
  >
    <animateTransform
      attributeName="transform"
      type="scale"
      additive="sum"
      begin="0s"
      dur="1.5s"
      repeatCount="indefinite"
      calcMode="spline"
      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
      values={`1; ${animated ? 3 : 1}; 1`}
    />
  </Circle>
);

DefaultInnerCircle.propTypes = {
  animated: PropTypes.bool,
};

DefaultInnerCircle.defaultProps = {
  animated: false,
};

const InnerCircle = Platform.select({
  native: () => NativeInnerCircle,
  default: () => DefaultInnerCircle,
})();

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translate: '-50%, -50%' }],
  },
});

/**
 * Display Monk's SVG logo
 * @param animated {bool}
 * @param centered {bool}
 * @param color {string}
 * @param passThroughProps {object}
 * @returns {JSX.Element}
 * @constructor
 */
function Loader({
  animated,
  centered,
  color,
  ...passThroughProps
}) {
  return (
    <Svg
      viewBox="0 0 100 100"
      style={centered ? styles.center : []}
      width={100}
      height={100}
      {...passThroughProps}
    >
      <G>
        <Circle
          stroke={color}
          fill="transparent"
          strokeWidth={12}
          cx="50"
          cy="50"
          r="38"
        />
        <InnerCircle animated={animated} />
      </G>
    </Svg>
  );
}

Loader.propTypes = {
  animated: PropTypes.bool,
  centered: PropTypes.bool,
  color: PropTypes.string,
};

Loader.defaultProps = {
  animated: true,
  centered: false,
  color: '#274b9f',
};

export default Loader;