/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

import { ImageOverlay } from '../../../components';
import { AppRoute } from '../../../navigation/app-routes';
import { fonts } from '../../../styles';
import i18n from '../../../translations';

export const Onboarding = ({ onPress }: any): React.ReactElement => {
  const onButtonPress = (screen: string) => {
    onPress(screen);
  };

  return (
    <Layout style={styles.container}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../../assets/images/vector.png')}
      >
        <Layout style={styles.headerElements}>
          <Text style={styles.title} category="h1" status="control">
            {i18n.t('onboarding.areYou')}
          </Text>
          <Layout style={{ backgroundColor: 'none', top: 30 }}>
            <TouchableOpacity
              onPress={() => onButtonPress(AppRoute.AUTH_WELCOME)}
            >
              <Image
                source={require('../../../assets/images/parent-group.png')}
              />
              <Text style={styles.innerText} category="h5" status="control">
                {i18n.t('onboarding.parent')}
              </Text>
            </TouchableOpacity>
          </Layout>
          <Layout style={{ backgroundColor: 'none', top: 50 }}>
            <TouchableOpacity onPress={() => onButtonPress(AppRoute.SIGN_IN)}>
              <Image
                source={require('../../../assets/images/child-group.png')}
              />
              <Text style={styles.innerText} category="h5" status="control">
                {i18n.t('onboarding.child')}
              </Text>
            </TouchableOpacity>
          </Layout>
        </Layout>
      </ImageOverlay>
      <Layout>
        <Image style={styles.stretch} source={require('./assets/group.png')} />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { display: 'flex', width: wp2dp('100%'), height: hp2dp('100%') },
  stretch: {
    marginTop: wp2dp('-30%'),
    alignSelf: 'center',
  },
  title: {
    fontFamily: fonts.primaryBold,
    fontStyle: 'normal',
    fontSize: 64,
    lineHeight: 78,
  },
  innerText: { alignSelf: 'center', fontWeight: 'bold', top: 5 },
  headerContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: wp2dp('100%'),
    height: hp2dp('80%'),
  },
  headerElements: {
    marginTop: wp2dp('-50%'),
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
