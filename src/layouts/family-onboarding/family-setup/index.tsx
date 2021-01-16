/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  StyleSheet,
  Animated,
  Dimensions,
  Modal as RNModal,
  PanResponder,
  View,
} from 'react-native';
import {
  Avatar,
  Layout,
  Button,
  Input,
  Text,
  Modal,
  Calendar,
  Spinner,
} from '@ui-kitten/components';
// import { validate } from 'validate.js';
// import { useDispatch } from 'react-redux';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

import { ImageOverlay } from '../../../components';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { launchCamera as CAMERA, launchImageLibrary as READ_EXTERNAL_STORAGE } from 'react-native-image-picker';
// import { constraints } from '../../../utils/constraints';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import Modal from 'react-native-modal';

import { IAddChild, IAddFamilySetup as IIAddFamilySetup, IAddGuardian } from '../../../containers/family-setup';
// import i18n from '../../../translations';
import StepIndicator from '../../../components/step-indicator';
import { AppRoute } from '../../../navigation/app-routes';

interface IAddFamilySetup {
  onAddFamilySettings(obj: IIAddFamilySetup): void;
  onAddGuardian(obj: IAddGuardian): void;
  onAddChild(obj: IAddChild): void;
  onSkipNow: (v: string) => void,
  onSubmit: (v: string) => void,
  currentState: {
    family: {
      family: {
        isAddingFamily: boolean,
        isAddFamilyFail: boolean;
        isAddFamilySuccess: boolean;
        addFamilyError: string;
      }
      guardian: {
        isAddingGuardian: boolean,
        isAddGuardianFail: boolean;
        isAddGuardianSuccess: boolean;
        addGuardianError: string;
      }
      child: {
        isAddingChild: boolean,
        isAddChildFail: boolean;
        isAddChildSuccess: boolean;
        addChildError: string;
      }
    };
  };
}

export const LoadingIndicator = (props: any) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

export const FamilySetup = ({
  onAddFamilySettings,
  onAddGuardian,
  onAddChild,
  onSkipNow,
  onSubmit,
  currentState: {
    family: { family, guardian, child },
  },
}: IAddFamilySetup): React.ReactElement => {
  const [isAddFamily, setIsAddFamily] = useState<boolean>(false);
  const [isAddGuardian, setIsAddGuardian] = useState<boolean>(false);
  const [isAddChild, setIsAddChild] = useState<boolean>(false);

  const [currentPosition, setCurrentPosition] = useState(0);
  // const [familyPhoto, setFamilyPhoto] = useState('8RGj78Td-/image.png');
  const [familyPhoto, setFamilyPhoto] = useState('');
  const [familyName, setFamilyName] = useState<string>('');
  const [familyNameError, setFamilyNameError] = useState<boolean>(false);
  const [familyNameErrorMsg, setFamilyNameErrorMsg] = useState<string>('');

  const [guardianUsername, setGuardianUsername] = useState('');
  const [guardianUsernameError, setGuardianUsernameError] = useState<boolean>(
    false,
  );
  const [guardianUsernameErrorMsg, setGuardianUsernameErrorMsg] = useState<
    string
  >('');

  const [guardianEmail, setGuardianEmail] = useState('');
  const [guardianEmailError, setGuardianEmailError] = useState<boolean>(
    false,
  );
  const [guardianEmailErrorMsg, setGuardianEmailErrorMsg] = useState<
    string
  >('');

  const [guardianPassword, setGuardianPassword] = useState('');
  const [guardianPasswordError, setGuardianPasswordError] = useState<boolean>(
    false,
  );
  const [guardianPasswordErrorMsg, setGuardianPasswordErrorMsg] = useState<
    string
  >('');

  const [familyId, setFamilyId] = useState<string>('Id-112');
  const [familyIdError, setFamilyIdError] = useState<boolean>(false);
  const [familyIdErrorMsg, setFamilyIdErrorMsg] = useState<string>('');

  // const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [isNext, setIsNext] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mediaSelectorModalVisible, setMediaSelectorModalVisible] = useState(
    false,
  );
  const [filePath, setFilePath] = useState(null);
  const [guardianPhoto, setGuardianPhoto] = useState(null);

  const [childPhoto, setChildPhoto] = useState(null);
  const [childName, setChildName] = useState<string>('');
  const [childNameError, setChildNameError] = useState<boolean>(false);
  const [childNameErrorMsg, setChildNameErrorMsg] = useState<string>('');
  const [date, setDate] = useState(new Date('Jan 01, 2010 00:20:18'));
  const [dateSelected, setDateSelected] = useState(false);

  const [schoolName, setSchoolName] = useState<string>('');
  const [schoolNameError, setSchoolNameError] = useState<boolean>(false);
  const [schoolNameErrorMsg, setSchoolNameErrorMsg] = useState<string>('');

  const [childInterest, setChildInterest] = useState<string>('');
  const [childInterestError, setChildInterestError] = useState<boolean>(false);
  const [childInterestErrorMsg, setChildInterestErrorMsg] = useState<string>(
    '',
  );

  const [childUsername, setChildUsername] = useState<string>('');
  const [childUsernameError, setChildUsernameError] = useState<boolean>(false);
  const [childUsernameErrorMsg, setChildUsernameErrorMsg] = useState<string>(
    '',
  );

  const [childPassword, setChildPassword] = useState<string>('');
  const [childPasswordError, setChildPasswordError] = useState<boolean>(false);
  const [childPasswordErrorMsg, setChildPasswordErrorMsg] = useState<string>(
    '',
  );

  // const [onDismiss, setOnDismiss] = useState(false);

  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight / 2,
    duration: 100,
    useNativeDriver: true,
  });

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const handleMediaSelectorModal = () => {
    setMediaSelectorModalVisible(false);
  };

  const handleDismiss = () => {
    closeAnim.start(handleMediaSelectorModal);
  };

  useEffect(() => {
    resetPositionAnim.start();
  }, [resetPositionAnim]);

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, { dy: panY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 0 && gs.vy > 2) {
          return handleDismiss();
        }
        return resetPositionAnim.start();
      },
    }),
  ).current;

  useEffect(() => {
    if (isAddFamily && !family?.isAddingFamily && family?.isAddFamilySuccess && !family?.isAddFamilyFail) {
      Alert.alert('Family successfully added.');
      setCurrentPosition(1);
      setFamilyName('');
      setIsAddFamily(false);
    }
    if (isAddFamily && !family?.isAddingFamily && !family?.isAddFamilySuccess && family?.isAddFamilyFail) {
      Alert.alert(family.addFamilyError);
      setIsAddFamily(false);
      setCurrentPosition(0);
    }
    if (isAddGuardian && !guardian?.isAddingGuardian && guardian?.isAddGuardianSuccess && !guardian?.isAddGuardianFail) {
      Alert.alert('Guardian successfully added.');
      setCurrentPosition(2);
      // setGuardianPhoto(null);
      setGuardianUsername('');
      setGuardianEmail('');
      setGuardianPassword('');
      setIsAddGuardian(false);
    }
    if (isAddGuardian && !guardian?.isAddingGuardian && !guardian?.isAddGuardianSuccess && guardian?.isAddGuardianFail) {
      Alert.alert(guardian.addGuardianError);
      setIsAddGuardian(false);
      setCurrentPosition(1);
    }
    if (isAddChild && !child?.isAddingChild && child?.isAddChildSuccess && !child?.isAddChildFail) {
      Alert.alert('Child successfully added.');
      setCurrentPosition(3);
      setChildName('');
      setDate(new Date());
      setSchoolName('');
      setChildInterest('');
      setChildUsername('');
      setChildPassword('');
      setIsAddChild(false);
    }
    if (isAddChild && !child?.isAddingChild && !child?.isAddChildSuccess && child?.isAddChildFail) {
      Alert.alert(child?.addChildError);
      setIsAddChild(false);
      setCurrentPosition(2);
    }
  }, [child, family, guardian, isAddChild, isAddFamily, isAddGuardian]);

  const handleFamilySettingInput = (
    inputField: (v: React.SetStateAction<string>) => void,
    inputFieldError: (v: boolean) => void,
    value: React.SetStateAction<string>,
  ) => {
    inputField(value);
    inputFieldError(false);
  };

  const handleAddFamilySetup = (position: number) => {
    if (position === 1) {
      if (familyId && familyName) {
        setIsAddFamily(true);
        onAddFamilySettings({
          familyId,
          familyName,
          familyPhoto,
        });
      }
      setFamilyNameError(!familyName);
      setFamilyIdError(!familyId);
    } else {
      if (guardianUsername && guardianEmail && guardianPassword) {
        setIsAddGuardian(true);
        onAddGuardian({
          photo: guardianPhoto,
          email: guardianEmail,
          username: guardianUsername,
          password: guardianPassword,
        });
      }
      setGuardianUsernameError(!guardianUsername);
      setGuardianEmailError(!guardianEmail);
      setGuardianPasswordError(!guardianPassword);
    }
  };

  const handleAddChild = (flag: string) => {
    if (
      flag === 'Add' &&
      childName &&
      schoolName &&
      childUsername &&
      childInterest &&
      childPassword
    ) {
      setIsAddChild(true);
      onAddChild({ photo: childPhoto, name: childName, dob: date, schoolName, interest: childInterest, username: childUsername, password: childPassword });
    }
    if (flag === 'Next') {
      setChildNameError(!childName);
      setSchoolNameError(!schoolName);
    } else {
      setChildInterestError(!childInterest);
      setChildUsernameError(!childUsername);
      setChildPasswordError(!childPassword);
    }
    setIsNext(!!childName && !!schoolName);
  };

  // family setting form effect
  useEffect(() => {
    if (!familyId) {
      setFamilyIdErrorMsg('Family Id cannot be empty');
    }
    if (!familyName) {
      setFamilyNameErrorMsg('Name cannot be empty');
    }
  }, [familyId, familyName]);

  // guardian form effect
  useEffect(() => {
    if (!guardianUsername) {
      setGuardianUsernameErrorMsg('Username cannot be empty');
    }
    if (!guardianEmail) {
      setGuardianEmailErrorMsg('Email cannot be empty');
    }
    if (!guardianPassword) {
      setGuardianPasswordErrorMsg('Password cannot be empty');
    }
  }, [guardianUsername, guardianEmail, guardianPassword]);

  // child form effect
  useEffect(() => {
    if (!childName) {
      setChildNameErrorMsg('Name cannot be empty');
    }
    if (!schoolName) {
      setSchoolNameErrorMsg('School name cannot be empty');
    }
  }, [childName, schoolName]);

  useEffect(() => {
    if (!childInterest) {
      setChildInterestErrorMsg('Interests cannot be empty');
    }
    if (!childUsername) {
      setChildUsernameErrorMsg('Username cannot be empty');
    }
    if (!childPassword) {
      setChildPasswordErrorMsg('Password cannot be empty');
    }
  }, [childInterest, childUsername, childPassword]);

  const handleSubmit = () => {
    onSubmit(AppRoute.DASHBOARD);
  };

  const requestCameraPermission = async (permissionFor: string) => {
    try {
      const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS[permissionFor]);
      return permission;
    } catch (err) {
      console.warn(err);
      return err;
    }
  };

  const chooseFile = async (mediaType: string, permissionFor: string, mediaTypeInvoker: any) => {
    let options = {
      mediaType,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    try {
      const permission = await requestCameraPermission(permissionFor);
      if (permission === 'never_ask_again') {
        Alert.alert(`Go to your app info and enable permission for ${permissionFor}.`);
      }
      if (permission === 'granted') {
        mediaTypeInvoker(options, async (response: any) => {
          // if (response.didCancel) {
          //   Alert.alert('User cancelled camera picker');
          //   return;
          // } else if (response.errorCode == 'camera_unavailable') {
          //   Alert.alert('Camera not available on device');
          //   return;
          // } else if (response.errorCode == 'permission') {
          //   Alert.alert('Permission not satisfied');
          //   return;
          // } else if (response.errorCode == 'others') {
          //   console.log('response.errorMessage', response.errorMessage);
          //   Alert.alert(response.errorMessage);
          //   return;
          // }
          setFilePath(response);
          if (!response?.didCancel) {
            [setFamilyPhoto, setGuardianPhoto, setChildPhoto][currentPosition](response);
          }
        });
      }
    } catch (e) {
      console.log('error oc', e);
    }
  };

  const renderFileUri = (val: string) => {
    if (currentPosition === 0) {
      if (familyPhoto) {
        return <Avatar source={{ uri: familyPhoto?.uri }} style={styles.avatar} />;
      } else {
        return (
          <Avatar
            source={require('./assets/guardian-avatar.png')}
            style={styles.avatar}
          />
        );
      }
    } else if (currentPosition === 1) {
      if (guardianPhoto) {
        return <Avatar source={{ uri: guardianPhoto?.uri }} style={styles.avatar} />;
      } else {
        return (
          <Avatar
            source={require('./assets/guardian-avatar.png')}
            style={styles.avatar}
          />
        );
      }
    } else if (val === 'child') {
      if (childPhoto) {
        return <Avatar source={{ uri: childPhoto?.uri }} style={styles.avatar} />;
      } else {
        return (
          <Avatar
            source={require('./assets/child-avatar.png')}
            style={styles.avatar}
          />
        );
      }
    }
  };

  const renderSkipForNow = () => {

    const handleOnSkip = () => {
      currentPosition === 1 ? setCurrentPosition(2) : onSkipNow(AppRoute.DASHBOARD);
    };

    return (
      <TouchableOpacity
        style={styles.skipForNow}
        onPress={handleOnSkip}
      >
        <Text
          style={{
            textDecorationLine: 'underline',
            alignSelf: 'flex-end',
            fontSize: 15,
          }}
          appearance="default"
          category="h6"
          status="info"
        >
          Skip for now
        </Text>
      </TouchableOpacity >
    );
  };

  return (
    <KeyboardAvoidingView style={{ backgroundColor: '#fff' }}>
      <RNModal
        animated
        animationType="fade"
        visible={mediaSelectorModalVisible}
        transparent
        onRequestClose={handleDismiss}
      >
        <View style={styles.overlay}>
          <Animated.View
            style={{
              ...styles.Modalcontainer,
              transform: [{ translateY: translateY }],
            }}
            {...panResponders.panHandlers}
          >
            <View style={styles.sliderIndicatorRow}>
              <View style={styles.sliderIndicator} />
            </View>
            <Button
              onPress={() => {
                chooseFile('photo', 'READ_EXTERNAL_STORAGE', READ_EXTERNAL_STORAGE);
                handleMediaSelectorModal();
              }}
              style={styles.primarySubmitButton}
              status="control"
              size="giant"
              appearance="ghost"
            >
              Choose from gallery
            </Button>
            <Button
              onPress={() => {
                chooseFile('photo', 'CAMERA', CAMERA);
                handleMediaSelectorModal();
              }}
              style={styles.primarySubmitButton}
              status="control"
              size="giant"
              appearance="ghost"
            >
              Take Photo
            </Button>
            <Button
              onPress={handleDismiss}
              style={[
                styles.primarySubmitButton,
                { backgroundColor: 'transparent', top: 25 },
              ]}
              size="giant"
              appearance="outline"
            >
              Cancel
            </Button>
          </Animated.View>
        </View>
      </RNModal>

      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../../assets/images/vector.png')}
      >
        <Layout
          style={{
            backgroundColor: 'transparent',
            alignSelf: 'flex-start',
            justifyContent: 'center',
            minHeight: 50,
          }}
        >
          {/* <TouchableOpacity style={{ bottom: 0 }} onPress={hanldeBackPress}>
            <Image source={require('../../../assets/images/backarrow.png')} />
          </TouchableOpacity> */}
        </Layout>
        <Layout
          style={[
            styles.headerElements,
            { bottom: currentPosition === 3 ? 0 : 20 },
          ]}
        >
          <Text style={{ alignSelf: 'center' }} category="h1" status="control">
            Family Setup
          </Text>
          {currentPosition !== 3 && (
            <Layout style={{ backgroundColor: 'transparent', top: 10 }}>
              <StepIndicator
                currentPosition={currentPosition}
                direction={'horizontal'}
                onStepPress={(position: React.SetStateAction<number>) =>
                  setCurrentPosition(position)
                }
              />
            </Layout>
          )}
        </Layout>
      </ImageOverlay>

      {currentPosition === 0 && (
        <Layout style={styles.formContainer}>
          <Text
            style={{ alignSelf: 'center', color: 'grey' }}
            category="h1"
            status="control"
          >
            Family Setting
          </Text>
          <TouchableOpacity
            onPress={() => {
              setMediaSelectorModalVisible(true);
            }}
          >
            {renderFileUri('family')}
          </TouchableOpacity>
          <Input
            style={styles.inputField}
            value={familyName.trim()}
            caption={familyNameError ? familyNameErrorMsg : ''}
            status={familyNameError ? 'danger' : 'basic'}
            placeholder="Family name"
            onChangeText={(nextValue) =>
              handleFamilySettingInput(
                setFamilyName,
                setFamilyNameError,
                nextValue,
              )
            }
          />
          <Input
            style={styles.inputField}
            value={familyId.trim()}
            caption={familyIdError ? familyIdErrorMsg : ''}
            status={familyIdError ? 'danger' : 'basic'}
            placeholder="Family id"
            onChangeText={(nextValue) =>
              handleFamilySettingInput(setFamilyId, setFamilyIdError, nextValue)
            }
          />
          <Button
            onPress={() => handleAddFamilySetup(1)}
            style={styles.primarySubmitButton}
            status="control"
            size="giant"
            appearance="ghost"
            accessoryLeft={isAddFamily && LoadingIndicator}
          >
            {isAddFamily ? '' : 'Add'}
          </Button>
        </Layout>
      )}

      {currentPosition === 1 && (
        <Layout style={styles.formContainer}>
          <Text
            style={{ alignSelf: 'center', color: 'grey' }}
            category="h1"
            status="control"
          >
            Guardian
          </Text>
          <TouchableOpacity onPress={() => setMediaSelectorModalVisible(true)}>
            {renderFileUri('guardian')}
          </TouchableOpacity>
          <Input
            style={styles.inputField}
            value={guardianUsername.trim()}
            caption={guardianUsernameError ? guardianUsernameErrorMsg : ''}
            status={guardianUsernameError ? 'danger' : 'basic'}
            placeholder="Username"
            onChangeText={(nextValue) =>
              handleFamilySettingInput(
                setGuardianUsername,
                setGuardianUsernameError,
                nextValue,
              )
            }
          />
          <Input
            style={styles.inputField}
            value={guardianEmail.trim()}
            caption={guardianEmailError ? guardianEmailErrorMsg : ''}
            status={guardianEmailError ? 'danger' : 'basic'}
            placeholder="Email"
            onChangeText={(nextValue) =>
              handleFamilySettingInput(
                setGuardianEmail,
                setGuardianEmailError,
                nextValue,
              )
            }
          />
          <Input
            style={styles.inputField}
            value={guardianPassword.trim()}
            caption={guardianPasswordError ? guardianPasswordErrorMsg : ''}
            status={guardianPasswordError ? 'danger' : 'basic'}
            placeholder="Password"
            onChangeText={(nextValue) =>
              handleFamilySettingInput(
                setGuardianPassword,
                setGuardianPasswordError,
                nextValue,
              )
            }
          />
          <Button
            onPress={() => handleAddFamilySetup(2)}
            style={styles.primarySubmitButton}
            status="control"
            size="giant"
            appearance="ghost"
            accessoryLeft={guardian?.isAddingGuardian && LoadingIndicator}
          >
            {guardian.isAddingGuardian ? '' : 'Add'}
          </Button>
          <Layout style={styles.skipForNowWrap}>
            {renderSkipForNow()}
          </Layout>
        </Layout>
      )}

      {currentPosition === 2 && (
        <Layout style={styles.formContainer}>
          <Text
            style={{ alignSelf: 'center', color: 'grey' }}
            category="h1"
            status="control"
          >
            Child
          </Text>
          <TouchableOpacity onPress={() => setMediaSelectorModalVisible(true)}>
            {renderFileUri('child')}
          </TouchableOpacity>
          {!isNext && (
            <>
              <Input
                style={styles.inputField}
                value={childName.trim()}
                caption={childNameError ? childNameErrorMsg : ''}
                status={childNameError ? 'danger' : 'basic'}
                placeholder="Name"
                onChangeText={(nextValue) =>
                  handleFamilySettingInput(
                    setChildName,
                    setChildNameError,
                    nextValue,
                  )
                }
              />
              <Modal
                visible={visible}
                onBackdropPress={() => setVisible(false)}
              >
                <Calendar
                  style={{ backgroundColor: '#fff' }}
                  min={new Date('January 01, 2000 00:20:18')}
                  date={date}
                  onSelect={(nextDate) => {
                    setDate(nextDate);
                    setDateSelected(true);
                    setVisible(false);
                  }}
                />
              </Modal>
              <TouchableOpacity
                style={styles.dob}
                onPress={() => {
                  setVisible(true);
                }}
              >
                <Text
                  category="h6"
                  style={{
                    alignItems: 'center',
                    paddingLeft: 10,
                    color: dateSelected ? '#111' : '#A9A9A9',
                    fontSize: 15,
                  }}
                >
                  Date of birth : {date && date?.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              <Input
                style={styles.inputField}
                value={schoolName.trim()}
                caption={schoolNameError ? schoolNameErrorMsg : ''}
                status={schoolNameError ? 'danger' : 'basic'}
                placeholder="School name"
                // //secureTextEntry={secureTextEntry}
                onChangeText={(nextValue) =>
                  handleFamilySettingInput(
                    setSchoolName,
                    setSchoolNameError,
                    nextValue,
                  )
                }
              />
            </>
          )}
          {isNext && (
            <>
              <Input
                style={styles.inputField}
                value={childInterest}
                caption={childInterestError ? childInterestErrorMsg : ''}
                status={childInterestError ? 'danger' : 'basic'}
                placeholder="Interest"
                onChangeText={(nextValue) =>
                  handleFamilySettingInput(
                    setChildInterest,
                    setChildInterestError,
                    nextValue,
                  )
                }
              />
              <Input
                style={styles.inputField}
                value={childUsername.trim()}
                caption={childUsernameError ? childUsernameErrorMsg : ''}
                status={childUsernameError ? 'danger' : 'basic'}
                placeholder="Username"
                onChangeText={(nextValue) =>
                  handleFamilySettingInput(
                    setChildUsername,
                    setChildUsernameError,
                    nextValue,
                  )
                }
              />
              <Input
                style={styles.inputField}
                value={childPassword.trim()}
                caption={childPasswordError ? childPasswordErrorMsg : ''}
                status={childPasswordError ? 'danger' : 'basic'}
                placeholder="Password"
                //secureTextEntry={secureTextEntry}
                onChangeText={(nextValue) =>
                  handleFamilySettingInput(
                    setChildPassword,
                    setChildPasswordError,
                    nextValue,
                  )
                }
              />
              <Button
                onPress={() => setIsNext(false)}
                style={{
                  marginLeft: 'auto',
                  marginTop: 0,
                }}
                appearance="outline"
              >
                Back
              </Button>
            </>
          )}
          <Button
            onPress={() => handleAddChild(isNext ? 'Add' : 'Next')}
            style={styles.primarySubmitButton}
            status="control"
            size="giant"
            appearance="ghost"
            accessoryLeft={child?.isAddingChild && LoadingIndicator}
          >
            {child.isAddingChild ? '' : !isNext ? 'Next' : 'Add'}
          </Button>
          <Layout style={styles.skipForNowWrap}>
            {renderSkipForNow()}
          </Layout>
        </Layout>
      )}
      {currentPosition === 3 && (
        <Layout style={styles.stepperContainer}>
          <StepIndicator
            currentPosition={currentPosition}
            direction={'vertical'}
            onStepPress={(position: React.SetStateAction<number>) =>
              setCurrentPosition(position)
            }
          />
          <Button
            onPress={handleSubmit}
            style={styles.primarySubmitButton}
            status="control"
            size="giant"
            appearance="ghost"
          >
            Submit
          </Button>
        </Layout>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  singOutButton: { top: 0, maxWidth: 100, minWidth: 50, alignSelf: 'center' },
  avatar: {
    width: 150,
    height: 150,
    margin: 8,
  },
  socialAuthContainer: {
    // marginTop: 24,
  },
  skipForNowWrap: {
    marginLeft: 'auto',
    backgroundColor: 'transparent',
    marginVertical: 35,
  },
  skipForNow: {
    height: 20,
    right: 5,
  },
  stepperContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    minHeight: 500,
  },
  inputField: { marginTop: 10, width: wp2dp('85%') },
  dob: {
    backgroundColor: '#F7F9FC',
    borderColor: '#E4E9F2',
    borderRadius: 5,
    borderWidth: 1,
    width: wp2dp('85%'),
    minHeight: 40,
    marginTop: 10,
    marginBottom: 5,
    justifyContent: 'center',
    paddingHorizontal: 8,
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
    width: wp2dp('100%'),
    height: hp2dp('32%'),
  },
  headerElements: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    width: wp2dp('85%'),
    marginBottom: 50,
  },
  bottomContainer: { bottom: 50, alignSelf: 'center' },
  bottomText: { flex: 1, top: 10, flexDirection: 'row', alignSelf: 'center' },
  formContainer: {
    flex: 1,
    // marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 28,
    // minHeight: 450,
    height: hp2dp('30%'),
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
});
