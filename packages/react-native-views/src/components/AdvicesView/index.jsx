import React from 'react';
import { propTypes } from '@monkvision/react-native';
import PropTypes from 'prop-types';
import noop from 'lodash.noop';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

import { styles } from './styles';
import items from './data';
import useInterval from './hooks';

/**
 * @param hideCloseButton {boolean}
 * @param onDismiss {func}
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

export default function AdvicesView({ hideCloseButton, onDismiss, ...props }) {
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // here we convert the scroll coordinate (x) to an integer (index) based on the width
  const getIndex = (event) => {
    setCurrentIndex(Math.round(parseFloat(event.nativeEvent.contentOffset.x / 512)));
  };

  // scrollView ref gives us the ability to scroll programmatically
  const scrollViewRef = React.useRef(null);

  // trigger a swipe (to the right every 3 sec)
  const delay = currentIndex < 2 ? 3000 : null;
  useInterval(() => {
    scrollViewRef.current.scrollTo({ x: 512 * (currentIndex + 1), animated: true });
  }, delay);

  return (
    <View style={styles.root} {...props}>
      {/* close button */}
      {!hideCloseButton ? (
        <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
          <MaterialCommunityIcons name="close" size={24} color="white" />
        </TouchableOpacity>
      ) : null}

      {/* carousel */}
      <ScrollView
        pagingEnabled
        horizontal
        style={styles.carousel}
        showsHorizontalScrollIndicator={false}
        onScroll={getIndex}
        ref={scrollViewRef}
        scrollEventThrottle={16}
      >
        {items.map((item) => (
          <Item {...item} key={item.key} currentIndex={currentIndex} />
        ))}
      </ScrollView>

      {/* carousel dots */}
      <View style={styles.carouselDotsLayout}>
        {[0, 1, 2].map((item, index) => (
          <View
            style={[
              styles.carouselDot,
              {
                backgroundColor: index === currentIndex ? colors['--ifm-color-primary'] : '#C6D3F3',
              },
            ]}
            key={item}
          />
        ))}
      </View>
    </View>
  );
}

const Item = ({ src, icon, text }) => (
  <View style={styles.carouselContent}>
    <View style={{ borderRadius: 18, overflow: 'hidden' }}>
      <Image source={src} style={styles.adviceImage} />
    </View>
    {icon ? (
      <View style={styles.iconLayout}>
        <MaterialCommunityIcons name={icon} size={24} color="black" />
      </View>
    ) : null}
    {text}
  </View>
);

Item.propTypes = {
  icon: PropTypes.string,
  src: PropTypes.oneOfType([
    PropTypes.shape({
      headers: PropTypes.objectOf(PropTypes.string),
      uri: PropTypes.string,
    }),
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        headers: PropTypes.objectOf(PropTypes.string),
        height: PropTypes.number,
        uri: PropTypes.string,
        width: PropTypes.number,
      }),
    ),
  ]).isRequired,
  text: PropTypes.element.isRequired,
};

Item.defaultProps = {
  icon: '',
};

AdvicesView.propTypes = {
  hideCloseButton: PropTypes.bool,
  onDismiss: propTypes.callback,
};

AdvicesView.defaultProps = {
  hideCloseButton: false,
  onDismiss: noop,
};