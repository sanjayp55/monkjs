import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import noop from 'lodash.noop';

import { DamagedPartsView } from '@monkvision/react-native-views';

import styles from '../styles';

export default function Scene({ partsWithDamages, viewType, pressAble, onPress }) {
  return (
    <ScrollView contentContainerStyle={styles.scene}>
      <DamagedPartsView
        viewType={viewType}
        partsWithDamages={partsWithDamages}
        pressAble={pressAble}
        onPress={onPress}
      />
    </ScrollView>
  );
}

Scene.propTypes = {
  onPress: PropTypes.func,
  partsWithDamages: PropTypes.arrayOf(PropTypes.object),
  pressAble: PropTypes.bool,
  viewType: PropTypes.oneOf(['front', 'back', 'interior']).isRequired,
};

Scene.defaultProps = {
  partsWithDamages: [],
  pressAble: false,
  onPress: noop,
};