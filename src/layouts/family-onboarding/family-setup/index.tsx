/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
// import { validate } from 'validate.js';
import { useDispatch } from 'react-redux';

import { ImageOverlay } from '../../../components';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { constraints } from '../../../utils/constraints';
import { TouchableOpacity } from 'react-native-gesture-handler';

import i18n from '../../../translations';
import { logout } from '../../../store/actions/auth.actions';

// interface ISi-gnIn {
//   FamilySetup(obj: IPropsSignIn): void;
// }
import StepIndicator from '../../../components/step-indicator';

export const FamilySetup = ({ onAddFamilySettings }): React.ReactElement => {
  // const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = useState(0);
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');

  const [familyPhoto, setFamilyPhoto] = useState('8RGj78Td-/image.png');
  const [familyName, setFamilyName] = useState<string>('');
  const [familyNameError, setFamilyNameError] = useState<boolean>(false);
  const [familyNameErrorMsg, setFamilyNameErrorMsg] = useState<string>('');

  const [familyId, setFamilyId] = useState<string>('Id-112');
  const [familyIdError, setFamilyIdError] = useState<boolean>(false);
  const [familyIdErrorMsg, setFamilyIdErrorMsg] = useState<string>('');

  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [isNext, setIsNext] = useState(false);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date('Jan 01, 2010 00:20:18'));
  const [dateSelected, setDateSelected] = useState(false);
  const [filePath, setFilePath] = useState(null);
  const [guardianImage, setGuardianImage] = useState(null);
  const [childImage, setChildImage] = useState(null);

  const handleFamilySettingInput = (
    inputField: (v: React.SetStateAction<string>) => void,
    inputFieldError: (v: boolean) => void,
    value: React.SetStateAction<string>,
  ) => {
    inputField(value.trim());
    inputFieldError(false);
  };

  const handleAddFamilySetup = async (position: number): void => {
    if (familyId && familyName) {
      console.log('qweqweqwe', familyId, 'qweqweqwe', familyName);

      // setCurrentPosition(position);
      const a = await onAddFamilySettings({
        familyId,
        familyName,
        familyPhoto,
      });
      console.log(
        '🚀 ~ file: index.tsx ~ line 88 ~ handleAddFamilySetup ~ a',
        a,
      );
    } else if (familyName === '') {
      console.log('errorrr', familyId, 'errorrr', familyName);
      setFamilyNameError(true);
      setFamilyNameErrorMsg('Cannot be empty!');
    }
    // navigate(AppRoute.ADD_CHILD);
  };

  const onSignOutPress = () => {
    dispatch(logout());
  };

  const handleAddChild = (flag) => {
    if (flag === 'Next') {
      setIsNext(true);
    } else {
      // setIsNext(false);
      setCurrentPosition(3);
    }
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

  console.log('sdasdasd', filePath);

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
      if (guardianImage) {
        return <Avatar source={{ uri: guardianImage }} style={styles.avatar} />;
      } else {
        return (
          <Avatar
            source={require('./assets/guardian-avatar.png')}
            style={styles.avatar}
          />
        );
      }
    } else if (val === 'child') {
      if (childImage) {
        return <Avatar source={{ uri: childImage }} style={styles.avatar} />;
      } else {
        return (
          <Avatar
            source={require('./assets/child-avatar.png')}
            style={styles.avatar}
          />
        );
      }
    }
    // if (filePath?.uri) {
    //   return <Avatar source={{ uri: filePath?.uri }} style={styles.avatar} />;
    // } else {
    //   return (
    //     <Avatar
    //       source={require('./assets/guardian-avatar.png')}
    //       style={styles.avatar}
    //     />
    //   );
    // }
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
                onStepPress={() => { }}
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
            onPress={() => chooseFile('photo', setGuardianImage)}
          >
            {renderFileUri('guardian')}
          </TouchableOpacity>
          <Input
            style={{ marginTop: 10 }}
            value={guardianUsername.trim()}
            caption={guardianUsernameError ? guardianUsernameErrorMsg : ''}
            status={guardianUsernameError ? 'danger' : 'basic'}
            placeholder="User name"
            onChangeText={(nextValue) =>
              handleFamilySettingInput(setGuardianUsername, nextValue)
            }
          />
          <Input
            style={{ marginTop: 10 }}
            value={password.trim()}
            caption={familyIdError ? familyIdErrorMsg : ''}
            status={familyIdError ? 'danger' : 'basic'}
            placeholder="Password"
            onChangeText={(nextValue) =>
              handleFamilySettingInput('familyId', nextValue)
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
          <TouchableOpacity onPress={() => chooseFile('photo', setChildImage)}>
            {renderFileUri('child')}
          </TouchableOpacity>
          {!isNext && (
            <>
              <Input
                style={{ marginTop: 10 }}
                value={name.trim()}
                // caption={emailError ? emailErrorMsg : ''}
                // status={emailError ? 'danger' : 'basic'}
                placeholder="Name"
                onChangeText={(nextValue) =>
                  handleFamilySettingInput('email', nextValue)
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
                value={shoolName.trim()}
                // caption={passwordError ? passwordErrorMsg : ''}
                // status={passwordError ? 'danger' : 'basic'}
                placeholder="School name"
                secureTextEntry={secureTextEntry}
                onChangeText={(nextValue) =>
                  handleFamilySettingInput('password', nextValue)
                }
              />
            </>
          )}
          {isNext && (
            <>
              <Input
                style={{ marginTop: 10 }}
                value={interest.trim()}
                // caption={passwordError ? passwordErrorMsg : ''}
                // status={passwordError ? 'danger' : 'basic'}
                placeholder="Interest"
                secureTextEntry={secureTextEntry}
                onChangeText={(nextValue) =>
                  handleFamilySettingInput('password', nextValue)
                }
              />
              <Input
                style={{ marginTop: 10 }}
                value={username.trim()}
                // caption={passwordError ? passwordErrorMsg : ''}
                // status={passwordError ? 'danger' : 'basic'}
                placeholder="Username"
                secureTextEntry={secureTextEntry}
                onChangeText={(nextValue) =>
                  handleFamilySettingInput('password', nextValue)
                }
              />
              <Input
                style={{ marginTop: 10 }}
                value={password.trim()}
                // caption={passwordError ? passwordErrorMsg : ''}
                // status={passwordError ? 'danger' : 'basic'}
                placeholder="Password"
                secureTextEntry={secureTextEntry}
                onChangeText={(nextValue) =>
                  handleFamilySettingInput('password', nextValue)
                }
              />
            </>
          )}
          <Button
            onPress={() => {
              handleAddChild(!isNext ? 'Next' : 'Add');
            }}
            style={styles.primarySubmitButton}
            status="control"
            size="giant"
            appearance="ghost"
          >
            {!isNext ? 'Next' : 'Add'}
          </Button>
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
      {currentPosition !== 3 && (
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
