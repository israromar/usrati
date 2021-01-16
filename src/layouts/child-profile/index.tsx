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

import i18n from '../../translations';
import ToggleButton, {
  IToggleButton,
} from '../../components/toggle-button.component';
import { ImageOverlay } from '../../components';
import { AppRoute } from '../../navigation/app-routes';

const SignoutIcon = (props: any) => <Icon {...props} name="log-out-outline" />;

interface IHome {
  onThemeToggle: () => void;
  onSignOutPress: () => void;
  handleLocaleChange: () => void;
  selectedIndex: number;
  languages: [];
}

export const ChildProfile = ({ onBackPress }) => {
  const hanldeBackPress = () => {
    // rest.goBack();
    onBackPress(AppRoute.DASHBOARD);
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
    <Layout style={styles.container}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../assets/images/vector.png')}
      >
        <View style={styles.headerElements}>
          <TouchableOpacity onPress={hanldeBackPress}>
            <Image source={require('../../assets/images/backarrow.png')} />
          </TouchableOpacity>
          <Layout
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              backgroundColor: 'transparent',
              marginTop: 60,
              marginLeft: 15,
              width: 300,
            }}
          >
            <Avatar
              source={require('./assets/child-avatar.png')}
              style={styles.avatar}
            />
            <Text category="h3" status="control">
              Natasha
            </Text>
          </Layout>
        </View>
      </ImageOverlay>
      <Layout style={styles.childDataWrap}>
        <Layout style={styles.childs} level="1">
          <Text category="h3">Chart</Text>
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
      </Layout>

      <Layout style={styles.kpisWrap}>
        <Text category="h3" style={{ alignSelf: 'flex-start' }}>
          Kpi's
        </Text>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Layout style={[styles.childsInnerWrap]}>
              <Card
                onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                style={styles.card}
              // header={Header}
              >
                <Text>Task 1</Text>
              </Card>
              <Card
                onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                style={styles.card}
              // header={Header}
              >
                <Text>Task 2</Text>
              </Card>
              <Card
                onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                style={styles.card}
              // header={Header}
              >
                <Text>Task 3</Text>
              </Card>
              <Card
                onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
                style={styles.card}
              // header={Header}
              >
                <Text>Task 4</Text>
              </Card>
            </Layout>
          </ScrollView>
        </SafeAreaView>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomWrap: {
    height: hp2dp('18%'),
    width: wp2dp('85%'),
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    alignSelf: 'center',
    marginVertical: 1,
  },
  kpisWrap: {
    height: hp2dp('40%'),
    width: wp2dp('85%'),
    display: 'flex',
    // flex: 0.3,
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignContent: 'center',
    // padding: 10,
    alignSelf: 'center',
    // marginVertical: 10,
  },
  bottomData: {
    backgroundColor: 'transparent',
    width: wp2dp('85%'),
    height: 30,
    borderRadius: 5,
    borderWidth: 0.4,
    borderColor: 'grey',

    justifyContent: 'center',
    padding: 10,
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  card: {
    // backgroundColor: 'transparent',
    borderRadius: 5,
    margin: 2,
    height: hp2dp('14%'),
    width: wp2dp('40%'),
    padding: 0,
    // alignItems: 'center',
    justifyContent: 'center',
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
    height: hp2dp('12.5%'),
    width: wp2dp('24.5%'),
    padding: 0,
  },
  childDataWrap: {
    display: 'flex',
    // flex: 1,
    marginTop: -70,
    backgroundColor: 'transparent',
    height: hp2dp('20%'),
    // alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  childs: {
    borderColor: 'grey',
    height: hp2dp('20%'),
    width: wp2dp('85%'),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    // backgroundColor: 'yellow',
    height: hp2dp('100%'),
    width: wp2dp('85%'),
    flexWrap: 'wrap',
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
  },
  stretch: {
    height: 200,
    top: -80,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    // minHeight: 220,
    height: hp2dp('30%'),
    paddingHorizontal: 28,
  },
  headerElements: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: 75,
    marginBottom: 140,
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
