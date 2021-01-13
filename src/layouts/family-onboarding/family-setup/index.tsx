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
} from '@ui-kitten/components';
// import { validate } from 'validate.js';
// import { useDispatch } from 'react-redux';

import { ImageOverlay } from '../../../components';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { launchCamera as CAMERA, launchImageLibrary as READ_EXTERNAL_STORAGE } from 'react-native-image-picker';
// import { constraints } from '../../../utils/constraints';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import Modal from 'react-native-modal';

import { IFamilySetup, IGuardian } from '../../../containers/family-setup';
import i18n from '../../../translations';
import { logout } from '../../../store/actions/auth.actions';
import StepIndicator from '../../../components/step-indicator';

interface IAddFamilySetup {
  onAddFamilySettings(obj: IFamilySetup): void;
  onAddGuardian(obj: IGuardian): void;
  currentState: {
    family: {
      isAddFamilyFail: boolean;
      isAddFamilySuccess: boolean;
      addFamilyError: string;
    };
  };
}

export const FamilySetup = ({
  onAddFamilySettings,
  onAddGuardian,
  currentState: {
    family: { isAddFamilyFail },
  },
}: IAddFamilySetup): React.ReactElement => {
  // const { navigate } = useNavigation();
  // const dispatch = useDispatch();
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

  // useEffect(() => {
  //   if (isAddFamilyFail) {
  //     console.log('currentState', isAddFamilyFail);

  //     Alert.alert('Adding Family Settings Fail');
  //     // setAddFa(true);
  //     // setUsernameErrorMsg(auth.error);
  //   } else {
  //     Alert.alert('Adding Family Settings Success');
  //     setCurrentPosition(1);
  //   }
  // }, [isAddFamilyFail]);

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
        onAddFamilySettings({
          familyId,
          familyName,
          familyPhoto,
        });
      }
      setFamilyNameError(!familyName);
      setFamilyIdError(!familyId);
    } else {
      if (guardianUsername && guardianPassword) {
        onAddGuardian({
          email: 'test@test.com',
          username: guardianUsername,
          password: guardianPassword,
        });
      }
      setGuardianUsernameError(!guardianUsername);
      setGuardianPasswordError(!guardianPassword);
    }
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
    if (!guardianPassword) {
      setGuardianPasswordErrorMsg('Password cannot be empty');
    }
  }, [guardianUsername, guardianPassword]);

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

  const handleAddChild = (flag: string) => {
    if (
      childName &&
      schoolName &&
      childUsername &&
      childInterest &&
      childPassword
    ) {
      console.log('Go.....');
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

  // const handleSubmit = () => {
  //   console.log('submit');
  // };

  const requestCameraPermission = async (permissionFor: string) => {
    try {
      const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS[permissionFor]);
      return permission;
    } catch (err) {
      console.warn(err);
    }
  };

  const chooseFile = async (mediaType: string, permissionFor: string, mediaTypeInvoker: any) => {
    let options = {
      mediaType,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    const permission = await requestCameraPermission(permissionFor);
    if (permission === 'never_ask_again') {
      Alert.alert(`Go to your app info and enable permission for ${permissionFor}.`);
    }
    if (permission === 'granted') {
      mediaTypeInvoker(options, (response: any) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          console.log('response.errorMessage', response.errorMessage);

          Alert.alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);

        [setFamilyPhoto, setGuardianPhoto, setChildPhoto][currentPosition](response.uri);
      });
    }
  };

  const renderFileUri = (val: string) => {
    if (currentPosition === 0) {
      if (familyPhoto) {
        return <Avatar source={{ uri: familyPhoto }} style={styles.avatar} />;
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
        return <Avatar source={{ uri: guardianPhoto }} style={styles.avatar} />;
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
        return <Avatar source={{ uri: childPhoto }} style={styles.avatar} />;
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
    return (
      <TouchableOpacity
        style={{
          height: 20,
          right: 5,
        }}
      >
        <Text
          style={{
            textDecorationLine: 'underline',
            alignSelf: 'flex-end',
          }}
          category="h7"
          status="info"
        >
          Skip for now
        </Text>
      </TouchableOpacity>
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
              Choose from library
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
            style={{ marginTop: 10 }}
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
            style={{ marginTop: 10 }}
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
          >
            Add
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
            style={{ marginTop: 10 }}
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
            style={{ marginTop: 10 }}
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
          >
            Add
          </Button>
          <Layout
            style={{
              marginLeft: 'auto',
              backgroundColor: 'transparent',
              top: 35,
            }}
          >
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
                style={{ marginTop: 10 }}
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
                style={{ marginTop: 10 }}
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
              <Layout
                style={{
                  marginLeft: 'auto',
                  backgroundColor: 'transparent',
                  marginVertical: 15,
                }}
              >
                {renderSkipForNow()}
              </Layout>
            </>
          )}
          {isNext && (
            <>
              <Input
                style={{ marginTop: 10 }}
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
                style={{ marginTop: 10 }}
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
                style={{ marginTop: 10 }}
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
            onPress={() => handleAddChild(!isNext ? 'Next' : 'Add')}
            style={styles.primarySubmitButton}
            status="control"
            size="giant"
            appearance="ghost"
          >
            {!isNext ? 'Next' : 'Add'}
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
  stepperContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    minHeight: 500,
    // backgroundColor: 'yellow',
  },
  dob: {
    backgroundColor: '#F7F9FC',
    borderColor: '#E4E9F2',
    borderRadius: 5,
    borderWidth: 1,
    minWidth: 337,
    minHeight: 40,
    marginTop: 10,
    marginBottom: 5,
    justifyContent: 'center',
    // alignItems: 'flex-start',
    paddingHorizontal: 8,
    // paddingVertical: 7,
  },
  stretch: {
    height: 200,
    top: -80,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    minHeight: 210,
    paddingHorizontal: 28,
    // marginBottom: 'auto',
  },
  headerElements: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    minWidth: 350,
  },
  bottomContainer: { bottom: 50, alignSelf: 'center' },
  bottomText: { flex: 1, top: 10, flexDirection: 'row', alignSelf: 'center' },
  formContainer: {
    flex: 1,
    top: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 28,
    // backgroundColor: 'red',
    minHeight: 450,
  },
  primarySubmitButton: {
    width: 338,
    top: 20,
    borderRadius: 5,
    backgroundColor: '#6F99EB',
    fontFamily: 'Verdana',
    alignSelf: 'center',
  },
  signUpButton: {
    // marginVertical: 0,
    marginHorizontal: 16,
    borderRadius: 5,
    fontFamily: 'Verdana',
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
