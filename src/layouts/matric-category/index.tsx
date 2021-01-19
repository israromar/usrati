/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Layout,
  Button,
  Text,
  Card,
  Avatar,
  Input,
} from '@ui-kitten/components';
// import * as Progress from 'react-native-progress';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

import { ImageOverlay } from '../../components';
import { AppRoute } from '../../navigation/app-routes';
import { KeyboardAvoidingView } from '../auth/welcome/extra/3rd-party';
import { colors } from '../../styles';
import { AddIcon } from './extra/icons';

interface IMatricCategory {
  onBackPress: (v: string) => void;
}

const metrics = [
  {
    title: 'Health',
    description: 'Exercise for 20 minutes',
    weightage: '60%',
  },
  {
    title: 'Study',
    description: 'Study for 6 hours',
    weightage: '20%',
  },
  {
    title: 'Work',
    description: 'Work for 4 hours',
    weightage: '20%',
  },
  {
    title: 'Work',
    description: 'Work for 4 hours',
    weightage: '20%',
  },
  {
    title: 'Work',
    description: 'Work for 4 hours',
    weightage: '20%',
  },
  {
    title: 'Work',
    description: 'Work for 4 hours',
    weightage: '20%',
  },
  {
    title: 'Work',
    description: 'Work for 4 hours',
    weightage: '20%',
  },
  {
    title: 'Work',
    description: 'Work for 4 hours',
    weightage: '20%',
  },
];

export const MatricCategory = ({ onBackPress }: IMatricCategory) => {
  const [isAddMetric, setIsAddMetric] = useState(false);
  const [metricTitle, setMetricTitle] = useState('');
  const [metricTitleError, setMetricTitleError] = useState(false);
  const [metricTitleErrorMsg, setMetricTitleErrorMsg] = useState('');

  const [metricDescription, setMetricDescription] = useState('');
  const [metricDescriptionError, setMetricDescriptionError] = useState(false);
  const [metricDescriptionErrorMsg, setMetricDescriptionErrorMsg] = useState(
    '',
  );

  const [metricWeightage, setMetricWeightage] = useState('');
  const [metricWeightageError, setMetricWeightageError] = useState(false);
  const [metricWeightageErrorMsg, setMetricWeightageErrorMsg] = useState('');

  const handleAddMetricInput = (
    inputField: (v: React.SetStateAction<string>) => void,
    inputFieldError: (v: boolean) => void,
    value: React.SetStateAction<string>,
  ) => {
    inputField(value);
    inputFieldError(false);
  };

  const handleBackPress = () => {
    isAddMetric === true
      ? setIsAddMetric(false)
      : onBackPress(AppRoute.DASHBOARD);
  };

  const handleAddMatricCategory = () => {
    console.log('handleAddMatricCategory');
  };

  return (
    <Layout style={{ flex: 1, backgroundColor: '#fff' }}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../assets/images/vector.png')}
      >
        <Layout
          style={{
            backgroundColor: 'transparent',
            alignSelf: 'flex-start',
            marginLeft: -20,
            marginTop: 10,
          }}
        >
          <TouchableOpacity onPress={handleBackPress}>
            <Image source={require('../../assets/images/backarrow.png')} />
          </TouchableOpacity>
        </Layout>

        <Layout
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            minWidth: wp2dp('90%'),
            alignSelf: 'center',
            justifyContent: 'space-around',
          }}
        >
          {isAddMetric && (
            <Text
              style={{
                flex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
              category="h2"
              status="control"
            >
              Matric Category
            </Text>
          )}
          {!isAddMetric && (
            <>
              <Layout style={{ backgroundColor: 'transparent' }}>
                <Text
                  style={{ fontSize: 80, fontWeight: 'bold' }}
                  category="h1"
                  status="control"
                >
                  Matric
                </Text>
                <Text category="h2" status="control">
                  Category
                </Text>
              </Layout>
              <Layout
                style={{
                  backgroundColor: 'transparent',
                  marginLeft: 'auto',
                  marginTop: 15,
                }}
              >
                <Image
                  source={require('../../assets/images/matric-category-frame.png')}
                />
              </Layout>
            </>
          )}
        </Layout>
      </ImageOverlay>
      <SafeAreaView
        style={[
          {
            flex: 1,
            alignSelf: 'center',
          },
        ]}
      >
        {!isAddMetric && (
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
            <Layout style={styles.metricsWrap}>
              {metrics.map((matric) => {
                return (
                  <Layout style={styles.metrics} level="1">
                    <Layout
                      style={{
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text category="h4" status="control">
                        {matric.title}
                      </Text>
                      <Text category="h5" status="control">
                        {matric.weightage}
                      </Text>
                    </Layout>
                    <Text
                      style={{ backgroundColor: 'transparent', padding: 10 }}
                      category="h6"
                      status="control"
                    >
                      {matric.description}
                    </Text>
                  </Layout>
                );
              })}
            </Layout>
          </ScrollView>
        )}

        {isAddMetric && (
          <Layout style={styles.formContainer}>
            <Input
              style={styles.inputField}
              value={metricTitle.trim()}
              caption={metricTitleError ? metricTitleErrorMsg : ''}
              status={metricTitleError ? 'danger' : 'basic'}
              placeholder="Title"
              onChangeText={(nextValue) =>
                handleAddMetricInput(
                  setMetricTitle,
                  setMetricTitleError,
                  nextValue,
                )
              }
            />
            <Input
              style={styles.inputField}
              value={metricWeightage}
              caption={metricWeightageError ? metricWeightageErrorMsg : ''}
              status={metricWeightageError ? 'danger' : 'basic'}
              placeholder="Percentage"
              onChangeText={(nextValue) =>
                handleAddMetricInput(
                  setMetricWeightage,
                  setMetricWeightageError,
                  nextValue,
                )
              }
            />

            <Input
              style={styles.inputField}
              value={metricDescription.trim()}
              caption={metricDescriptionError ? metricDescriptionErrorMsg : ''}
              status={metricDescriptionError ? 'danger' : 'basic'}
              placeholder="Description"
              multiline={true}
              textStyle={{ minHeight: 64 }}
              {...metricDescription}
              onChangeText={(nextValue) =>
                handleAddMetricInput(
                  setMetricDescription,
                  setMetricDescriptionError,
                  nextValue,
                )
              }
            />

            <Button
              onPress={() => handleAddMatricCategory()}
              style={styles.primarySubmitButton}
              status="control"
              size="giant"
              appearance="ghost"
            // accessoryLeft={isAddFamily && LoadingIndicator}
            >
              Add
            </Button>
          </Layout>
        )}
      </SafeAreaView>
      {!isAddMetric && (
        <Button
          onPress={() => setIsAddMetric(!isAddMetric)}
          style={{
            backgroundColor: '#4ebd9c',
            borderRadius: 50,
            borderWidth: 0,
            position: 'absolute',
            bottom: 20,
            right: 30,
            width: 80,
            height: 80,

            shadowColor: '#000',
            shadowOffset: {
              width: 2,
              height: 20,
            },
            shadowOpacity: 2.23,
            shadowRadius: 4.62,
            elevation: 10,
          }}
          status="control"
          size="giant"
          appearance="ghost"
          accessoryLeft={AddIcon}
        />
      )}
    </Layout>
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
    marginVertical: 2,
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  formContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 28,
    // minHeight: 450,
    // height: hp2dp('70%')
  },
  primarySubmitButton: {
    width: wp2dp('85%'),
    top: 20,
    borderRadius: 5,
    backgroundColor: '#6F99EB',
    fontFamily: 'Verdana',
    alignSelf: 'center',
  },
  inputField: { marginTop: 10, width: wp2dp('85%') },
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
  metricsWrap: {
    marginTop: hp2dp('2%'),
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  metrics: {
    padding: 10,
    margin: 5,
    borderColor: 'grey',
    height: hp2dp('14%'),
    width: wp2dp('85%'),
    borderRadius: 10,
    backgroundColor: colors.primaryBlue,
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
