import React, { useEffect } from 'react';
import { I18nManager, StyleSheet } from 'react-native';
import {
  Avatar,
  Layout,
  Text,
  Divider,
  Drawer,
  DrawerGroup,
  DrawerItem,
  Button,
} from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { changeLanguage } from '../../store/actions/language.actions';
import languageReducer from '../../store/reducers/language.reducer';
import i18n from '../../translations';
import {
  PersonIcon,
  HomeIcon,
  ChildrenIcon,
  ListsIcon,
  GuardianIcon,
  TaskIcon,
  MomentsIcon,
  ForwardIcon,
  BulbIcon,
  SignOutIcon,
  KpiIcon,
  LangaugeIcon,
  TickIcon,
  CircleIcon,
} from './icons';
import { logout } from '../../store/actions/auth.actions';
import { AppRoute } from '../../navigation/app-routes';
import { languageConstants } from '../../constants';
import { toggleTheme } from '../../store/actions/theme.actions';

const Header = () => {
  const {
    user: { userInfo },
    family: { family },
  }: any = useSelector((state) => state);
  return (
    <Layout style={styles.headerWrap}>
      <Layout>
        <Avatar
          size="giant"
          source={
            family?.families[0]?.photo
              ? { uri: family.families[0].photo }
              : require('../../assets/images/usericon.png')
          }
        />
        <Layout style={styles.nameWrap}>
          <Layout>
            <Text style={styles.text}>
              {family?.families[0]?.name
                ? family?.families[0]?.name
                : userInfo?.username}
            </Text>
          </Layout>
        </Layout>
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

const DrawerContent = ({ navigation }: any) => {
  const {
    language: { activeLanguage },
  }: any = useSelector((state) => state);
  const dispatch = useDispatch();

  const handlePress = (toScreen: string) => {
    navigation.navigate(toScreen);
  };
  const handleLanguageChange = async (language: string) => {
    dispatch(changeLanguage({ language }));
    i18n.locale = language;
    // dispatch(toggleTheme({ theme: 'light' }));
    await AsyncStorage.setItem('activeLanguage', language);
    if (activeLanguage === 'en') {
      if (I18nManager.isRTL) {
        await I18nManager.forceRTL(true);
      }
    } else {
      if (!I18nManager.isRTL) {
        await I18nManager.forceRTL(true);
      }
    }
    // RNRestart.Restart();
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      if (activeLanguage === 'en') {
        await I18nManager.forceRTL(false);
      } else {
        await I18nManager.forceRTL(true);
      }
      // RNRestart.Restart();
    };
    bootstrapAsync();
  }, [activeLanguage]);

  return (
    <Drawer
      header={Header}
      footer={Footer}
      // selectedIndex={selectedIndex}
      // onSelect={(index) => setSelectedIndex(index)}
      appearance="noDivider"
    >
      <Divider />
      <DrawerItem
        title={i18n.t('drawer.home')}
        accessoryLeft={HomeIcon}
        accessoryRight={ForwardIcon}
        onPress={() => handlePress(AppRoute.DASHBOARD)}
      />
      <DrawerItem
        title={i18n.t('drawer.profile')}
        accessoryLeft={PersonIcon}
        accessoryRight={ForwardIcon}
        onPress={() => handlePress(AppRoute.PARENT_PROFILE)}
      />
      <DrawerItem
        title={i18n.t('drawer.addFamily')}
        accessoryLeft={ChildrenIcon}
        accessoryRight={ForwardIcon}
        onPress={() =>
          navigation.navigate(AppRoute.FAMILY_SETUP, {
            currentPosition: 0,
            isEdit: false,
            isAddNew: true,
            familyData: {},
            childData: {},
            guardianData: {},
          })
        }
      />
      <DrawerItem
        title={i18n.t('drawer.addGuardian')}
        accessoryLeft={GuardianIcon}
        accessoryRight={ForwardIcon}
        onPress={() =>
          navigation.navigate(AppRoute.FAMILY_SETUP, {
            currentPosition: 1,
            isEdit: false,
            isAddNew: true,
            familyData: {},
            childData: {},
            guardianData: {},
          })
        }
      />
      <DrawerItem
        title={i18n.t('drawer.addChild')}
        accessoryLeft={ChildrenIcon}
        accessoryRight={ForwardIcon}
        onPress={() =>
          navigation.navigate(AppRoute.FAMILY_SETUP, {
            currentPosition: 2,
            isEdit: false,
            isAddNew: true,
            familyData: {},
            childData: {},
            guardianData: {},
          })
        }
      />
      <DrawerItem
        title={i18n.t('drawer.metricCategories')}
        accessoryLeft={ListsIcon}
        accessoryRight={ForwardIcon}
        onPress={() => handlePress(AppRoute.MATRIC_CATEGORY)}
      />
      <DrawerItem
        title={i18n.t('drawer.kpis')}
        accessoryLeft={KpiIcon}
        accessoryRight={ForwardIcon}
        // onPress={() => handlePress(AppRoute.MATRIC_CATEGORY)}
      />
      <DrawerItem
        title={i18n.t('drawer.assignTask')}
        accessoryLeft={TaskIcon}
        accessoryRight={ForwardIcon}
        onPress={() => handlePress(AppRoute.ASSIGN_TASK)}
      />
      <DrawerGroup
        title={i18n.t('drawer.language')}
        accessoryLeft={LangaugeIcon}
      >
        <DrawerItem
          title={i18n.t('drawer.english')}
          onPress={() => handleLanguageChange('en')}
          accessoryLeft={CircleIcon}
          accessoryRight={activeLanguage === 'en' ? TickIcon : ''}
        />
        <DrawerItem
          title={i18n.t('drawer.arabic')}
          onPress={() => handleLanguageChange('ar')}
          accessoryLeft={CircleIcon}
          accessoryRight={activeLanguage === 'ar' ? TickIcon : ''}
        />
      </DrawerGroup>
      <Divider />
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
