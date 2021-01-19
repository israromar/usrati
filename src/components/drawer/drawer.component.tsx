import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar,
  Layout,
  Text,
  Divider,
  Drawer,
  DrawerItem,
  Button,
} from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import i18n from '../../translations';
import {
  PersonIcon,
  ListsIcon,
  BookmarksIcon,
  TopicsIcon,
  MomentsIcon,
  ForwardIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BulbIcon,
  SignOutIcon,
} from './icons';
import { logout } from '../../store/actions/auth.actions';
import { AppRoute } from '../../navigation/app-routes';

const Header = () => {
  const {
    user: { userInfo },
  }: any = useSelector((state) => state);
  return (
    <Layout style={styles.headerWrap}>
      <Layout>
        <Avatar
          size="giant"
          source={require('../../assets/images/drawer/user.png')}
        />
        <Layout style={styles.nameWrap}>
          <Layout>
            <Text style={styles.text}>Welcome</Text>
            <Text style={styles.textOne}>@{userInfo?.username}</Text>
          </Layout>
          <Button
            style={styles.icon}
            appearance="ghost"
            status="primary"
            accessoryLeft={ChevronDownIcon || ChevronUpIcon}
          />
        </Layout>
      </Layout>
      <Layout style={styles.innerWrap}>
        <Text style={styles.text}>
          {'14'}
          <Text style={styles.textOne}> {i18n.t('drawer.following')}</Text>
        </Text>
        <Text style={styles.text}>
          {'10'}
          <Text style={styles.textOne}> {i18n.t('drawer.followers')}</Text>
        </Text>
      </Layout>
    </Layout>
  );
};

const Footer = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Divider />
      <Layout
        accessoryLeft={MomentsIcon}
        accessoryRight={ForwardIcon}
        style={styles.footerWrap}
      >
        <Button appearance="ghost" status="primary" accessoryLeft={BulbIcon} />
        <Button
          appearance="ghost"
          status="primary"
          accessoryLeft={SignOutIcon}
          onPress={handleLogout}
        />
      </Layout>
    </>
  );
};

const DrawerContent = ({ navigation, state }: any) => {
  // const { navigate } = useNavigation();
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const handlePress = (toScreen: string) => {
    console.log('123123123123', toScreen);
    navigation.navigate(toScreen);
  };

  return (
    <Drawer
      header={Header}
      footer={Footer}
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
      appearance="noDivider"
    >
      <Divider />
      <DrawerItem
        title={i18n.t('drawer.profile')}
        accessoryLeft={PersonIcon}
        accessoryRight={ForwardIcon}
      />
      <DrawerItem
        title={'Matric Categories'}
        accessoryLeft={ListsIcon}
        accessoryRight={ForwardIcon}
        onPress={() => handlePress(AppRoute.MATRIC_CATEGORY)}
      />
      <DrawerItem
        title={i18n.t('drawer.topics')}
        accessoryLeft={TopicsIcon}
        accessoryRight={ForwardIcon}
      />
      <DrawerItem
        title={i18n.t('drawer.bookmarks')}
        accessoryLeft={BookmarksIcon}
        accessoryRight={ForwardIcon}
      />
      <DrawerItem
        title={i18n.t('drawer.moments')}
        accessoryLeft={MomentsIcon}
        accessoryRight={ForwardIcon}
      />
      <Divider />
      <DrawerItem
        style={styles.itemOne}
        title={i18n.t('drawer.settingsAndPrivacy')}
        onPress={() => navigation.navigate('Settings')}
      />
      <DrawerItem style={styles.itemTwo} title={i18n.t('drawer.helpCenter')} />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    padding: 20,
  },
  nameWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerWrap: {
    maxWidth: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  text: {
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Lato-Medium',
  },
  textOne: {
    color: 'grey',
    fontFamily: 'Lato-Medium',
  },
  itemOne: {
    top: 10,
  },
  itemTwo: {
    marginVertical: 10,
  },
  icon: { left: 22 },
});

export default DrawerContent;
