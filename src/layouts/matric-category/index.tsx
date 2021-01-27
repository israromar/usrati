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
  ActivityIndicator,
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
import { colors } from '../../styles';
import { PlusIcon, MinusIcon } from './extra/icons';
import constraints from '../../utils/constraints';
import validate from 'validate.js';

interface IMatricCategory {
  currentState: {};
  onBackPress: (v: string) => void;
  onAddMatric: (v: object) => void;
  getAllMatrics: () => void;
  updateMatrics: (v: Array<{}>) => void;
}

export const MatricCategory = ({
  currentState,
  onBackPress,
  onAddMatric,
  getAllMatrics,
  updateMatrics,
}: IMatricCategory) => {
  const [isLoadingMatrics, setIsLoadingMatrics] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUpdatingMatrics, setIsUpdatingMatrics] = useState(false);

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

    if (
      currentState.matrics.isUpdateMatricsSuccess &&
      !currentState.matrics.isUpdateMatricsFail &&
      isUpdatingMatrics
    ) {
      Alert.alert('Updated successfully!');
      setIsUpdate(false);
      setIsUpdatingMatrics(false);
    }

    if (
      !currentState.matrics.isUpdateMatricsSuccess &&
      currentState.matrics.isUpdateMatricsFail &&
      isUpdatingMatrics
    ) {
      Alert.alert('Something went wrong, try again!');
      setIsUpdate(false);
      setIsUpdatingMatrics(false);
    }

    setAllMatrics(currentState?.matrics?.matrics);
    setIsLoadingMatrics(currentState?.matrics?.isGetMatricsLoading);
  }, [currentState, isLoading, isUpdatingMatrics]);

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

  const renderIsUpdating = () => {
    if (isUpdatingMatrics) {
      return (
        <Layout style={[styles.updatingOuterWrap]}>
          <Layout style={styles.updatingInnerWrap}>
            <ActivityIndicator size="large" color={colors.primaryBlue} />
            <Text style={{ color: '#111' }}>Updating...</Text>
          </Layout>
        </Layout>
      );
    }
  };

  const renderFileUri = () => {
    if (matricPhoto) {
      return (
        <Avatar source={{ uri: matricPhoto?.uri }} style={[styles.avatar]} />
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
        <Layout style={[styles.subscribeWrap]}>
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

  console.log({ allMatrics });

  const weightageSum = async (): Promise<number> => {
    return new Promise((resolve) => {
      let matricsCpy = [...allMatrics];
      let sum = matricsCpy.reduce((a, b) => {
        return a + b.weightage;
      }, 0);
      resolve(sum);
    });
  };

  const handleIncrementDecrement = async (
    status: boolean,
    operation: string,
    index: number,
  ) => {
    setIsUpdate(true);
    if (status) {
      let matricsCpy = [...allMatrics];
      matricsCpy[index].weightage =
        operation === 'inc'
          ? matricsCpy[index].weightage + 1
          : matricsCpy[index].weightage - 1;

      const sum: number = await weightageSum();
      console.log('🚀 ~ file: index.tsx ~ line 321 ~ sum', sum);

      matricsCpy.map((m) => {
        m.percentWeightage = parseFloat((m.weightage / sum) * 100);
        return m;
      });
      setAllMatrics(matricsCpy);
    }
  };

  return (
    <Layout
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <ImageOverlay
        style={[styles.headerContainer]}
        source={require('../../assets/images/vector.png')}
      >
        <Layout
          style={{
            backgroundColor: 'transparent',
            alignSelf: 'flex-start',
            margin: 5,
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
            <Layout
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  // flex: 1,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  backgroundColor: 'transparent',
                }}
                category="h2"
                status="control"
              >
                Matric Category
              </Text>
              <TouchableOpacity
                style={{ alignContent: 'center' }}
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
            </Layout>
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
                  style={{
                    fontSize: wp2dp('8%'),
                    textDecorationLine: 'underline',
                  }}
                  category="h2"
                  status="control"
                >
                  Categories
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
      {renderIsUpdating()}
      {!isAddMatric && !isSubscribe && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Layout style={styles.matricsWrap}>
            {renderLoading()}
            {!isLoadingMatrics && allMatrics.length > 0 ? (
              allMatrics.map((matric, idx) => {
                return (
                  <Layout key={idx + 1} style={[styles.metrics]} level="1">
                    <Layout style={styles.matricsInnerWrap}>
                      <Layout style={[styles.matricsPercentage]}>
                        <Text category="h6">
                          {parseFloat(matric?.percentWeightage)?.toFixed(1)}%
                        </Text>
                      </Layout>
                      <Layout style={styles.matricsMainBody}>
                        <Text style={styles.matricsTitle} category="h5">
                          {matric?.title}
                        </Text>
                        <Text category="h6" style={{ color: '#606060' }}>
                          {matric?.description}
                        </Text>
                        <Layout style={styles.smallBtnWrap}>
                          <TouchableOpacity
                            style={[
                              styles.smallBtn,
                              {
                                width: 35,
                                marginRight: 5,
                              },
                            ]}
                          >
                            <Text style={styles.smallBtnText}>Edit</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.smallBtn,
                              {
                                width: 45,
                              },
                            ]}
                          >
                            <Text style={styles.smallBtnText}>Delete</Text>
                          </TouchableOpacity>
                        </Layout>
                      </Layout>
                      <Layout
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <TouchableOpacity
                          onPressIn={() =>
                            handleIncrementDecrement(true, 'inc', idx)
                          }
                          onPressOut={() =>
                            handleIncrementDecrement(false, 'inc', idx)
                          }
                        >
                          <PlusIcon />
                        </TouchableOpacity>
                        <Text style={styles.matricsWeightage} category="h5">
                          {matric?.weightage}
                        </Text>
                        <TouchableOpacity
                          onPressIn={() =>
                            handleIncrementDecrement(true, 'dec', idx)
                          }
                          onPressOut={() =>
                            handleIncrementDecrement(false, 'dec', idx)
                          }
                        >
                          <MinusIcon />
                        </TouchableOpacity>
                      </Layout>
                    </Layout>
                  </Layout>
                );
              })
            ) : (
                <Text
                  style={{ backgroundColor: 'transparent', padding: 10 }}
                  category="h6"
                  status="info"
                >
                  {isLoadingMatrics ? 'Loading...' : 'No Matrics found!'}
                </Text>
              )}
          </Layout>
        </ScrollView>
      )}
      {isAddMatric && !isSubscribe && (
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
          <Layout style={styles.formContainer}>
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
              placeholder="Weightage"
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
              caption={matricDescriptionError ? matricDescriptionErrorMsg : ''}
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
        </ScrollView>
      )}

      {RenderSubscribtion()}

      {!isAddMatric && !isSubscribe && (
        <>
          <Button
            onPress={() => setIsAddMatric(!isAddMatric)}
            style={[styles.actionBtn, { right: 80 }]}
            status="control"
            size="giant"
            appearance="ghost"
          // accessoryLeft={AddIcon}
          >
            Add
          </Button>
          <Button
            onPress={() => {
              setIsUpdatingMatrics(true);
              updateMatrics(allMatrics);
            }}
            style={[styles.actionBtn, { right: 0, left: 80 }]}
            status="control"
            size="giant"
            appearance="ghost"
            disabled={!isUpdate}
          // accessoryLeft={AddIcon}
          >
            Update
          </Button>
        </>
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
  actionBtn: {
    backgroundColor: '#4ebd9c',
    borderRadius: 5,
    borderWidth: 0,
    position: 'absolute',
    bottom: 20,
    right: 30,
    width: 110,
    height: 40,

    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 20,
    },
    shadowOpacity: 2.23,
    shadowRadius: 4.62,
    elevation: 10,
  },
  smallBtnWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 20,
    top: 15,
  },
  smallBtn: {
    height: 20,
    color: 'grey',
    // borderWidth: 0.5,
    padding: 2,
    borderRadius: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  smallBtnText: {
    textAlign: 'center',
    color: 'grey',
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
  formContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    // height: hp2dp('100%'),
  },
  primarySubmitButton: {
    width: wp2dp('85%'),
    marginTop: 120,
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
  updatingOuterWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  updatingInnerWrap: {
    backgroundColor: 'grey',
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    borderRadius: 2,
  },
  matricsWrap: {
    marginTop: hp2dp('2%'),
    alignItems: 'center',
  },
  matricsInnerWrap: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  matricsPercentage: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 10,
    right: 5,
    width: 60,
    height: 60,

    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 0.95,

    elevation: 5,
  },
  matricsWeightage: {
    // borderWidth: 0.5,
    padding: 5,
    borderRadius: 5,
    borderColor: '#606060',
    color: '#606060',
    marginVertical: 5,

    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 0.95,

    elevation: 5,
  },
  metrics: {
    padding: 10,
    margin: 5,
    borderColor: 'grey',
    minHeight: hp2dp('14%'),
    width: wp2dp('85%'),
    borderRadius: 10,
    // backgroundColor: colors.primaryBlue,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  matricsMainBody: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 5,
    paddingBottom: 0,
    justifyContent: 'space-between',
  },
  matricsTitle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
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
