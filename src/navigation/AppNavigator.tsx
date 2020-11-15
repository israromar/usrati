/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import {
  Layout,
  Text,
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
const ListsIcon = (props) => <Icon {...props} name="list-outline" />;
const TopicsIcon = (props) => <Icon {...props} name="message-circle-outline" />;
const BookmarksIcon = (props) => <Icon {...props} name="bookmark-outline" />;
const MomentsIcon = (props) => <Icon {...props} name="flash-outline" />;

const ForwardIcon = (props) => <Icon {...props} name="arrow-ios-forward" />;

const Header = (props) => (
  <Layout style={{ padding: 10 }}>

    <Layout style={{ padding: 0 }}>
      <ImageBackground
        style={[props.style, styles.header]}
        source={require('../../assets/images/drawer/user.png')}
      />
      <Divider />

      <Text>Israr</Text>
      <Text>@Israr123</Text>
    </Layout>

    <Layout style={{ backgroundColor: 'red', width: 200, flexDirection: 'row', justifyContent: 'space-around' }} >
      <Text>{'14'} Following</Text>
      <Text>{'10'} Followers</Text>
    </Layout>
  </Layout>
);

const Footer = (props) => (
  <Layout
    accessoryLeft={MomentsIcon}
    accessoryRight={ForwardIcon}
  // style={{
  //   backgroundColor: 'red',
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   alignItems: 'space-between',
  // }}
  >
    <Text>Left Icon</Text>
    <Text>Right Icon</Text>
  </Layout>
)

const DrawerContent = ({ navigation, state }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Drawer
      header={Header}
      footer={Footer}
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <DrawerItem
        title="Profile"
        accessoryLeft={PersonIcon}
        accessoryRight={ForwardIcon}
      />
      <DrawerItem
        title="Lists"
        accessoryLeft={ListsIcon}
        accessoryRight={ForwardIcon}
      />
      <DrawerItem
        title="Topics"
        accessoryLeft={TopicsIcon}
        accessoryRight={ForwardIcon}
      />
      <DrawerItem
        title="Bookmarks"
        accessoryLeft={BookmarksIcon}
        accessoryRight={ForwardIcon}
      />
      <DrawerItem
        title="Moments"
        accessoryLeft={MomentsIcon}
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
    width: 50,
    height: 60,
    // flexDirection: 'row',
    // alignItems: 'flex-end',
  },
});

export default NavigatorView;
