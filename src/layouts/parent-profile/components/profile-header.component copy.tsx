/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Avatar } from '@ui-kitten/components';
import {
    widthPercentageToDP as wp2dp,
    heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

interface IDashboard {
    currentState: {};
    style: {};
    selected: number
}

export const ProfileHeader = ({ selected }: IDashboard) => {
    return (
        <Layout style={[styles.profileHeaderWrap]}>
            <Layout style={selected === 0 ? styles.innerWrap : styles.innerWrapWithChild} level="1">
                <Layout
                    style={{
                        // flex: 0.1,
                        flexDirection: 'row',
                        borderRadius: 10,
                        marginLeft: -30,
                        backgroundColor: 'transparent',
                    }}
                >
                    <Avatar style={{ top: selected === 0 ? -25 : -55, backgroundColor: 'transparent', width: 100, height: 100, padding: 0, margin: 0 }} shape="square" source={require('../../../assets/images/usericon.png')} />
                    <Layout style={{ marginTop: 10, padding: 0, margin: 0 }}>
                        <Text
                            category="h4"
                            status="info"
                            style={{
                                color: 'grey',
                                fontWeight: 'bold',
                            }}
                        >
                            Zhris Hemson
                    </Text>
                        <Text
                            category="h6"
                            status="info"
                            style={{
                                color: 'grey',
                            }}
                        >
                            Parent
                    </Text>
                    </Layout>
                </Layout>
                <Layout
                    style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginVertical: 5,
                        width: wp2dp('70%'),
                    }}
                >
                    <Text
                        category="h6"
                        status="info"
                        style={{
                            color: 'grey',
                        }}
                    >
                        Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since
                        the 1500s,
                    </Text>
                </Layout>
            </Layout>
        </Layout>
    );
};


const styles = StyleSheet.create({
    profileHeaderWrap: {
        display: 'flex',
        marginTop: -hp2dp('15%'),
        alignItems: 'center',
        backgroundColor: 'transparent',

    },
    innerWrap: {
        justifyContent: 'center',
        borderColor: 'grey',
        minHeight: hp2dp('20%'),
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
    innerWrapWithChild: {
        // justifyContent: 'center',
        borderColor: 'grey',
        minHeight: hp2dp('55%'),
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
    childsInnerWrap: {
        backgroundColor: 'transparent',
        // height: hp2dp('100%'),
        width: wp2dp('80%'),
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    avatar: {
        // margin: 8,
        backgroundColor: 'red',
        height: 100,
    },
});
