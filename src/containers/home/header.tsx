import React from 'react';
import { ImageProps } from 'react-native';
import {
  Icon,
  Layout,
  MenuItem,
  Text,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const BackIcon = (props: ImageProps) => <Icon {...props} name="menu" />;

const EditIcon = (props: ImageProps) => <Icon {...props} name="edit" />;

const MenuIcon = (props: ImageProps) => (
  <Icon {...props} name="more-vertical" />
);

const InfoIcon = (props: ImageProps) => <Icon {...props} name="info" />;

const LogoutIcon = (props: ImageProps) => <Icon {...props} name="log-out" />;

export const Header = () => {
  const { dispatch } = useNavigation();
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
      onPress={() => dispatch(DrawerActions.openDrawer())}
      icon={BackIcon}
    />
  );

  const renderTitle = () => (
    <Layout style={styles.titleContainer}>
      <Text>Eva Application</Text>
    </Layout>
  );
  return (
    <Layout style={styles.container} level="1">
      <TopNavigation
        alignment="center"
        title={renderTitle}
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
});
