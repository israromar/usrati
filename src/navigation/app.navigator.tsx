import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackNavigationData from './stack-navigation-data';
import { DrawerContent } from '../components';

const { Navigator, Screen } = createDrawerNavigator();

export const AppNavigator = (): React.ReactElement => {
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
