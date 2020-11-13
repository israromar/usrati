import React from 'react';
import {
  Icon,
  Layout,
  MenuItem,
  View,
  Text,
  Avatar,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const BackIcon = (props) => <Icon {...props} name="menu" />;

const EditIcon = (props) => <Icon {...props} name="edit" />;

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props) => <Icon {...props} name="info" />;

const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

export const Header = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon} />
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
      >
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderBackAction = () => (
    <TopNavigationAction
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      icon={BackIcon}
    />
  );

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      <Avatar
        style={styles.logo}
        source={require('../../../assets/images/avatar.png')}
      />
      <Text {...props}>Eva Application</Text>
    </View>
  );
  return (
    <Layout style={styles.container} level="1">
      <TopNavigation
        alignment="center"
        title={'Eva'}
        subtitle="Subtitle"
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 45,
    // minHeight: 70,
    // backgroundColor: 'red',
  },
  titleContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  logo: {
    // marginHorizontal: 16,
  },
});
