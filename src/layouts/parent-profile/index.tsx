/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
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
interface IDashboard {
  currentState: {};
  onPress: (v: string) => void;
  getAllChildren: () => void;
}

export const ParentProfile = ({
  currentState,
  onPress,
  getAllChildren,
}: IDashboard) => {
  const navigation = useNavigation();
  const [allChildren, setAllChildren] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [renderBodyElements, setRenderBodyElements] = useState([]);
  const [bodyElements] = useState([
    { id: 1, text: 'Manage Family', url: '../../assets/images/usericon.png' },
    { id: 2, text: 'Manage Guardians', url: '../../assets/images/usericon.png' },
    { id: 3, text: 'Manage Children', url: '../../assets/images/usericon.png' },
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

  const handleChildPress = (child: {}) => {
    navigation.navigate(AppRoute.CHILD_PROFILE);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageOverlay style={styles.headerContainer} source={require('../../assets/images/vector.png')}>
        <Layout style={styles.backBtnWrap}>
          <TouchableOpacity onPress={handleBackPress}>
            <Image source={require('../../assets/images/backarrow.png')} />
          </TouchableOpacity>
        </Layout>
      </ImageOverlay>
      <ProfileHeader currentState={currentState} userInfo={currentState?.user?.userInfo} selectedTab={selectedTab} onPressUp={() => setSelectedTab(0)} onChildPress={handleChildPress} />
      {renderBodyElements.map((item) => {
        return <ProfileBodyCard currentState={currentState} item={item} onPressItem={handlePressItem} />;
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
