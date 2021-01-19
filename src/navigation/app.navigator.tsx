import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from '../navigation/app-routes';
import StackNavigationData from './stack-navigation-data';
import { DrawerContent } from '../components';

const { Navigator, Screen } = createDrawerNavigator();
// const { Navigator, Screen } = createStackNavigator();

export const AppNavigator = (): React.ReactElement => {
  return (
    <Navigator
      drawerContent={(props) => {
        return <DrawerContent {...props} />;
      }}
    >
      {StackNavigationData.map((item, idx) => (
        <Screen
          key={`stack_item-${idx + 1}`}
          name={item.name}
          component={item.component}
          options={{
            gestureEnabled: item.name === AppRoute.FAMILY_SETUP ? false : true,
          }}
        />
      ))}
    </Navigator>
  );
};
