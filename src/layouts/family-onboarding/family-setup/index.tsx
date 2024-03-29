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
  Keyboard,
} from 'react-native';
import {
  Avatar,
  Layout,
  Button,
  Input,
  Text,
  Calendar,
  Spinner,
  Icon,
} from '@ui-kitten/components';
import { validate } from 'validate.js';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';

import { ImageOverlay } from '../../../components';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { CameraIcon, GalleryIcon } from './extra/icons';
import { launchCamera as CAMERA, launchImageLibrary as READ_EXTERNAL_STORAGE } from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { IAddChild, IAddFamilySetup as IIAddFamilySetup, IAddGuardian } from '../../../containers/family-setup';
import StepIndicator from '../../../components/step-indicator';
import { AppRoute } from '../../../navigation/app-routes';
import constraints from '../../../utils/constraints';
import { colors } from '../../../styles';

interface IAddFamilySetup {
  onAddFamilySettings(obj: IIAddFamilySetup): void;
  onAddGuardian(obj: IAddGuardian): void;
  onAddChild(obj: IAddChild): void;
  onUpdateChild(obj: IAddChild): void;
  onSkipNow: (v: string) => void,
  onSubmit: (v: string) => void,
  onGoBack: () => void,
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
  currentPosition: number,
  rest: object
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
  onUpdateChild,
  onSkipNow,
  onSubmit,
  onGoBack,
  currentState: {
    family: { family, guardian, child },
  },
  currentPosition: pos,
  rest }: IAddFamilySetup): React.ReactElement => {

  const [familyId, setFamilyId] = useState<any>(null);
  const [isAddFamily, setIsAddFamily] = useState<boolean>(false);
  const [isAddGuardian, setIsAddGuardian] = useState<boolean>(false);
  const [isAddChild, setIsAddChild] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAddNew, setIsAddNew] = useState<boolean>(false);

  const [currentPosition, setCurrentPosition] = useState(rest?.route?.params?.currentPosition ?? null);
  const [familyPhoto, setFamilyPhoto] = useState(null);
  const [isFamilyPhotoUpdated, setIsFamilyPhotoUpdated] = useState(false);
  const [isFamilyPhotoDeleted, setIsFamilyPhotoDeleted] = useState(false);
  const [familyName, setFamilyName] = useState<string>('');
  const [familyNameError, setFamilyNameError] = useState<boolean>(false);
  const [familyNameErrorMsg, setFamilyNameErrorMsg] = useState<string>('');

  // guardian state
  const [guardianId, setGuardianId] = useState<any>(null);
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

  const [isNext, setIsNext] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mediaSelectorModalVisible, setMediaSelectorModalVisible] = useState(
    false,
  );
  const [guardianPhoto, setGuardianPhoto] = useState(null);
  const [isGuardianPhotoUpdated, setIsGuardianPhotoUpdated] = useState(false);
  const [isGuardianPhotoDeleted, setIsGuardianPhotoDeleted] = useState(false);

  // Child State
  const [childId, setChildId] = useState<any>(null);
  const [childPhoto, setChildPhoto] = useState(null);
  const [isChildPhotoUpdated, setIsChildPhotoUpdated] = useState(false);
  const [isChildPhotoDeleted, setIsChildPhotoDeleted] = useState(false);
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

  // use effect to get editable data
  useEffect(() => {
    console.log('rest?.route?.params?', rest);

    setIsEdit(rest?.route?.params?.isEdit);
    setIsAddNew(rest?.route?.params?.isAddNew);

    if (rest?.route?.params?.currentPosition) {
      setCurrentPosition(rest?.route?.params?.currentPosition);
    } else if (family?.families?.length === 0) {
      setCurrentPosition(rest?.route?.params?.currentPosition ?? 0);
    }

    // setCurrentPosition(rest?.route?.params?.currentPosition ?? 0);


    if (rest?.route?.params?.isAddNew && !isAddChild) {
      //reset child form
      setChildPhoto(null);
      setChildName('');
      setDate(new Date('Jan 01, 2010 00:20:18'));
      setSchoolName('');
      setChildInterest('');
      setChildUsername('');
      setChildPassword('');
      // setIsAddChild(false);
      setIsNext(false);

      //reset guardian form
      setGuardianPhoto(null);
      setGuardianUsername('');
      setGuardianEmail('');
      setGuardianPassword('');
      // setIsAddGuardian(false);

      // reset family form
      setFamilyName('');
      setFamilyPhoto(null);
    }

    if (childId !== rest?.route?.params?.childData?.id && rest?.route?.params?.isEdit) {
      setChildId(rest?.route?.params?.childData?.id ?? 0);
      if (rest?.route?.params?.isAddNew) {
        setDate(new Date('Jan 01, 2010 00:20:18'));
      } else {
        setDate(new Date(rest?.route?.params?.childData?.dob));
      }
      setChildPhoto(rest?.route?.params?.childData?.photo);
      setChildName(rest?.route?.params?.childData?.name);
      setSchoolName(rest?.route?.params?.childData?.schoolname);
      setChildInterest(rest?.route?.params?.childData?.interest);
      setChildUsername(rest?.route?.params?.childData?.username);
      setChildPassword(rest?.route?.params?.childData?.password ?? '');
    }

    if (guardianId !== rest?.route?.params?.guardianData?.id && rest?.route?.params?.isEdit) {
      setGuardianId(rest?.route?.params?.guardianData?.id);
      setGuardianPhoto(rest?.route?.params?.guardianData?.photo);
      setGuardianUsername(rest?.route?.params?.guardianData?.username);
      setGuardianEmail(rest?.route?.params?.guardianData?.email);
      setGuardianPassword(rest?.route?.params?.guardianData?.password);
    }

    if (familyId !== rest?.route?.params?.familyData?.id && rest?.route?.params?.isEdit) {
      setCurrentPosition(rest?.route?.params?.currentPosition ?? 0);
      setFamilyId(rest?.route?.params?.familyData?.id);
      setFamilyName(rest?.route?.params?.familyData?.name);
      setFamilyPhoto(rest?.route?.params?.familyData?.photo);
    }

  }, [rest]);

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

  const afterSuccessAlert = (flag: string, msg: string) => {
    Alert.alert(
      'Success',
      msg,
      [
        {
          text: 'YES', onPress: () => {
            if (flag === 'guardian') {
              setCurrentPosition(1);
              setGuardianPhoto(null);
              setGuardianUsername('');
              setGuardianEmail('');
              setGuardianPassword('');
              setIsAddGuardian(false);
            } else {
              setCurrentPosition(2);
              setChildPhoto(null);
              setChildName('');
              setDate(new Date('Jan 01, 2010 00:20:18'));
              setSchoolName('');
              setChildInterest('');
              setChildUsername('');
              setChildPassword('');
              setIsAddChild(false);
              setIsNext(false);
            }
          },
        },
        {
          text: 'NO',
          onPress: () => {
            if (flag === 'guardian') {
              if (isEdit || isAddNew) {
                onGoBack();
              } else {
                setCurrentPosition(2);
              }
              setGuardianPhoto(null);
              setGuardianUsername('');
              setGuardianEmail('');
              setGuardianPassword('');
              setIsAddGuardian(false);
            } else {
              if (isEdit && isAddNew) {
                onGoBack();
              } else {
                setCurrentPosition(3);
              }
              setChildPhoto(null);
              setChildName('');
              setDate(new Date('Jan 01, 2010 00:20:18'));
              setSchoolName('');
              setChildInterest('');
              setChildUsername('');
              setChildPassword('');
              setIsAddChild(false);
            }
          },
          style: 'cancel',
        },

      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    if (familyNameError) {
      setFamilyNameError(true);
      setFamilyNameErrorMsg('Family name cannot be empty.');
    }
  }, [familyNameError]);

  useEffect(() => {
    if (isAddFamily && !family?.isAddingFamily && family?.isAddFamilySuccess && !family?.isAddFamilyFail) {
      Toast.showWithGravity('Family successfully added.', Toast.LONG, Toast.CENTER);

      if (!isEdit) {
        setCurrentPosition(1);
      }
      setFamilyName('');
      setFamilyPhoto(null);
      setIsAddFamily(false);
    }
    if (isAddFamily && !family?.isUpdatingFamily && family?.isUpdateFamilySuccess && !family?.isUpdateFamilyFail) {
      Toast.showWithGravity('Family successfully updated.', Toast.LONG, Toast.CENTER);

      if (!isEdit) {
        setCurrentPosition(1);
      } else {
        setFamilyId(null);
        onGoBack();
      }
      setFamilyName('');
      setFamilyPhoto(null);
      setIsAddFamily(false);
    }
    if (isAddFamily && !family?.isUpdatingFamily && !family?.isUpdateFamilySuccess && family?.isUpdateFamilyFail) {
      Alert.alert(family?.updateFamilyError);
      setIsAddFamily(false);
      // setCurrentPosition(0);
      if (!isEdit) {
        setCurrentPosition(0);
      }
    }

    // GUARDIAN
    if (isAddGuardian && !guardian?.isAddingGuardian && guardian?.isAddGuardianSuccess && !guardian?.isAddGuardianFail) {
      afterSuccessAlert('guardian', 'Guardian successfully added, do you want to add another one?');
    }
    if (isAddGuardian && !guardian?.isAddingGuardian && !guardian?.isAddGuardianSuccess && guardian?.isAddGuardianFail) {
      Alert.alert(guardian.addGuardianError);
      setIsAddGuardian(false);
      setCurrentPosition(1);
      if (!isEdit) {
        setCurrentPosition(1);
      }
    }
    if (isAddGuardian && !guardian?.isUpdatingGuardian && guardian?.isUpdateGuardianSuccess && !guardian?.isUpdateGuardianFail) {
      Toast.showWithGravity('Guardian successfully updated.', Toast.LONG, Toast.CENTER);
      if (!isEdit) {
        setCurrentPosition(1);
      } else {
        setFamilyId(null);
        onGoBack();
      }
      setFamilyName('');
      setFamilyPhoto(null);
      setIsAddFamily(false);
    }

    if (isAddGuardian && !guardian?.isUpdatingGuardian && !guardian?.isUpdateGuardianSuccess && guardian?.isUpdateGuardianFail) {
      Alert.alert('Updating guardian failed, something went wrong!');
      // if (!isEdit) {
      //   setCurrentPosition(1);
      // } else {
      // setFamilyId(null);
      // onGoBack();
      // }
      // setFamilyName('');
      // setFamilyPhoto(null);
      setIsAddFamily(false);
    }


    if (isAddChild && !child?.isAddingChild && child?.isAddChildSuccess && !child?.isAddChildFail) {
      afterSuccessAlert('child', 'Child successfully added, do you want to add another one?');
    }
      if (isEdit && !child?.isUpdatingChild && child?.isUpdateChildSuccess && !child?.isUpdateChildFail) {
        Toast.showWithGravity('Child successfully updated.', Toast.LONG, Toast.CENTER);
        setChildId(null);
        setChildPhoto(null);
        setChildName('');
        setDate(new Date('Jan 01, 2010 00:20:18'));
        setSchoolName('');
        setChildInterest('');
        setChildUsername('');
        setChildPassword('');
        setIsAddChild(false);
        setIsNext(false);
        setIsEdit(false);
        onGoBack();
    }

    if (isAddChild && !child?.isAddingChild && !child?.isAddChildSuccess && child?.isAddChildFail) {
      Alert.alert(child?.addChildError);
      if (child?.addChildError === 'Username already in use') {
        setChildUsernameError(true);
        setChildUsernameErrorMsg('Username already in use');
      }
      setIsAddChild(false);
      if (!isEdit) {
        setCurrentPosition(2);
      }
      // setCurrentPosition(2);
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
      Keyboard.dismiss();
      if (familyName) {
        setIsAddFamily(true);
        if (isEdit) {
          onAddFamilySettings({ id: familyId, familyName, familyPhoto: isFamilyPhotoUpdated ? familyPhoto : null, isFamilyPhotoDeleted, flag: 'edit' });
        } else {
          onAddFamilySettings({ id: 0, familyName, familyPhoto, isFamilyPhotoDeleted, flag: 'add' });
        }
      }

      setFamilyNameError(!familyName);
    } else {
      Keyboard.dismiss();
      const validationResult = validate({ username: guardianUsername, email: guardianEmail, password: guardianPassword }, constraints);
      if (validationResult?.username) {
        setGuardianUsernameError(true);
        setGuardianUsernameErrorMsg(validationResult?.username[0]);
        return;
      }
      if (validationResult?.email) {
        setGuardianEmailError(true);
        setGuardianEmailErrorMsg(validationResult?.email[0]);
        return;
      }
      if (validationResult?.password) {
        setGuardianPasswordError(true);
        setGuardianPasswordErrorMsg(validationResult?.password[0]);
        return;
      } else {
        setIsAddGuardian(true);
        onAddGuardian({
          id: guardianId,
          photo: guardianPhoto,
          email: guardianEmail,
          username: guardianUsername,
          password: guardianPassword,
          isGuardianPhotoDeleted,
          flag: isEdit ? 'edit' : 'add',
        });
      }
    }
  };

  const handleAddChild = async (flag: string) => {
    if (flag === 'Next') {
      const validationResult = validate({ name: childName, schoolName: schoolName }, constraints);
      if (validationResult?.name) {
        setChildNameError(true);
        setChildNameErrorMsg(validationResult?.name[0]);
      }
      if (validationResult?.schoolName) {
        setSchoolNameError(true);
        setSchoolNameErrorMsg(validationResult?.schoolName[0]);
      } else if (!childNameError && !schoolNameError) {
        setIsNext(!!childName && !!schoolName);
        return;
      }
    } else {
      Keyboard.dismiss();
      const validationResult = validate({ interest: childInterest, username: childUsername, password: childPassword }, constraints);
      if (validationResult?.interest) {
        setChildInterestError(true);
        setChildInterestErrorMsg(validationResult?.interest[0]);
        return;
      }
      if (validationResult?.username) {
        setChildUsernameError(true);
        setChildUsernameErrorMsg(validationResult?.username[0]);
        return;
      }
      if (validationResult?.password) {
        setChildPasswordError(true);
        setChildPasswordErrorMsg(validationResult?.password[0]);
        return;
      }

      if (
        flag === 'Add' &&
        !childNameError &&
        !schoolNameError &&
        !childUsernameError &&
        !childInterestError &&
        !childPasswordError &&
        !isEdit || undefined && isAddNew || undefined
      ) {
        setIsAddChild(true);
        onAddChild({ id: 0, photo: childPhoto, childName, dob: date, schoolName, interest: childInterest, username: childUsername, password: childPassword });
      } else if (
        flag === 'Add' &&
        !childNameError &&
        !schoolNameError &&
        !childUsernameError &&
        !childInterestError &&
        !childPasswordError &&
        isEdit && !isAddNew
      ) {
        onUpdateChild({ id: childId, photo: isChildPhotoUpdated ? childPhoto : null, childName, dob: date, schoolName, interest: childInterest, username: childUsername, password: childPassword, isChildPhotoDeleted });
      }
    }
  };

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
          if (!response?.didCancel) {
            [setFamilyPhoto, setGuardianPhoto, setChildPhoto][currentPosition](response);
            [setIsFamilyPhotoUpdated, setIsGuardianPhotoUpdated, setIsChildPhotoUpdated][currentPosition](true);
          }
        });
      }
    } catch (e) {
      console.log('error oc', e);
    }
  };

  const handleRemovePhoto = () => {
    [setFamilyPhoto, setGuardianPhoto, setChildPhoto][currentPosition](null);
    [setIsFamilyPhotoDeleted, setIsGuardianPhotoDeleted, setIsChildPhotoDeleted][currentPosition](true);
  };

  const profileCameraIcon = () => {
    return (
      <Layout style={[styles.photoIcons]}>
        <TouchableOpacity onPress={() => setMediaSelectorModalVisible(true)}>
          <Icon
            style={styles.icon}
            fill="#8F9BB3"
            name={'camera-outline'}
          />
        </TouchableOpacity>
      </Layout>

    );
  };

  const profileEditIcons = () => {
    return (
      <>
        <Layout style={[styles.photoIcons, { bottom: 72 }]}>
          <TouchableOpacity onPress={() => handleRemovePhoto()}>
            <Icon
              style={styles.icon}
              fill="#8F9BB3"
              name={'trash-2-outline'}
            />
          </TouchableOpacity>
        </Layout>

        <Layout style={styles.photoIcons}>
          <TouchableOpacity onPress={() => setMediaSelectorModalVisible(true)}>
            <Icon
              style={styles.icon}
              fill="#8F9BB3"
              name={'edit-outline'}
            />
          </TouchableOpacity>
        </Layout>
      </>
    );
  };

  const renderFileUri = () => {
    if (currentPosition === 0) {
      if (familyPhoto) {
        return <Layout><Avatar source={{ uri: familyPhoto?.uri ? familyPhoto?.uri : familyPhoto }} style={styles.avatar} />{profileEditIcons()}</Layout>;
      } else {
        return (
          <Layout>
            <Avatar
              source={require('./assets/guardian-avatar.png')}
              style={styles.avatar}
            />
            {profileCameraIcon()}
          </Layout>
        );
      }
    } else if (currentPosition === 1) {
      if (guardianPhoto) {
        return (
          <Layout>
            <Avatar source={{ uri: guardianPhoto?.uri ? guardianPhoto?.uri : guardianPhoto }} style={styles.avatar} />
            {profileEditIcons()}
          </Layout>
        );
      } else {
        return (
          <Layout>
            <Avatar
              source={require('./assets/guardian-avatar.png')}
              style={styles.avatar}
            />
            {profileCameraIcon()}
          </Layout>
        );
      }
    } else if (currentPosition === 2) {

      if (childPhoto) {
        return (
          <Layout>
            <Avatar source={{ uri: childPhoto?.uri ? childPhoto?.uri : childPhoto }} style={styles.avatar} />
            {profileEditIcons()}
          </Layout>
        );
      } else {
        return (
          <Layout>
            <Avatar
              source={require('./assets/child-avatar.png')}
              style={styles.avatar}
            />
            {profileCameraIcon()}
          </Layout>
        );
      }
    }
  };

  const renderSkipForNow = () => {

    const handleOnSkip = () => {
      currentPosition === 1 ? setCurrentPosition(2) : onSkipNow(AppRoute.DASHBOARD);
    };
    if (isEdit) {
      return;
    } else if (isAddNew) {
      return;
    } else {
      return (
        <TouchableOpacity
          style={styles.skipForNowView}
          onPress={handleOnSkip}
        >
          <Text
            style={styles.skipForNowText}
            appearance="default"
            category="h6"
            status="info"
          >
            Skip for now
      </Text>
        </TouchableOpacity >
      );
    }
  };

  const RenderModal = () => {
    return (
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
              accessoryRight={GalleryIcon}
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
              accessoryRight={CameraIcon}
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
    );
  };

  const RenderHeaderImageOverlay = () => {
    return (
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../../assets/images/vector.png')}
      >
        <Layout
          style={{
            backgroundColor: 'transparent',
            alignSelf: 'flex-start',
            justifyContent: 'center',
            // minHeight: 50,
          }}
        />
        <Layout
          style={[
            styles.headerElements,
            { bottom: currentPosition === 3 ? 0 : 20 },
          ]}
        >
          <Text style={{ alignSelf: 'center' }} category="h1" status="control">
            Family Setup
        </Text>
          {isAddNew ? <Layout /> : isEdit ? <Layout /> : currentPosition !== 3 && (
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
    );
  };

  const RenderAddFamilyForm = () => {
    if (currentPosition === 0) {
      return (
        <Layout style={styles.formContainer}>
          <Text
            style={{ alignSelf: 'center', color: 'grey' }}
            category="h1"
            status="control"
          >
            Family Setting
          </Text>
          {renderFileUri()}
          <Input
            style={styles.inputField}
            value={familyName}
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
          <Button
            onPress={() => handleAddFamilySetup(1)}
            style={styles.primarySubmitButton}
            status="control"
            size="giant"
            appearance="ghost"
            accessoryLeft={isAddFamily && LoadingIndicator}
          >
            {isAddFamily ? '' : isEdit && !isAddNew ? 'Update' : 'Add'}
          </Button>
        </Layout>
      );
    }
  };

  const RenderAddGuardianForm = () => {
    if (currentPosition === 1) {
      return (
        <Layout style={styles.formContainer}>
          <Text
            style={{ alignSelf: 'center', color: 'grey' }}
            category="h1"
            status="control"
          >
            Guardian
          </Text>
          {renderFileUri()}
          <Input
            style={styles.inputField}
            value={guardianUsername}
            caption={guardianUsernameError ? guardianUsernameErrorMsg : ''}
            status={guardianUsernameError ? 'danger' : 'basic'}
            placeholder="Username"
            disabled={!isAddNew && isEdit}
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
            value={guardianEmail?.trim()}
            caption={guardianEmailError ? guardianEmailErrorMsg : ''}
            status={guardianEmailError ? 'danger' : 'basic'}
            placeholder="Email"
            onChangeText={(nextValue) => {
              setGuardianEmail(nextValue?.trim());
              setGuardianEmailError(false);
            }
            }
          />
          <Input
            style={styles.inputField}
            value={guardianPassword?.trim()}
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
            accessoryLeft={guardian?.isAddingGuardian ? LoadingIndicator : guardian?.isUpdatingGuardian ? LoadingIndicator : ''}
          >
            {guardian.isAddingGuardian || guardian?.isUpdatingGuardian ? '' : isEdit && !isAddNew ? 'Update' : 'Add'}
          </Button>
          <Layout style={styles.skipForNowWrap}>
            {renderSkipForNow()}
          </Layout>
        </Layout>
      );
    }
  };

  const RenderAddChildForm = () => {
    if (currentPosition === 2) {
      return (
        <Layout style={styles.formContainer}>
          <Text
            style={{ alignSelf: 'center', color: 'grey' }}
            category="h1"
            status="control"
          >
            Child
        </Text>
          {renderFileUri()}
          {!isNext && (
            <>
              <Input
                style={styles.inputField}
                value={childName}
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
                isVisible={visible}
                onBackdropPress={() => setVisible(false)}
                style={{ alignSelf: 'center' }}
                animationIn={'slideInUp'}
                onBackButtonPress={() => setVisible(false)}
              >
                <Calendar
                  style={{ backgroundColor: '#fff' }}
                  min={new Date('January 01, 2000 00:20:18')}
                  date={date ?? new Date('Jan 01, 2010 00:20:18')}
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
                    // color: dateSelected ? '#111' : '#A9A9A9',
                    color: '#111',
                    fontSize: 15,
                  }}
                >
                  Date of birth : {date && date?.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              <Input
                style={styles.inputField}
                value={schoolName}
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
                value={childUsername?.trim()}
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
                value={childPassword?.trim()}
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
            accessoryLeft={child?.isAddingChild ? LoadingIndicator : child?.isUpdatingChild ? LoadingIndicator : ''}
            // accessoryLeft={child?.isAddingChild && isAddChild && LoadingIndicator}
          >
            {/* {child.isAddingChild && isAddChild ? '' : !isNext ? 'Next' : isEdit && !isAddNew ? 'Update' : 'Add'} */}
            {child.isAddingChild || child?.isUpdatingChild ? '' : !isNext ? 'Next' : isEdit && !isAddNew ? 'Update' : 'Add'}

          </Button>
          <Layout style={styles.skipForNowWrap}>
            {renderSkipForNow()}
          </Layout>
        </Layout>
      );
    }
  };

  const RenderHorizontalStepper = () => {
    if (currentPosition === 3) {
      return (
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
            Go to Dashboard
               </Button>
        </Layout>
      );
    }
  };

  return (
    <KeyboardAvoidingView keyboardShouldPersistTaps={'handled'} style={{ flex: 1, backgroundColor: '#fff' }}>
      {RenderModal()}
      {RenderHeaderImageOverlay()}
      {RenderAddFamilyForm()}
      {RenderAddGuardianForm()}
      {RenderAddChildForm()}
      {RenderHorizontalStepper()}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  photoIcons: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, position: 'absolute',
    borderColor: colors.primaryBlue, borderWidth: 0.5, borderRadius: 50, width: 30, height: 30, bottom: 35, right: 1, zIndex: 2,
  },
  icon: { padding: 0, width: 20, height: 20 },
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
  skipForNowView: {
    height: 20,
    right: 5,
  },
  skipForNowText:
  {
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    fontSize: 15,
  },
  stepperContainer: {
    alignSelf: 'center',
    // justifyContent: 'center',
    minHeight: hp2dp('50%'),
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
    marginBottom: 4,
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
});
