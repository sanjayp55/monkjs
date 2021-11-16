import React, { useCallback } from 'react';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';

import { getAllInspections, selectAllInspections } from '@monkvision/corejs';

import baseUrl from 'config/baseUrl';

export default () => {
  const dispatch = useDispatch();
  const inspections = useSelector(selectAllInspections);

  // eslint-disable-next-line no-console
  console.log(inspections);

  const getAll = useCallback(() => {
    dispatch(getAllInspections({ baseUrl }));
  }, [dispatch]);

  return (
    <View>
      <Button onPress={getAll}>Get All</Button>
    </View>
  );
};