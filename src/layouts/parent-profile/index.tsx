/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { heightPercentageToDP as hp2dp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import { ImageOverlay, BodyCard } from '../../components';
import { ProfileHeader } from './components/profile-header.component';
import { KeyboardAvoidingView } from '../auth/welcome/extra/3rd-party';
import { AppRoute } from '../../navigation/app-routes';
import i18n from '../../translations';

interface IDashboard {
  currentState: { user: { userInfo: {}},family:{child:{children:[]}}};
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
  const [renderBodyElements, setRenderBodyElements] = useState<{}>([]);
  const [bodyElements] = useState([
    { id: 1, text: 'manageFamily', icon: 'family-restroom' },
    { id: 2, text: 'manageGuardians', icon: 'add-moderator' },
    { id: 3, text: 'manageChildren', icon: 'child-care' },
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
  }, [bodyElements, selectedTab]);

  const handleCardPress = () => {
    navigation.navigate(AppRoute.CHILD_PROFILE);
  };

  const handleEditFamilyPress = (familyData: any) => {
    navigation.navigate(AppRoute.FAMILY_SETUP, { currentPosition: 0, isEdit: true, isAddNew: false, familyData });
  };

  const handleGuardianAction = (actionType: string, guardianData: {id:number}) => {
    if (actionType === 'delete') {
      onDeleteGuardian({ parentId: guardianData?.id ?? 0 });
    } else {
      navigation.navigate(AppRoute.FAMILY_SETUP, { currentPosition: 1, isEdit: true, isAddNew: false, guardianData });
    }
  };

  const handleChildAction = (actionType: string, childData: {id:number}) => {
    if (actionType === 'delete') {
      onDeleteChild({ childId: childData?.id ?? 0 });
    } else {
      navigation.navigate(AppRoute.FAMILY_SETUP, { currentPosition: 2, isEdit: true, isAddNew: false, childData });
    }
  };

  const handleAddNewPress = (flag: string) => {
    if (flag === 'family') {
      navigation.navigate(AppRoute.FAMILY_SETUP, { currentPosition: 0, isEdit: false, isAddNew: true, familyData: {} });
    } else if (flag === 'guardian') {
      navigation.navigate(AppRoute.FAMILY_SETUP, { currentPosition: 1, isEdit: false, isAddNew: true, guardianData: {} });
    } else {
      navigation.navigate(AppRoute.FAMILY_SETUP, { currentPosition: 2, isEdit: false, isAddNew: true, childData: {} });
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
          style={styles.headerText}
        >
           {i18n.t('parentProfile.manage')} {selectedTab === 1 ? i18n.t('parentProfile.family') : selectedTab === 2 ? i18n.t('parentProfile.guardians') : selectedTab === 3 ? i18n.t('parentProfile.children') : i18n.t('parentProfile.profile')}
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

      {renderBodyElements.map((item:any) => {
        return <BodyCard key={item.id} currentState={currentState} item={item} onPressItem={handlePressItem} />;
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
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    // justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  backBtnWrap: {
    marginLeft: -20,
    marginTop: 20,
    backgroundColor: 'transparent',
  },
});
