/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Layout,
  Button,
  Icon,
  Text,
  LayoutElement,
  Card,
  Avatar,
} from '@ui-kitten/components';
// import * as Progress from 'react-native-progress';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

import { ImageOverlay } from '../../components';
import { AppRoute } from '../../navigation/app-routes';
import { KeyboardAvoidingView } from '../auth/welcome/extra/3rd-party';
interface IDashboard {
  onChildPress: (v: string) => void;
}

export const Dashboard = ({ onChildPress }: IDashboard) => {
  const hanldeBackPress = () => {
    // rest.goBack();
  };

  const Header = (props: any) => (
    <>
      <Avatar
        shape="square"
        source={require('./assets/child.png')}
        style={styles.avatar}
      />
      <Text category="s1" style={{ color: 'grey' }}>
        Natasha
      </Text>
    </>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../assets/images/vector.png')}
      >
        <Layout
          style={{ backgroundColor: 'none' }}
        >
          <Text category="h5" status="control">
            Parent
            </Text>
          <Text category="h1" status="control">
            Dashboard
            </Text>
        </Layout>
      </ImageOverlay>
      <Layout style={styles.childDataWrap}>
        <Layout style={styles.childs} level="1">
          <Layout
            style={{
              backgroundColor: 'transparent',
              margin: 12,
              // marginVertical: 10,
            }}
          >
            <Text category="h6" status="control" style={{ color: 'grey' }}>
              To see the progress
            </Text>
            <Text category="h4" status="control" style={{ color: 'grey', fontWeight: 'bold' }}>
              Select Child
            </Text>
          </Layout>
          <SafeAreaView
            style={[
              {
                flex: 1,
                alignSelf: 'center',
              },
            ]}
          >
            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
              <Layout style={[styles.childsInnerWrap]}>
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
                <Card
                  onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                  style={styles.card}
                  header={Header}
                />
              </Layout>
            </ScrollView>
            <Layout style={{ backgroundColor: 'transparent' }}>
              <Button
                style={styles.loadMoreButton}
                status="control"
                size="medium"
                appearance="ghost"
              // accessoryLeft={auth?.isLoading && LoadingIndicator}
              >
                Load more
              </Button>
            </Layout>
          </SafeAreaView>
        </Layout>
      </Layout>
      <Layout style={styles.bottomWrap}>
        <Layout style={styles.bottomData}>
          <Text status={'danger'}>There is some important information</Text>
        </Layout>
        <Layout style={styles.bottomData}>
          <Text status={'danger'}>There is some important information</Text>
        </Layout>
        <Layout style={styles.bottomData}>
          <Text status={'danger'}>There is some important information</Text>
        </Layout>
        <Layout style={styles.bottomData}>
          <Text status={'danger'}>There is some important information</Text>
        </Layout>
        <Layout style={styles.bottomData}>
          <Text status={'danger'}>There is some important information</Text>
        </Layout>
        <Layout style={styles.bottomData}>
          <Text status={'danger'}>There is some important information</Text>
        </Layout>
        <Layout style={styles.bottomData}>
          <Text status={'danger'}>There is some important information</Text>
        </Layout>
        <Layout style={styles.bottomData}>
          <Text status={'danger'}>There is some important information</Text>
        </Layout>
        <Layout style={styles.bottomData}>
          <Text status={'danger'}>There is some important information</Text>
        </Layout>
        <Layout style={styles.bottomData}>
          <Text status={'danger'}>There is some important information</Text>
        </Layout>
        <Layout style={styles.bottomData}>
          <Text status={'danger'}>There is some important information</Text>
        </Layout>
        <Layout style={styles.bottomData}>
          <Text status={'danger'}>There is some important information</Text>
        </Layout>
        <Layout style={styles.bottomData}>
          <Text status={'danger'}>There is some important information</Text>
        </Layout>
        <Layout style={styles.bottomData}>
          <Text status={'danger'}>There is some important information</Text>
        </Layout>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomWrap: {
    // height: hp2dp('18%'),
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    alignSelf: 'center',
    marginVertical: 12,
  },
  bottomData: {
    backgroundColor: 'transparent',
    width: wp2dp('85%'),
    height: hp2dp('4%'),
    borderRadius: 5,
    borderWidth: 0.4,
    borderColor: 'grey',
    justifyContent: 'center',
    padding: 15,
    marginVertical: 2
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  card: {
    borderRadius: 5,
    margin: 2,
    height: hp2dp('14%'),
    width: wp2dp('25.5%'),
    padding: 0,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  avatar: {
    height: hp2dp('10.5%'),
    width: wp2dp('24.5%'),
    padding: 0,
  },
  childDataWrap: {
    marginTop: -hp2dp('15%'),
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  childs: {
    borderColor: 'grey',
    height: hp2dp('65%'),
    width: wp2dp('85%'),
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  childsInnerWrap: {
    backgroundColor: 'transparent',
    height: hp2dp('100%'),
    width: wp2dp('80%'),
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  stretch: {
    height: 200,
    top: -80,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  headerContainer: {
    alignItems: 'flex-start',
    height: hp2dp('30%'),
    paddingHorizontal: 45,
    backgroundColor: 'transparent',
    padding: 10,
  },
  loadMoreButton: {
    marginVertical: 5,
    width: '50%',
    height: '10%',
    borderRadius: 5,
    backgroundColor: '#6F99EB',
    alignSelf: 'center',
    // alignContent: 'center',
    // textAlign: 'center',
  },
});
