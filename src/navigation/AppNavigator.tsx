/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackNavigationData from './stackNavigationData';
import DrawerContent from '../components/Drawer';
const { Navigator, Screen } = createDrawerNavigator();

const NavigatorView = () => {
  return (
    <Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      {StackNavigationData.map((item, idx) => (
        <Screen
          key={`stack_item-${idx + 1}`}
          name={item.name}
          component={item.component}
        />
      ))}
    </Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    width: 50,
    height: 60,
    // flexDirection: 'row',
    // alignItems: 'flex-end',
  },
});

export default NavigatorView;
