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

import i18n from '../../translations';
import {
  PersonIcon,
  AddChildIcon,
  HomeIcon,
  ChildrenIcon,
  ListsIcon,
  GuardianIcon,
  TaskIcon,
  MomentsIcon,
  ForwardIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BulbIcon,
  SignOutIcon,
  FamilyIcon,
  KpiIcon,
} from './icons';
import { logout } from '../../store/actions/auth.actions';
import { AppRoute } from '../../navigation/app-routes';

const Header = () => {
  const {
    user: { userInfo },
    family: { family },
  }: any = useSelector((state) => state);
  console.log('familyfamilyfamily', family);

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

const DrawerContent = ({ navigation, state }: any) => {
  // const [selectedIndex, setSelectedIndex] = React.useState(null);
  const handlePress = (toScreen: string) => {
    navigation.navigate(toScreen);
  };

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
        title={'Home'}
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
        title={'Add Family'}
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
        title={'Add Guardian'}
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
        title={'Add Child'}
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
        title={'Metric Categories'}
        accessoryLeft={ListsIcon}
        accessoryRight={ForwardIcon}
        onPress={() => handlePress(AppRoute.MATRIC_CATEGORY)}
      />
      <DrawerItem
        title={'Kpis'}
        accessoryLeft={KpiIcon}
        accessoryRight={ForwardIcon}
        // onPress={() => handlePress(AppRoute.MATRIC_CATEGORY)}
      />
      <DrawerItem
        title={'Assign Task'}
        accessoryLeft={TaskIcon}
        accessoryRight={ForwardIcon}
        onPress={() => handlePress(AppRoute.ASSIGN_TASK)}
      />
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
