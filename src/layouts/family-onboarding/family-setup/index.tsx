/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
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
import { useDispatch } from 'react-redux';

import { ImageOverlay } from '../../../components';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { constraints } from '../../../utils/constraints';
import { TouchableOpacity } from 'react-native-gesture-handler';

import i18n from '../../../translations';
import { logout } from '../../../store/actions/auth.actions';
import StepIndicator from '../../../components/step-indicator';

interface IFamilySetup {
  onAddFamilySettings(obj: {
    familyId: string;
    familyName: string;
    familyPhoto: string;
  }): void;
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
  currentState: {
    family: { isAddFamilyFail },
  },
}: IFamilySetup): React.ReactElement => {
  // const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = useState(2);
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');

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

  const handleAddFamilySetup = async (position: number): Promise<void> => {
    console.log('family name: ', guardianUsername, !guardianUsername);

    if (position === 1) {
      if (familyId && familyName) {
        // setCurrentPosition(position);
        onAddFamilySettings({
          familyId,
          familyName,
          familyPhoto,
        });
      } else if (familyName === '') {
        setFamilyNameError(true);
        setFamilyNameErrorMsg('Family name cannot be empty');
      }
    } else if (position === 2) {
      if (guardianUsername && guardianPassword) {
        // setCurrentPosition(position);
        onAddFamilySettings({
          familyId,
          familyName,
          familyPhoto,
        });
      } else if (guardianUsername === '' && guardianPassword === '') {
        setGuardianUsernameError(!guardianUsername);
        setGuardianPasswordError(!guardianPassword);
        setGuardianUsernameErrorMsg('Username cannot be empty');
        setGuardianPasswordErrorMsg('Password cannot be empty');
      } else if (guardianUsername === '') {
        setGuardianUsernameError(!guardianUsername);
        setGuardianUsernameErrorMsg('Username cannot be empty');
      } else if (guardianPassword === '') {
        setGuardianPasswordError(!guardianPassword);
        setGuardianPasswordErrorMsg('Password cannot be empty');
      }
    }
  };

  const onSignOutPress = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!childName) {
      setChildNameErrorMsg('Name cannot be empty');
    }
    if (!schoolName) {
      setSchoolNameErrorMsg('School name cannot be empty');
    }
    if (childInterestError) {
      setChildInterestErrorMsg('Interests cannot be empty');
    }
    if (!childUsername) {
      setChildUsernameErrorMsg('Username cannot be empty');
    }
    if (!childPassword) {
      setChildPasswordErrorMsg('Password cannot be empty');
    }
  }, [
    isNext,
    childInterest,
    childInterestError,
    childName,
    childNameError,
    childPassword,
    childUsername,
    schoolName,
    schoolNameError,
  ]);

  const handleAddChild = () => {
    setChildNameError(!childName);
    setSchoolNameError(!schoolName);
    setChildInterestError(!childInterest);
    setChildUsernameError(!childUsername);
    setChildPasswordError(!childPassword);
    setIsNext(!!childName && !!schoolName);
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  const chooseFile = (type: string, imageSetter: () => any) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response: any) => {
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
      imageSetter(response.uri);
    });
  };

  const renderFileUri = (val) => {
    if (val === 'family') {
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
    } else if (val === 'guardian') {
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
          category="h6"
          status="info"
        >
          Skip for now
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView style={{ backgroundColor: '#fff' }}>
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
          <TouchableOpacity onPress={() => chooseFile('photo', setFamilyPhoto)}>
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
          <TouchableOpacity
            onPress={() => chooseFile('photo', setGuardianPhoto)}
          >
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
          <TouchableOpacity onPress={() => chooseFile('photo', setChildPhoto)}>
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
                value={childInterest.trim()}
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
            onPress={handleAddChild}
            style={styles.primarySubmitButton}
            status="control"
            size="giant"
            appearance="ghost"
          >
            {!isNext ? 'Next' : 'Add'}
          </Button>
        </Layout>
      )}
      {currentPosition !== 2 && (
        <Layout style={styles.bottomContainer}>
          <TouchableOpacity onPress={onSignOutPress}>
            <Button style={styles.singOutButton} appearance="outline">
              {i18n.t('home.signOut')}
            </Button>
          </TouchableOpacity>
        </Layout>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
