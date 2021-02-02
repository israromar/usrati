/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import { ImageOverlay } from '../../components';
import { ProfileHeader } from './components/profile-header.component';
import { ProfileBodyCard } from './components/body-elements.component';
import { KeyboardAvoidingView } from '../auth/welcome/extra/3rd-party';
import { AppRoute } from '../../navigation/app-routes';

import { UpIcon, AddIcon } from './assets/icons';

interface IDashboard {
  currentState: {};
  onPress: (v: string) => void;
  getAllChildren: () => void;
  onDeleteGuardian: (v: object) => void;
  onDeleteChild: (v: object) => void;
}

export const ParentProfile = ({
  currentState,
  onPress,
  getAllChildren,
  onDeleteChild,
  onDeleteGuardian,
}: IDashboard) => {
  const navigation = useNavigation();
  const [allChildren, setAllChildren] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [renderBodyElements, setRenderBodyElements] = useState([]);
  const [bodyElements] = useState([
    { id: 1, text: 'Manage Family', icon: 'family-restroom' },
    { id: 2, text: 'Manage Guardians', icon: 'add-moderator' },
    { id: 3, text: 'Manage Children', icon: 'child-care' },
  ]);

  useEffect(() => {
    getAllChildren();
    return () => {
      // cleanup;
    };
  }, []);

  useEffect(() => {
    if (currentState?.family) {
      setAllChildren(currentState?.family?.child?.children);
    }
  }, [currentState]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePressItem = (tab: number) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    let temp = [...bodyElements];
    temp = temp.filter((item) => item.id !== selectedTab);
    setRenderBodyElements(temp);
  }, [selectedTab]);

  const handleCardPress = (child: {}) => {
    navigation.navigate(AppRoute.CHILD_PROFILE);
  };

  const handleEditFamilyPress = (familyData: any) => {
    navigation.navigate(AppRoute.FAMILY_SETUP, { currentPosition: 0, isEdit: true, isAddNew: false, familyData });

  };
  const handleChildAction = (actionType: string, childData: object) => {
    if (actionType === 'delete') {
      onDeleteChild({ childId: childData?.id ?? 0 });
    } else {
      navigation.navigate(AppRoute.FAMILY_SETUP, { currentPosition: 2, isEdit: true, isAddNew: false, childData });
    }
  };

  const handleAddNewPress = (flag: string) => {
    console.log('handleAddNewPress:', flag);

    if (flag === 'family') {
      navigation.navigate(AppRoute.FAMILY_SETUP, { currentPosition: 0, isEdit: true, isAddNew: true, familyData: {} });
    } else if (flag === 'guardian') {
      navigation.navigate(AppRoute.FAMILY_SETUP, { currentPosition: 1, isEdit: true, isAddNew: true, guardianData: {} });
    } else {
      navigation.navigate(AppRoute.FAMILY_SETUP, { currentPosition: 2, isEdit: true, isAddNew: true, childData: {} });
    }
  };

  const handleGuardianAction = (actionType: string, guardianData: object) => {
    if (actionType === 'delete') {
      onDeleteGuardian({ parentId: guardianData?.id ?? 0 });
    } else {
      navigation.navigate(AppRoute.FAMILY_SETUP, { currentPosition: 1, isEdit: true, isAddNew: false, guardianData });
    }
  };


  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageOverlay style={styles.headerContainer} source={require('../../assets/images/vector.png')}>
        <Layout style={styles.backBtnWrap}>
          <TouchableOpacity onPress={handleBackPress}>
            <Image source={require('../../assets/images/backarrow.png')} />
          </TouchableOpacity>
        </Layout>
        <Text
          category="h5"
          status="info"
          style={{
            color: '#fff',
            fontWeight: 'bold',
            // justifyContent: 'center',
            alignItems: 'flex-end',
            alignSelf: 'center',
          }}
        >
          Manage {selectedTab === 1 ? 'Family' : selectedTab === 2 ? 'Guardians' : selectedTab === 3 ? 'Children' : 'Profile'}
        </Text>
      </ImageOverlay>
      <ProfileHeader
        currentState={currentState}
        userInfo={currentState?.user?.userInfo}
        selectedTab={selectedTab}
        onPressUp={() => setSelectedTab(0)}
        onCardPress={handleCardPress}
        onGuardianAction={handleGuardianAction}
        onChildAction={handleChildAction}
        onAddNewPress={handleAddNewPress}
        onEditFamilyPress={handleEditFamilyPress}

      />

      {renderBodyElements.map((item) => {
        return <ProfileBodyCard key={item.id} currentState={currentState} item={item} onPressItem={handlePressItem} />;
      })}
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'flex-start',
    height: hp2dp('30%'),
    paddingHorizontal: 45,
    backgroundColor: 'transparent',
    padding: 10,
  },
  backBtnWrap: {
    marginLeft: -20,
    marginTop: 20,
    backgroundColor: 'transparent',
  },
});
