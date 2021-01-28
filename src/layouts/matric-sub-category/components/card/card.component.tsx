import { Avatar, Layout } from '@ui-kitten/components';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Card({ matric, idx }) {
    return (
        <Layout key={idx + 1} style={[styles.metrics]} level="1">
            <Layout
                style={{
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                }}
            >
                <Avatar
                    // source={{ uri: matric?.photo }}
                    source={
                        matric?.photo
                            ? { uri: matric?.photo }
                            : require('./assets/guardian-avatar.png')
                    }
                    style={{
                        height: 60,
                        width: 60,
                    }}
                />
                <Layout
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        paddingLeft: 5,
                    }}
                >
                    <Layout
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text
                            style={{ textTransform: 'uppercase' }}
                            category="h4"
                            status="control"
                        >
                            {matric.title}
                        </Text>
                        <Text category="h5" status="control">
                            {matric.weightage}%
            </Text>
                    </Layout>
                    <Layout
                        style={{
                            backgroundColor: 'transparent',
                        }}
                    >
                        <Text category="h6" status="control">
                            {matric.description}
                        </Text>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>
    );
}

const styles = StyleSheet.create({
    subscribeWrap: {
        flex: 1,
        backgroundColor: 'transparent',
        marginTop: -200,
        // minHeight: hp2dp('30%'),
        width: wp2dp('90%'),
        margin: 100,
        alignItems: 'center',
        justifyContent: 'space-around',
        // zIndex: 10,
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
        marginTop: 20,
        height: hp2dp('100%'),
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
    metricsWrap: {
        marginTop: hp2dp('2%'),
        alignItems: 'center',
    },
    metrics: {
        padding: 10,
        margin: 5,
        borderColor: 'grey',
        minHeight: hp2dp('14%'),
        width: wp2dp('85%'),
        borderRadius: 10,
        backgroundColor: colors.primaryBlue,
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
        height: hp2dp('30%'),
        paddingHorizontal: 45,
        backgroundColor: 'transparent',
        padding: 10,
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
