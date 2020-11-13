/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import {
  Divider,
  Drawer,
  DrawerItem,
  IndexPath,
  Icon,
} from '@ui-kitten/components';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackNavigationData from './stackNavigationData';

const { Navigator, Screen } = createDrawerNavigator();

const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

const BellIcon = (props) => <Icon {...props} name="bell-outline" />;

const ForwardIcon = (props) => <Icon {...props} name="arrow-ios-forward" />;

const Header = (props) => (
  <React.Fragment>
    <ImageBackground
      style={[props.style, styles.header]}
      source={require('../../assets/images/drawer/user.png')}
    />
    <Divider />
  </React.Fragment>
);

const DrawerContent = ({ navigation, state }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Drawer
      header={Header}
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <DrawerItem
        title="Users"
        accessoryLeft={PersonIcon}
        accessoryRight={ForwardIcon}
      />
      <DrawerItem
        title="Orders"
        accessoryLeft={BellIcon}
        accessoryRight={ForwardIcon}
      />
    </Drawer>
  );
};

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
    height: 128,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NavigatorView;
