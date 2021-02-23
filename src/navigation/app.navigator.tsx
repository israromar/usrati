import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from '../navigation/app-routes';
import {
  ParentStackNavigationData,
  ChildStackNavigationData,
} from './stack-navigation-data';
import { DrawerContent } from '../components';

const { Navigator, Screen } = createDrawerNavigator();
// const { Navigator, Screen } = createStackNavigator();
interface IAppNavigator {
  // user: { child: [{}]; parent: [{}] };
  isFamilyAdded: boolean;
}

export const AppNavigator = ({
  user,
  isFamilyAdded,
}: IAppNavigator): React.ReactElement => {
  // let isFamilyAdded = false;
  // if (families?.length > 0 || user?.familyID?.id) {
  //   isFamilyAdded = true;
  // }

  // console.log('useruseruse1231r', user);

  if (user?.parent.length > 0) {
    return (
      <Navigator
        drawerContent={(props) => {
          return <DrawerContent {...props} />;
        }}
        initialRouteName={
          isFamilyAdded === true ? AppRoute.DASHBOARD : AppRoute.FAMILY_SETUP
        }
      >
        {ParentStackNavigationData.map((item, idx) => (
          <Screen
            key={`stack_item-${idx + 1}`}
            name={item.name}
            component={item.component}
            options={{
              gestureEnabled:
                item.name === AppRoute.FAMILY_SETUP ? false : true,
            }}
          />
        ))}
      </Navigator>
    );
  }

  if (user?.child.length > 0) {
    return (
      <Navigator
        drawerContent={(props) => {
          return <DrawerContent {...props} />;
        }}
        initialRouteName={AppRoute.CHILD_DASHBOARD}
      >
        {ChildStackNavigationData.map((item, idx) => (
          <Screen
            key={`stack_item-${idx + 1}`}
            name={item.name}
            component={item.component}
            // options={{
            //   gestureEnabled:
            //     item.name === AppRoute.FAMILY_SETUP ? false : true,
            // }}
          />
        ))}
      </Navigator>
    );
  }
};
