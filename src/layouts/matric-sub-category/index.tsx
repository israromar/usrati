/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Alert,
  Keyboard,
} from 'react-native';
import {
  Layout,
  Button,
  Text,
  Avatar,
  Input,
  Spinner,
  Icon,
} from '@ui-kitten/components';
// import * as Progress from 'react-native-progress';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import { launchImageLibrary as READ_EXTERNAL_STORAGE } from 'react-native-image-picker';
import validate from 'validate.js';
import Toast from 'react-native-simple-toast';

import { Loading, ImageOverlay } from '../../components';
import { AppRoute } from '../../navigation/app-routes';
import { colors } from '../../styles';
import { PlusIcon, MinusIcon, PencilIcon, DeleteIcon } from './extra/icons';
import constraints from '../../utils/constraints';
import LoadingComponent from './components/loading/loading.component';
import { useDispatch } from 'react-redux';
import { getAllMatrics } from '../../store/actions/matric.actions';
import { KeyboardAvoidingView } from './extra/3rd-party';

interface IMatricSubCategory {
  currentState: {};
  onBackPress: (v: string) => void;
  onAddSubMatric: (v: object) => void;
  onEditSubMatric: (v: object) => void;
  onDeleteSubMatric: (v: object) => void;
  getAllSubMatrics: () => void;
  updateSubMatrics: (v: Array<{}>) => void;
}

interface IMatric {
  title: string;
  description: string;
  percentWeightage: string;
  weightage: number;
}

export const MatricSubCategory = ({
  currentState,
  onBackPress,
  onAddSubMatric,
  onEditSubMatric,
  onDeleteSubMatric,
  getAllSubMatrics,
  updateSubMatrics,
}: IMatricSubCategory) => {
  const dispatch = useDispatch();

  const [isLoadingMatrics, setIsLoadingMatrics] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUpdateSubMatrics, setIsUpdateSubMatrics] = useState(false);
  const [isDeleteMatric, setIsDeleteMatric] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isAddMatric, setIsAddMatric] = useState(false);
  const [isEditMatric, setIsEditMatric] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [matricId, setMatricId] = useState('');
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
  const [matricPhoto, setMatricPhoto] = useState('' || { uri: '' });
  const [isPhotoUpdated, setIsPhotoUpdated] = useState(false);
  const [allSubMatrics, setAllSubMatrics] = useState([]);
  const [selectedMatric, setSelectedMatric] = useState({});

  useEffect(() => {
    if (
      !currentState.subMatrics.isAddingSubMatric &&
      currentState.subMatrics.isAddSubMatricSuccess &&
      !isEditMatric &&
      isLoading
    ) {
      setIsLoading(false);
      // Alert.alert('Sub category successfully added');
      Toast.showWithGravity(
        'Sub category successfully added',
        Toast.LONG,
        Toast.CENTER,
      );
      setIsAddMatric(false);
      setMatricPhoto('');
      setMatricTitle('');
      setMatricWeightage(0);
      setMatricDescription('');
      let parentID = 0;
      if (currentState?.auth?.user?.parent) {
        parentID = currentState?.auth?.user?.parent[0]?.id;
      }
      dispatch(getAllMatrics({ parentID }));
    }
    if (
      !currentState.subMatrics.isAddingSubMatric &&
      currentState.subMatrics.isAddSubMatricFail &&
      isLoading
    ) {
      setIsLoading(false);
      Alert.alert('Something went wrong, try again!');
    }

    if (
      currentState.subMatrics.isUpdateSubMatricsSuccess &&
      !currentState.subMatrics.isUpdateSubMatricsFail &&
      isUpdateSubMatrics
    ) {
      // Alert.alert('Updated successfully!');
      Toast.showWithGravity('Updated successfully!', Toast.LONG, Toast.CENTER);
      setIsUpdate(false);
      setIsUpdateSubMatrics(false);
    }

    if (
      !currentState.subMatrics.isUpdateSubMatricsSuccess &&
      currentState.subMatrics.isUpdateSubMatricsFail &&
      isUpdateSubMatrics
    ) {
      Alert.alert('Something went wrong, try again!');
      setIsUpdate(false);
      setIsUpdateSubMatrics(false);
    }

    // delete matric category
    if (
      currentState?.subMatrics?.isDeletingSubMatricSuccess &&
      !currentState?.subMatrics?.isDeletingSubMatricFail &&
      isDeleteMatric
    ) {
      // Alert.alert('Deleted successfully!');
      Toast.showWithGravity('Deleted successfully!', Toast.LONG, Toast.CENTER);

      setIsDeleteMatric(false);
      // setIsUpdateSubMatrics(false);
    }

    if (
      !currentState.subMatrics.isDeletingSubMatricSuccess &&
      currentState.subMatrics.isDeletingSubMatricFail &&
      isDeleteMatric
    ) {
      Alert.alert('Something went wrong, try again!');
      setIsDeleteMatric(false);
      // setIsUpdateSubMatrics(false);
    }

    if (
      currentState.subMatrics.isEditingSubMatricSuccess &&
      !currentState.subMatrics.isEditingSubMatricFail &&
      isEditMatric
    ) {
      // Alert.alert('Updated successfully!');
      Toast.showWithGravity('Updated successfully!', Toast.LONG, Toast.CENTER);

      let index = allSubMatrics.findIndex((cat) => cat?.id === matricId);
      let cpy = [...allSubMatrics];
      let obj = cpy.find((c) => c.id === matricId);
      obj.photo = selectedMatric.matricPhoto;
      obj.title = selectedMatric.matricTitle;
      obj.weightage = parseFloat(selectedMatric.matricWeightage);
      obj.description = selectedMatric.matricDescription;

      setAllSubMatrics(cpy);

      setTimeout(() => {
        handleIncrementDecrement(true, 'none', index);
        // updateSubMatrics(allSubMatrics);
      }, 1000);

      setIsEditMatric(false);
      setIsLoading(false);
      setIsAddMatric(false);
      setMatricPhoto('');
      setMatricTitle('');
      setMatricWeightage(0);
      setMatricDescription('');
    }

    if (
      !currentState.subMatrics.isEditingSubMatricSuccess &&
      currentState.subMatrics.isEditingSubMatricFail &&
      isEditMatric
    ) {
      Alert.alert('Something went wrong, try again!');
      setIsLoading(false);
    }

    setAllSubMatrics(currentState?.subMatrics?.subMatrics);
    setIsLoadingMatrics(currentState?.subMatrics?.isGetSubMatricsLoading);
  }, [currentState, isLoading, isUpdateSubMatrics]);

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
    if (isAddMatric || isEditMatric) {
      setIsAddMatric(false);
      setIsEditMatric(false);
    } else {
      onBackPress(AppRoute.MATRIC_CATEGORY);
    }
  };

  const handleAddEditMatricCategory = () => {
    if (!isEditMatric) {
      if (currentState?.subMatrics?.subMatrics?.length >= 3) {
        setIsSubscribe(true);
        return;
      }
    }
    Keyboard.dismiss();
    setSelectedMatric({
      matricId,
      matricPhoto,
      matricTitle,
      matricWeightage,
      matricDescription,
    });

    const validationResult = validate(
      { matricTitle, matricWeightage },
      constraints,
    );
    if (validationResult?.matricTitle) {
      setMatricTitleError(true);
      setMatricTitleErrorMsg(validationResult?.matricTitle[0]);
      return;
    }
    if (validationResult?.matricWeightage) {
      setMatricWeightageError(true);
      setMatricWeightageErrorMsg(validationResult?.matricWeightage[0]);
      return;
    }
    // if (validationResult?.matricDescription) {
    //   setMatricDescriptionError(true);
    //   setMatricDescriptionErrorMsg(validationResult?.matricDescription[0]);
    //   return;
    // }
    if (!matricTitleError && !matricWeightageError && !matricDescriptionError) {
      if (isAddMatric) {
        onAddSubMatric({
          matricPhoto,
          matricTitle,
          matricWeightage,
          matricDescription,
        });
      } else if (isEditMatric) {
        onEditSubMatric({
          matricId,
          matricPhoto: isPhotoUpdated ? matricPhoto : '',
          matricTitle,
          matricWeightage,
          matricDescription,
        });
      }
      setIsLoading(true);
    }
  };

  const renderLoading = () => {
    if (isLoadingMatrics) {
      return <Loading />;
    }
  };

  const renderIsUpdating = () => {
    if (isUpdateSubMatrics) {
      return <LoadingComponent text={'Updating...'} />;
    }
  };

  const renderIsDeleting = () => {
    if (isDeleteMatric) {
      return <LoadingComponent text={'Deleting...'} />;
    }
  };

  const profileCameraIcon = () => {
    return (
      <Layout style={[styles.photoIcons]}>
        <TouchableOpacity
          onPress={() => {
            chooseFile('photo', 'READ_EXTERNAL_STORAGE', READ_EXTERNAL_STORAGE);
          }}
        >
          <Icon style={styles.icon} fill="#8F9BB3" name={'camera-outline'} />
        </TouchableOpacity>
      </Layout>
    );
  };

  const profileEditIcons = () => {
    return (
      <>
        <Layout style={[styles.photoIcons, { bottom: 72 }]}>
          <TouchableOpacity onPress={() => setMatricPhoto('')}>
            <Icon style={styles.icon} fill="#8F9BB3" name={'trash-2-outline'} />
          </TouchableOpacity>
        </Layout>

        <Layout style={styles.photoIcons}>
          <TouchableOpacity
            onPress={() => {
              chooseFile(
                'photo',
                'READ_EXTERNAL_STORAGE',
                READ_EXTERNAL_STORAGE,
              );
            }}
          >
            <Icon style={styles.icon} fill="#8F9BB3" name={'edit-outline'} />
          </TouchableOpacity>
        </Layout>
      </>
    );
  };

  const renderFileUri = () => {
    if (matricPhoto) {
      return (
        <>
          <Avatar
            source={{
              uri:
                matricPhoto && matricPhoto?.uri
                  ? matricPhoto?.uri
                  : matricPhoto,
            }}
            style={[styles.avatar]}
          />
          {profileEditIcons()}
        </>
      );
    } else {
      return (
        <>
          <Avatar
            source={require('../../assets/images/guardian-avatar.png')}
            style={styles.avatar}
          />
          {profileCameraIcon()}
        </>
      );
    }
  };

  const requestMediaPermission = async (permissionFor: string) => {
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
      const permission = await requestMediaPermission(permissionFor);
      if (permission === 'never_ask_again') {
        Alert.alert(
          `Go to your app info and enable permission for ${permissionFor}.`,
        );
      }
      if (permission === 'granted') {
        mediaTypeInvoker(options, async (response: any) => {
          if (!response?.didCancel) {
            setMatricPhoto(response);
            if (isEditMatric && !isAddMatric && !isSubscribe) {
              setIsPhotoUpdated(true);
            } else {
              setIsPhotoUpdated(false);
            }
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
    if (isAddMatric && isSubscribe && !isEditMatric) {
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

  const RenderAddMatricForm = () => {
    if (isAddMatric && !isSubscribe && !isEditMatric) {
      return (
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
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
              value={matricDescription}
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
              onPress={() => handleAddEditMatricCategory()}
              style={[styles.primarySubmitButton]}
              status="control"
              size="giant"
              appearance="ghost"
              accessoryLeft={isLoading && LoadingIndicator}
            >
              {isLoading ? '' : 'Add'}
            </Button>
          </Layout>
        </ScrollView>
      );
    }
  };

  const RenderEditMatricForm = () => {
    if (isEditMatric && !isAddMatric && !isSubscribe) {
      return (
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
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
              onPress={() => handleAddEditMatricCategory()}
              style={[styles.primarySubmitButton]}
              status="control"
              size="giant"
              appearance="ghost"
              accessoryLeft={isLoading && LoadingIndicator}
            >
              {isLoading ? '' : 'Update'}
            </Button>
          </Layout>
        </ScrollView>
      );
    }
  };

  const RenderBottomActionButtons = () => {
    if (!isAddMatric && !isSubscribe && !isEditMatric) {
      return (
        <Layout
          style={{
            height: hp2dp('10'),
            width: wp2dp('85%'),
            justifyContent: 'space-around',
            flexDirection: 'row-reverse',
            alignItems: 'center',
          }}
        >
          <Button
            onPress={() => {
              setIsAddMatric(true);
              setMatricPhoto('');
              setIsEditMatric(false);
            }}
            style={[styles.actionBtn]}
            status="control"
            size="giant"
            appearance="ghost"
          >
            Add
          </Button>
          {isUpdate && (
            <Button
              onPress={() => {
                setIsUpdateSubMatrics(true);
                updateSubMatrics(allSubMatrics);
                setIsAddMatric(false);
              }}
              style={[styles.actionBtn]}
              status="control"
              size="giant"
              appearance="ghost"
              disabled={!isUpdate}
              // accessoryLeft={AddIcon}
            >
              Update
            </Button>
          )}
        </Layout>
      );
    }
  };

  const weightageSum = async (): Promise<number> => {
    return new Promise((resolve) => {
      let matricsCpy = [...allSubMatrics];
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
      let matricsCpy = [...allSubMatrics];

      matricsCpy[index].weightage =
        operation === 'inc'
          ? matricsCpy[index].weightage + 1
          : operation === 'dec'
          ? matricsCpy[index].weightage - 1
          : matricsCpy[index].weightage;

      const sum: number = await weightageSum();

      matricsCpy.map((m) => {
        m.percentWeightage = parseFloat((m.weightage / sum) * 100);
        return m;
      });
      setAllSubMatrics(matricsCpy);
    }
  };

  const handleEditSubMatric = ({
    id,
    photo,
    title,
    weightage,
    description,
  }: any) => {
    setIsEditMatric(true);
    setIsAddMatric(false);
    setIsSubscribe(false);
    setMatricId(id);
    if (photo && photo.uri) {
      setMatricPhoto(photo.uri);
    } else if (photo) {
      setMatricPhoto(photo);
    } else {
      setMatricPhoto('');
    }
    setMatricTitle(title);
    setMatricDescription(description);
    setMatricWeightage(weightage.toString());
  };

  const handleDeleteSubMatric = (matric: { title: string; id: number }) => {
    Alert.alert(
      'Warning!',
      `Are you sure, you want to delete: ${matric?.title}?`,
      [
        {
          text: 'Confirm',
          onPress: () => {
            onDeleteSubMatric({ matricId: matric?.id });
            setIsDeleteMatric(true);
          },
        },
        {
          text: 'Cancel',
          // onPress: () => { },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <KeyboardAvoidingView
      keyboardShouldPersistTaps={'handled'}
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <Layout
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'transparent',
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

          <Layout style={styles.addMatricHeader}>
            {isAddMatric && !isSubscribe && !isEditMatric && (
              <Layout style={styles.addMatricWrap}>
                <Text
                  style={styles.addMatricText}
                  category="h2"
                  status="control"
                >
                  Sub Category
                </Text>
                <TouchableOpacity
                  style={{ alignContent: 'center' }}
                  // onPress={() => {
                  //   chooseFile(
                  //     'photo',
                  //     'READ_EXTERNAL_STORAGE',
                  //     READ_EXTERNAL_STORAGE,
                  //   );
                  // }}
                >
                  {renderFileUri()}
                </TouchableOpacity>
              </Layout>
            )}

            {isEditMatric && !isAddMatric && !isSubscribe && (
              <Layout style={styles.addMatricWrap}>
                <Text
                  style={styles.addMatricText}
                  category="h2"
                  status="control"
                >
                  Update Sub Category
                </Text>
                <TouchableOpacity
                  style={{ alignContent: 'center' }}
                  // onPress={() => {
                  //   chooseFile(
                  //     'photo',
                  //     'READ_EXTERNAL_STORAGE',
                  //     READ_EXTERNAL_STORAGE,
                  //   );
                  // }}
                >
                  {renderFileUri()}
                </TouchableOpacity>
              </Layout>
            )}

            {!isAddMatric && !isSubscribe && !isEditMatric && (
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
                    Sub
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
        {renderIsDeleting()}
        {!isAddMatric && !isSubscribe && !isEditMatric && (
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
          >
            <Layout style={[styles.matricsWrap]}>
              {renderLoading()}
              {!isLoadingMatrics && allSubMatrics?.length > 0 ? (
                allSubMatrics.map((matric: IMatric, idx) => {
                  return (
                    <Layout key={idx + 1} style={[styles.metrics]} level="1">
                      <Layout style={styles.matricsInnerWrap}>
                        <Layout style={[styles.matricsPercentage]}>
                          <Text category="h6">
                            {parseFloat(matric?.percentWeightage)?.toFixed(1)}
                          </Text>
                        </Layout>
                        <Layout style={styles.matricsMainBody}>
                          <Text style={styles.matricsTitle} category="h6">
                            {matric?.title.length > 80
                              ? `${matric?.title.substring(0, 70)}...`
                              : matric?.title}
                          </Text>
                          <Text category="h6" style={{ color: '#606060' }}>
                            {matric?.description
                              ? matric?.description?.length > 80
                                ? `${matric?.description.substring(0, 70)}...`
                                : matric?.description
                              : 'No description available.'}
                          </Text>
                          <Layout style={styles.smallBtnWrap}>
                            <TouchableOpacity
                              onPress={() => handleEditSubMatric(matric)}
                              style={[
                                styles.smallBtn,
                                {
                                  marginRight: 5,
                                },
                              ]}
                            >
                              <PencilIcon />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => handleDeleteSubMatric(matric)}
                              style={[styles.smallBtn]}
                            >
                              <DeleteIcon />
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
                  {isLoadingMatrics
                    ? 'Loading...'
                    : 'Sub categories are not available for this Metric.'}
                </Text>
              )}
            </Layout>
          </ScrollView>
        )}

        {RenderAddMatricForm()}
        {RenderEditMatricForm()}
        {RenderSubscribtion()}
        {RenderBottomActionButtons()}
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  photoIcons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'absolute',
    borderColor: colors.primaryBlue,
    borderWidth: 0.5,
    borderRadius: 50,
    width: 30,
    height: 30,
    bottom: 35,
    right: 1,
    zIndex: 2,
  },
  icon: { padding: 0, width: 20, height: 20 },
  subscribeWrap: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: -200,
    width: wp2dp('90%'),
    margin: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  actionBtn: {
    backgroundColor: colors.primaryBlue,
    borderRadius: 5,
    borderWidth: 0,
    width: wp2dp('30%'),
    height: hp2dp('5%'),

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
    marginTop: 15,
    // top: 5,
    // backgroundColor: 'red',
  },
  smallBtn: {
    // height: 20,
    // color: 'grey',
    // borderWidth: 0.5,
    // top: 10,
    padding: 2,
    borderRadius: 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 4,
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
    width: wp2dp('15%'),
    height: hp2dp('8%'),

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
    height: hp2dp('32%'),
    paddingHorizontal: 45,
    backgroundColor: 'transparent',
    padding: 10,
  },
  addMatricHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    minWidth: wp2dp('90%'),
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  addMatricWrap: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMatricText: {
    // flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'transparent',
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
