/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {
  Layout,
  Button,
  Text,
  Avatar,
  Input,
  Spinner,
} from '@ui-kitten/components';
// import * as Progress from 'react-native-progress';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import { launchImageLibrary as READ_EXTERNAL_STORAGE } from 'react-native-image-picker';

import { Loading, ImageOverlay } from '../../components';
import { AppRoute } from '../../navigation/app-routes';
import { KeyboardAvoidingView } from '../auth/welcome/extra/3rd-party';
import { colors } from '../../styles';
import { AddIcon } from './extra/icons';
import constraints from '../../utils/constraints';
import validate from 'validate.js';

interface IMatricCategory {
  currentState: {};
  onBackPress: (v: string) => void;
  onAddMatric: (v: object) => void;
  getAllMatrics: () => void;
}

export const MatricCategory = ({
  currentState,
  onBackPress,
  onAddMatric,
  getAllMatrics,
}: IMatricCategory) => {
  const [isLoadingMatrics, setIsLoadingMatrics] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddMatric, setIsAddMatric] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [matricTitle, setMatricTitle] = useState('');
  const [matricTitleError, setMatricTitleError] = useState(false);
  const [matricTitleErrorMsg, setMatricTitleErrorMsg] = useState('');

  const [matricDescription, setMatricDescription] = useState('');
  const [matricDescriptionError, setMatricDescriptionError] = useState(false);
  const [matricDescriptionErrorMsg, setMatricDescriptionErrorMsg] = useState(
    '',
  );

  const [matricWeightage, setMatricWeightage] = useState(0);
  const [matricWeightageError, setMatricWeightageError] = useState(false);
  const [matricWeightageErrorMsg, setMatricWeightageErrorMsg] = useState('');

  const [matricPhoto, setMatricPhoto] = useState('');

  const [allMatrics, setAllMatrics] = useState([]);

  useEffect(() => {
    getAllMatrics();
    return () => {
      // cleanup;
    };
  }, []);

  useEffect(() => {
    if (
      !currentState.matrics.isAddingMatric &&
      currentState.matrics.isAddMatricSuccess &&
      isLoading
    ) {
      setIsLoading(false);
      Alert.alert('Matric category successfully added');
      setIsAddMatric(false);
      setMatricPhoto('');
      setMatricTitle('');
      setMatricWeightage('');
      setMatricDescription('');
    }
    if (
      !currentState.matrics.isAddingMatric &&
      currentState.matrics.isAddMatricFail &&
      isLoading
    ) {
      setIsLoading(false);
      Alert.alert('Something went wrong, try again!');
    }

    console.log('1123123123123', currentState);

    setAllMatrics(currentState?.matrics?.matrics);
    setIsLoadingMatrics(currentState?.matrics?.isGetMatricsLoading);
  }, [currentState, isLoading]);

  const handleAddMetricInput = (
    inputField: (v: React.SetStateAction<string>) => void,
    inputFieldError: (v: boolean) => void,
    value: React.SetStateAction<string>,
  ) => {
    inputField(value);
    inputFieldError(false);
  };

  const handleBackPress = () => {
    setIsSubscribe(false);
    isAddMatric === true
      ? setIsAddMatric(false)
      : onBackPress(AppRoute.DASHBOARD);
  };

  const handleAddMatricCategory = () => {
    if (currentState?.matrics?.matrics?.length >= 3) {
      setIsSubscribe(true);
      return;
    }

    const validationResult = validate(
      { matricTitle, matricWeightage, matricDescription },
      constraints,
    );

    if (validationResult?.matricTitle) {
      setMatricTitleError(true);
      setMatricTitleErrorMsg(validationResult?.matricTitle[0]);
    }
    if (validationResult?.matricWeightage) {
      setMatricWeightageError(true);
      setMatricWeightageErrorMsg(validationResult?.matricWeightage[0]);
    }
    if (validationResult?.matricDescription) {
      setMatricDescriptionError(true);
      setMatricDescriptionErrorMsg(validationResult?.matricDescription[0]);
    } else if (
      !matricTitleError &&
      !matricWeightageError &&
      !matricDescriptionError
    ) {
      onAddMatric({
        matricPhoto,
        matricTitle,
        matricWeightage,
        matricDescription,
      });
      setIsLoading(true);
    }
  };

  const renderLoading = () => {
    if (isLoadingMatrics) {
      return <Loading />;
    }
  };

  const renderFileUri = () => {
    if (matricPhoto) {
      return (
        <Avatar source={{ uri: matricPhoto?.uri }} style={styles.avatar} />
      );
    } else {
      return (
        <Avatar
          source={require('./assets/guardian-avatar.png')}
          style={styles.avatar}
        />
      );
    }
  };

  const requestCameraPermission = async (permissionFor: string) => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS[permissionFor],
      );
      return permission;
    } catch (err) {
      console.warn(err);
      return err;
    }
  };

  const chooseFile = async (
    mediaType: string,
    permissionFor: string,
    mediaTypeInvoker: any,
  ) => {
    let options = {
      mediaType,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    try {
      const permission = await requestCameraPermission(permissionFor);
      if (permission === 'never_ask_again') {
        Alert.alert(
          `Go to your app info and enable permission for ${permissionFor}.`,
        );
      }
      if (permission === 'granted') {
        mediaTypeInvoker(options, async (response: any) => {
          if (!response?.didCancel) {
            setMatricPhoto(response);
          }
        });
      }
    } catch (e) {
      console.log('error oc', e);
    }
  };

  const LoadingIndicator = (props: any) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" />
    </View>
  );

  const RenderSubscribtion = () => {
    if (isAddMatric && isSubscribe) {
      return (
        <Layout style={styles.subscribeWrap}>
          <Image source={require('../../assets/images/subs-frame.png')} />
          <Text
            style={{
              // flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
            category="h4"
            status="info"
          >
            To access premium features
          </Text>
          <Button
            onPress={() => handleAddMatricCategory()}
            style={styles.primarySubmitButton}
            status="control"
            size="giant"
            appearance="ghost"
            accessoryLeft={isLoading && LoadingIndicator}
          >
            Upgrade Now
          </Button>
        </Layout>
      );
    }
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
          {isAddMatric && !isSubscribe && (
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
          {!isAddMatric && !isSubscribe && (
            <>
              <Layout style={{ backgroundColor: 'transparent' }}>
                <Text
                  style={{
                    fontSize: wp2dp('18%'),
                    fontWeight: 'bold',
                  }}
                  category="h1"
                  status="control"
                >
                  Matric
                </Text>
                <Text
                  style={{ fontSize: wp2dp('8%') }}
                  category="h2"
                  onPress
                  status="control"
                >
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
        {!isAddMatric && !isSubscribe && (
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
            <Layout style={styles.metricsWrap}>
              {renderLoading()}
              {!isLoadingMatrics && allMatrics.length > 0 ? (
                allMatrics.map((matric, idx) => {
                  return (
                    <Layout key={idx + 1} style={[styles.metrics]} level="1">
                      <Layout
                        style={{
                          backgroundColor: 'transparent',
                          flexDirection: 'row',
                        }}
                      >
                        <Avatar
                          // source={{ uri: matric?.photo }}
                          source={
                            matric?.photo
                              ? { uri: matric?.photo }
                              : require('./assets/guardian-avatar.png')
                          }
                          style={{
                            height: 60,
                            width: 60,
                          }}
                        />
                        <Layout
                          style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            paddingLeft: 5,
                          }}
                        >
                          <Layout
                            style={{
                              flex: 1,
                              backgroundColor: 'transparent',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Text
                              style={{ textTransform: 'uppercase' }}
                              category="h4"
                              status="control"
                            >
                              {matric.title}
                            </Text>
                            <Text category="h5" status="control">
                              {matric.weightage}%
                            </Text>
                          </Layout>
                          <Layout
                            style={{
                              backgroundColor: 'transparent',
                            }}
                          >
                            <Text category="h6" status="control">
                              {matric.description}
                            </Text>
                          </Layout>
                        </Layout>
                      </Layout>
                    </Layout>
                  );
                })
              ) : (
                  <Text
                    style={{
                      backgroundColor: 'transparent',
                      padding: 10,
                    }}
                    category="h6"
                    status="info"
                  >
                    No Matrics found!
                  </Text>
                )}
            </Layout>
          </ScrollView>
        )}
        {RenderSubscribtion()}

        {isAddMatric && !isSubscribe && (
          <KeyboardAvoidingView>
            <Layout style={styles.formContainer}>
              <TouchableOpacity
                onPress={() => {
                  chooseFile(
                    'photo',
                    'READ_EXTERNAL_STORAGE',
                    READ_EXTERNAL_STORAGE,
                  );
                }}
              >
                {renderFileUri()}
              </TouchableOpacity>
              <Input
                style={styles.inputField}
                value={matricTitle}
                caption={matricTitleError ? matricTitleErrorMsg : ''}
                status={matricTitleError ? 'danger' : 'basic'}
                placeholder="Title"
                onChangeText={(nextValue) =>
                  handleAddMetricInput(
                    setMatricTitle,
                    setMatricTitleError,
                    nextValue,
                  )
                }
              />
              <Input
                style={styles.inputField}
                value={matricWeightage}
                keyboardType={'numeric'}
                caption={matricWeightageError ? matricWeightageErrorMsg : ''}
                status={matricWeightageError ? 'danger' : 'basic'}
                placeholder="Percentage"
                onChangeText={(nextValue) =>
                  handleAddMetricInput(
                    setMatricWeightage,
                    setMatricWeightageError,
                    nextValue,
                  )
                }
              />

              <Input
                style={styles.inputField}
                value={matricDescription.trim()}
                caption={
                  matricDescriptionError ? matricDescriptionErrorMsg : ''
                }
                status={matricDescriptionError ? 'danger' : 'basic'}
                placeholder="Description"
                multiline={true}
                textStyle={{ minHeight: 64 }}
                // {...matricDescription}
                onChangeText={(nextValue) =>
                  handleAddMetricInput(
                    setMatricDescription,
                    setMatricDescriptionError,
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
                accessoryLeft={isLoading && LoadingIndicator}
              >
                {isLoading ? '' : 'Add'}
              </Button>
            </Layout>
          </KeyboardAvoidingView>
        )}
      </SafeAreaView>
      {!isAddMatric && !isSubscribe && (
        <Button
          onPress={() => setIsAddMatric(!isAddMatric)}
          style={{
            backgroundColor: '#4ebd9c',
            borderRadius: 50,
            borderWidth: 0,
            position: 'absolute',
            bottom: 20,
            right: 30,
            width: 70,
            height: 70,

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
  subscribeWrap: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: -200,
    // minHeight: hp2dp('30%'),
    width: wp2dp('90%'),
    margin: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
    // zIndex: 10,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  Modalcontainer: {
    backgroundColor: 'white',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    minHeight: 230,
  },
  sliderIndicatorRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderIndicator: {
    backgroundColor: '#CECECE',
    height: 4,
    width: 45,
    borderRadius: 5,
  },
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
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 150,
    height: 150,
    margin: 8,
  },
  metricsWrap: {
    marginTop: hp2dp('2%'),
    alignItems: 'center',
  },
  metrics: {
    padding: 10,
    margin: 5,
    borderColor: 'grey',
    minHeight: hp2dp('14%'),
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
