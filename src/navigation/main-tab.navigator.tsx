import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import tabNavigationData from './tab-navigation-data';
import { SettingsStackNavigator } from './settings-stack.navigator';
import { AddParentScreen, AddChildScreen } from '../containers';
import { AppRoute } from './app-routes';
// const { Navigator, Screen } = createBottomTabNavigator();
const { Navigator, Screen } = createStackNavigator();

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
    <Navigator
      initialRouteName={AppRoute.ADD_PARENT}
      headerMode={'none'}
      // tabBar={(props) => <BottomTabBar {...props} />}
    >
      {/* {tabNavigationData?.map(({ name, component }) => (
        <Screen key={name} name={name} component={component} />
      ))} */}
      <Screen name={AppRoute.SETTINGS} component={SettingsStackNavigator} />
      <Screen name={AppRoute.ADD_PARENT} component={AddParentScreen} />
      <Screen name={AppRoute.ADD_CHILD} component={AddChildScreen} />
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
