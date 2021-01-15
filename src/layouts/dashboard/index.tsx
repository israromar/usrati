import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Layout,
  Button,
  Icon,
  Text,
  LayoutElement,
  Card,
} from '@ui-kitten/components';
// import * as Progress from 'react-native-progress';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

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

export const Dashboard = ({
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

  const Header = (props) => (
    <View {...props}>
      <Text category='s1'>Maldives</Text>
      <Text category='s1'>By Wikipedia</Text>
    </View>
  );

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
              Parent
            </Text>
            <Text category="h1" status="control">
              Dashboard
            </Text>
          </Layout>
        </View>
      </ImageOverlay>
      <Layout style={styles.childDataWrap}>
        <Layout style={styles.childs} level="1">
          <Layout style={{ backgroundColor: 'transparent', marginLeft: 10, marginTop: 20 }}>
            <Text category="h6" status="control" style={{ color: 'grey' }}>To see the progress</Text>
            <Text category="h1" status="control" style={{ color: 'grey' }}>Select Child</Text>
          </Layout>

          <Layout style={[styles.childsInnerWrap]}>
            <Card style={styles.card} header={Header}>
              <Text>With Header</Text>
            </Card>
            <Card style={styles.card} header={Header}>
              <Text>With Header</Text>
            </Card>
            <Card style={styles.card} header={Header}>
              <Text>With Header</Text>
            </Card>
            <Card style={styles.card} header={Header}>
              <Text>With Header</Text>
            </Card>
            <Card style={styles.card} header={Header}>
              <Text>With Header</Text>
            </Card>
            <Card style={styles.card} header={Header}>
              <Text>With Header</Text>
            </Card>
            <Card style={styles.card} header={Header}>
              <Text>With Header</Text>
            </Card>
            <Card style={styles.card} header={Header}>
              <Text>With Header</Text>
            </Card>
            <Card style={styles.card} header={Header}>
              <Text>With Header</Text>
            </Card>
            <Button
              style={styles.loadMoreButton}
              status="control"
              size="medium"
              appearance="ghost"
            // accessoryLeft={auth?.isLoading && LoadingIndicator}
            >
              Load more
            </Button>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    // flex: 1,
    margin: 2,
    backgroundColor: 'green', height: 100, width: 100
  },
  childDataWrap: {
    top: -110,
    backgroundColor: 'transparent',
    flex: 1,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childs: {
    // flex: 1,
    // backgroundColor: 'red',
    borderColor: 'grey',
    // borderWidth: 1,
    height: hp2dp('65%'),
    width: wp2dp('85%'),
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,

  },
  childsInnerWrap: {
    // flex: 1,
    backgroundColor: 'transparent',
    height: hp2dp('35%'),
    width: wp2dp('80%'),
    display: 'flex', marginVertical: 20, alignSelf: 'center', justifyContent: 'center', flexDirection: 'row',
    flexWrap: 'wrap'
    // borderRadius: 10
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
    minHeight: 220,
    paddingHorizontal: 28,
  },
  headerElements: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: 75,
    marginBottom: 120,
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
  loadMoreButton: {
    marginTop: 30,
    width: '50%',
    height: '10%',
    borderRadius: 5,
    backgroundColor: '#6F99EB',
    alignSelf: 'center'
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
