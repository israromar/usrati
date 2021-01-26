/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Layout, Button, Text, Card, Avatar } from '@ui-kitten/components';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

import { ImageOverlay } from '../../components';
import { AppRoute } from '../../navigation/app-routes';
import { KeyboardAvoidingView } from '../auth/welcome/extra/3rd-party';
interface IDashboard {
  currentState: {};
  onChildPress: (v: string) => void;
  getAllChildren: () => void;
}

export const Dashboard = ({
  currentState,
  onChildPress,
  getAllChildren,
}: IDashboard) => {
  const [allChildren, setAllChildren] = useState([]);
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

  const Header = (child: { name: string; photoUri: string }) => {
    return (
      <>
        <Avatar
          shape="square"
          source={require('./assets/child.png')}
          style={styles.avatar}
        />
        <Text category="s1" style={{ color: 'grey' }}>
          {child.username}
        </Text>
      </>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../assets/images/vector.png')}
      >
        <Layout style={{ backgroundColor: 'none' }}>
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
          {allChildren.length > 0 && (
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
              <Text
                category="h4"
                status="control"
                style={{ color: 'grey', fontWeight: 'bold' }}
              >
                Select Child
              </Text>
            </Layout>
          )}
          <SafeAreaView
            style={[
              {
                flex: 1,
                alignSelf: 'center',
              },
            ]}
          >
            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
            >
              <Layout style={[styles.childsInnerWrap]}>
                {allChildren.length > 0 ? (
                  allChildren?.map((child, idx) => {
                    return (
                      <Card
                        key={idx + 1}
                        onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                        style={styles.card}
                        header={() => Header(child)}
                      />
                    );
                  })
                ) : (
                    <Layout
                      style={{
                        flex: 1,
                        height: hp2dp('35%'),
                        color: 'grey',
                        fontWeight: 'bold',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        category="h4"
                        status="info"
                        style={{
                          color: 'grey',
                          fontWeight: 'bold',
                        }}
                      >
                        No children data available!
                    </Text>
                      <Button
                        onPress={() => onChildPress(AppRoute.FAMILY_SETUP)}
                        style={styles.loadMoreButton}
                        status="control"
                        size="medium"
                        appearance="ghost"
                      >
                        Add Child
                    </Button>
                    </Layout>
                  )}
              </Layout>
            </ScrollView>
            {allChildren.length > 9 && (
              <Layout style={{ backgroundColor: 'transparent' }}>
                <Button
                  style={styles.loadMoreButton}
                  status="control"
                  size="medium"
                  appearance="ghost"
                >
                  Load more
                </Button>
              </Layout>
            )}
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
    marginVertical: 2,
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
    height: hp2dp('67%'),
  },
  childs: {
    borderColor: 'grey',
    minHeight: hp2dp('35%'),
    // height: 'auto',
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
    // height: hp2dp('100%'),
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
