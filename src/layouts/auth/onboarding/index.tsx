/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ImageOverlay } from '../../../components';
import { AppRoute } from '../../../navigation/app-routes';
import { fonts } from '../../../styles';

export const Onboarding = ({ onPress }: any): React.ReactElement => {
  const onButtonPress = (screen: string) => {
    onPress(screen);
  };

  return (
    <>
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../../assets/images/vector.png')}
      >
        <View style={styles.headerElements}>
          <Text style={styles.title} category="h1" status="control">
            Are You
          </Text>
          <Layout style={{ backgroundColor: 'none', top: 30 }}>
            <TouchableOpacity
              onPress={() => onButtonPress(AppRoute.AUTH_WELCOME)}
            >
              <Image
                source={require('../../../assets/images/parent-group.png')}
              />
              <Text style={styles.innerText} category="h5" status="control">
                A Parent
              </Text>
            </TouchableOpacity>
          </Layout>
          <Layout style={{ backgroundColor: 'none', top: 50 }}>
            <TouchableOpacity onPress={() => onButtonPress(AppRoute.SIGN_IN)}>
              <Image
                source={require('../../../assets/images/child-group.png')}
              />
              <Text style={styles.innerText} category="h5" status="control">
                A Child
              </Text>
            </TouchableOpacity>
          </Layout>
        </View>
      </ImageOverlay>
      <Layout>
        <Image style={styles.stretch} source={require('./assets/group.png')} />
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  stretch: {
    top: -115,
    alignSelf: 'center',
  },
  title: {
    fontFamily: fonts.primaryBold,
    fontStyle: 'normal',
    // fontWeight: 'bold',
    fontSize: 64,
    lineHeight: 78,
    // color: '#FFFFFF',
  },
  innerText: { alignSelf: 'center', fontWeight: 'bold', top: 5 },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 650,
    backgroundColor: '#fff',
  },
  headerElements: {
    top: -100,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
