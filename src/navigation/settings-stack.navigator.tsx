import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from '../navigation/app-routes';
import { SettingsScreen } from '../containers';
import { PagesScreen } from '../containers';

const { Navigator, Screen } = createStackNavigator();

export const SettingsStackNavigator = (): React.ReactElement => {
  return (
    <Navigator initialRouteName={AppRoute.SETTINGS}>
      <Screen name={AppRoute.SETTINGS} component={SettingsScreen} />
      <Screen name={AppRoute.PAGES} component={PagesScreen} />
    </Navigator>
  );
};
