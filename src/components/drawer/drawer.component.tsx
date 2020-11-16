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

import ToggleButton, { IToggleButton } from '../toggle-button.component';
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
  QrIcon,
} from './icons';

const Header = () => (
  <Layout style={styles.headerWrap}>
    <Layout>
      <Avatar
        size="giant"
        source={require('../../../assets/images/drawer/user.png')}
      />
      <Layout style={styles.nameWrap}>
        <Layout>
          <Text style={styles.text}>Israr</Text>
          <Text style={styles.textOne}>@Israr123</Text>
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

const Footer = () => (
  <>
    <Divider />
    <Layout
      accessoryLeft={MomentsIcon}
      accessoryRight={ForwardIcon}
      style={styles.footerWrap}
    >
      <Button appearance="ghost" status="primary" accessoryLeft={BulbIcon} />
      <Button appearance="ghost" status="primary" accessoryLeft={QrIcon} />
    </Layout>
  </>
);

const toggle = () => {
  return (
    <ToggleButton
      title={i18n.t('home.theme')}
      activeTheme={true ? i18n.t('home.light') : i18n.t('home.dark')}
      // onToggle={onThemeToggle}
      checked={true}
      label={
        false ? i18n.t('home.enableDarkMode') : i18n.t('home.disableDarkMode')
      }
    />
  );
};

const DrawerContent = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

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
        title={i18n.t('drawer.lists')}
        accessoryLeft={ListsIcon}
        accessoryRight={ForwardIcon}
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
      <DrawerItem accessoryRight={toggle} />
      <DrawerItem
        style={styles.itemOne}
        title={i18n.t('drawer.settingsAndPrivacy')}
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
