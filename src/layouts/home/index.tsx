import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Layout,
  Button,
  Icon,
  Text,
  Radio,
  RadioGroup,
  LayoutElement,
} from '@ui-kitten/components';
import * as Progress from 'react-native-progress';

import i18n from '../../translations';
import ToggleButton, {
  IToggleButton,
} from '../../components/toggle-button.component';
import { ImageOverlay } from '../../components';

const SignoutIcon = (props: any) => <Icon {...props} name="log-out-outline" />;

interface IHome {
  onThemeToggle: () => void;
  onSignOutPress: () => void;
  handleLocaleChange: () => void;
  selectedIndex: number;
  languages: [];
}

export const Home = ({
  activeTheme,
  onThemeToggle,
  checked,
  onSignOutPress,
  handleLocaleChange,
  selectedIndex,
  languages,
  ...rest
}: IHome & IToggleButton & LayoutElement) => {
  const hanldeBackPress = () => {
    // rest.goBack();
  };

  return (
    <Layout style={styles.container}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../assets/images/vector.png')}
      >
        <View style={styles.headerElements}>
          <TouchableOpacity onPress={hanldeBackPress}>
            <Image source={require('../../assets/images/backarrow.png')} />
          </TouchableOpacity>
          <Layout style={{ backgroundColor: 'none', top: 20, left: 15 }}>
            <Text category="h5" status="control">
              Child
            </Text>
            <Text category="h1" status="control">
              Dashboard
            </Text>
          </Layout>
        </View>
      </ImageOverlay>
      <Layout style={styles.progressWrap}>
        <Layout style={styles.progressCard}>
          <Text>Progress</Text>
          {/* <Progress.Bar progress={0.3} width={200} /> */}
          <Progress.Pie progress={0.4} size={50} />
        </Layout>
        <Layout style={styles.progressCard}>
          <Layout>
            <Text>Physics</Text>
          </Layout>
          <Layout>
            <Text>Exercise</Text>
          </Layout>
          <Layout>
            <Text>Prayers</Text>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  progressWrap: {
    flex: 1,
    backgroundColor: 'green',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCard: {
    top: 40,
    backgroundColor: 'yellow',
    height: 314,
    width: 359,
    borderRadius: 10,
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
    minHeight: 210,
    paddingHorizontal: 28,
    backgroundColor: 'blue',
  },
  headerElements: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: 75,
    bottom: 40,
  },
  bottomContainer: { flex: 1, top: 102, alignSelf: 'center' },
  bottomText: { flex: 1, top: 10, flexDirection: 'row', alignSelf: 'center' },
  formContainer: {
    flex: 1,
    // position: 'relative',
    // zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  signInButton: {
    width: 338,
    borderRadius: 5,
    marginHorizontal: 28,
    backgroundColor: '#6F99EB',
    fontFamily: 'Verdana',
  },
  signUpButton: {
    marginVertical: 0,
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
