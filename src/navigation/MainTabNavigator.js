import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import tabNavigationData from './tabNavigationData';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      appearance="noIndicator"
    >
      {tabNavigationData.map(({ name, icon }) => {
        return <BottomNavigationTab key={name} title={name} icon={icon} />;
      })}
    </BottomNavigation>
  );
};

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    {tabNavigationData.map(({ name, component }) => (
      <Screen key={name} name={name} component={component} />
    ))}
  </Navigator>
);

export default TabNavigator;
