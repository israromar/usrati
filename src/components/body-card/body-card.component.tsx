/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { ArrowForward } from '../icons/icons.component';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { colors } from '../../styles';
import i18n from '../../translations';

interface IProfileBodyCard {
  item: { id: number, text: string, icon: string}
  onPressItem: (i: number) => void
}

const BodyCard = ({ item, onPressItem }: IProfileBodyCard) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPressItem(item.id)}>
      <Layout style={styles.bodyWrap}>
        <Layout style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <MaterialIcon style={styles.icon} name={item.icon} size={40} color={colors.primaryBlue} />
          <Text
            category="h4"
            status="info"
            style={styles.text}
          >
            {i18n.t(`parentProfile.${item.text}`)}
          </Text>
        </Layout>
        <Layout>
          <ArrowForward />
        </Layout>
      </Layout>
    </TouchableWithoutFeedback >
  );
};

export default BodyCard;

const styles = StyleSheet.create({
  bodyWrap: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'grey',
    minHeight: hp2dp('10%'),
    width: wp2dp('85%'),
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  text: {
    color: 'grey',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  icon: {
    left: -22,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primaryBlue,
    padding: 2,
  },
  innerWrap: {
    justifyContent: 'center',
    borderColor: 'grey',
    minHeight: hp2dp('20%'),
    width: wp2dp('85%'),
    borderRadius: 10,
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
    // height: hp2dp('100%'),
    width: wp2dp('80%'),
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  avatar: {
    // margin: 8,
    height: 100,
  },
});
