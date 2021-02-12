/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Layout, Text, Card, Avatar } from '@ui-kitten/components';
// import * as Progress from 'react-native-progress';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

import {
  BarChart,
  Grid,
  LineChart,
  ProgressCircle,
  StackedBarChart,
} from 'react-native-svg-charts';

import { ImageOverlay } from '../../components';
import { AppRoute } from '../../navigation/app-routes';
import { KeyboardAvoidingView } from '../auth/welcome/extra/3rd-party';
import { colors } from '../../styles';

interface IChildProfile {
  onBackPress: () => void;
}

const fill = 'rgb(134, 65, 244)';
const data = [
  50,
  10,
  40,
  95,
  -4,
  -24,
  null,
  85,
  undefined,
  0,
  35,
  53,
  -53,
  24,
  50,
  -20,
  -80,
];

export const ChildProfile = ({ onBackPress }: IChildProfile) => {
  const hanldeBackPress = () => {
    // rest.goBack();
    onBackPress();
    // onBackPress(AppRoute.DASHBOARD);
  };

  const data1 = [
    14,
    -1,
    100,
    -95,
    -94,
    -24,
    -8,
    85,
    -91,
    35,
    -53,
    53,
    -78,
    66,
    96,
    33,
    -26,
    -32,
    73,
    8,
  ].map((value) => ({ value }));
  const data2 = [
    24,
    28,
    93,
    77,
    -42,
    -62,
    52,
    -87,
    21,
    53,
    -78,
    -62,
    -72,
    -6,
    89,
    -70,
    -94,
    10,
    86,
    84,
  ].map((value) => ({ value }));

  const barData = [
    {
      data: data1,
      svg: {
        fill: 'rgb(134, 65, 244)',
      },
    },
    {
      data: data2,
    },
  ];

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../assets/images/vector.png')}
      >
        <TouchableOpacity onPress={hanldeBackPress}>
          <Image source={require('../../assets/images/backarrow.png')} />
        </TouchableOpacity>
        <Layout
          style={{
            flex: 1,
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: 'transparent',
            marginTop: -20,
            width: wp2dp('80%'),
          }}
        >
          <Avatar
            source={require('./assets/child.png')}
            style={styles.avatar}
            size="giant"
          />
          <Text category="h3" status="control">
            Natasha
          </Text>
        </Layout>
      </ImageOverlay>
      <Layout style={styles.childDataWrap}>
        <Layout style={styles.childProgressChart} level="1">
          {/* <Text category="h3">Chart</Text> */}
          <BarChart
            style={{ height: 200, width: wp2dp('80%') }}
            data={barData}
            yAccessor={({ item }) => item.value}
            svg={{
              fill: 'green',
            }}
            contentInset={{ top: 30, bottom: 30 }}
          >
            <Grid />
          </BarChart>
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
      </Layout>
      <Layout style={styles.kpisWrap}>
        <Text category="h3" style={{ alignSelf: 'flex-start' }}>
          Kpi's
        </Text>
        {/* <SafeAreaView> */}
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <Layout style={[styles.childsInnerWrap]}>
          <Card
            // onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
            style={styles.card}
          // header={Header}
          >
            <Text style={styles.kpiName}>Task 1</Text>
            <ProgressCircle
              style={styles.kpiProgress}
              progress={0.9}
              progressColor={'rgb(134, 65, 244)'}
              startAngle={-Math.PI * 0.99}
              endAngle={Math.PI * 0.9}
            />
          </Card>
          <Card
            // onPress={() => onChildPress(AppRoute.CHILD_PROFILE)}
            style={styles.card}
          // header={Header}
          >
            <Text style={styles.kpiName}>Task 2</Text>

            <ProgressCircle
              style={styles.kpiProgress}
              progress={0.7}
              progressColor={'rgb(134, 65, 244)'}
              startAngle={-Math.PI * 0.99}
              endAngle={Math.PI * 0.9}
            />
          </Card>
          <Card style={styles.card}>
            <Text style={styles.kpiName}>Task 3</Text>

            <ProgressCircle
              style={styles.kpiProgress}
              progress={0.3}
              progressColor={'rgb(134, 65, 244)'}
              startAngle={-Math.PI * 0.99}
              endAngle={Math.PI * 0.9}
            />
          </Card>
          <Card style={styles.card}>
            <Text style={styles.kpiName}>Task 4</Text>

            <ProgressCircle
              style={styles.kpiProgress}
              progress={0.4}
              progressColor={'rgb(134, 65, 244)'}
              startAngle={-Math.PI * 1}
              endAngle={Math.PI * 1}
            />
          </Card>
        </Layout>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 350;
const guidelineBasedHeight = 600;

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBasedHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomWrap: {
    // height: hp2dp('18%'),
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
    alignSelf: 'center',
  },
  kpiName: {
    marginLeft: -15,
    color: colors.lightGray,
  },
  kpiProgress: {
    height: hp2dp('12%'),
  },
  bottomData: {
    backgroundColor: 'transparent',
    width: wp2dp('85%'),
    height: 30,
    margin: 3,
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
    height: hp2dp('16%'),
    width: wp2dp('41%'),
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
    // height: hp2dp('15%'),
    // width: wp2dp('25%') * 0.9,
    width: moderateScale(100),
    height: verticalScale(90),
  },
  childDataWrap: {
    display: 'flex',
    flex: 1,
    marginTop: -50,
    backgroundColor: 'transparent',
    height: hp2dp('20%'),
    alignItems: 'center',
  },
  childProgressChart: {
    flex: 1,
    // borderColor: 'grey',
    // height: hp2dp('20%'),
    width: wp2dp('85%'),
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
    alignItems: 'flex-start',
    height: hp2dp('30%'),
    paddingHorizontal: 25,
    backgroundColor: 'transparent',
    padding: 10,
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
