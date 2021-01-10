import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import tabNavigationData from './tab-navigation-data';
import { SettingsScreen } from '../containers';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation: { navigate }, state }: any) => {
  return (
    <BottomNavigation
      style={styles.bottomTabs}
      selectedIndex={state.index}
      onSelect={(index) => navigate(state.routeNames[index])}
      appearance="noIndicator"
    >
      {tabNavigationData?.map(({ name, icon }: any) => {
        return <BottomNavigationTab key={name} /*title={name}*/ icon={icon} />;
      })}
    </BottomNavigation>
  );
};

const TabNavigator = () => {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      {tabNavigationData?.map(({ name, component }) => (
        <Screen key={name} name={name} component={component} />
      ))}
      <Screen name={'Settings'} component={SettingsScreen} />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabs: {
    borderWidth: 0.25,
    borderColor: '#808080',
  },
});

export default TabNavigator;
