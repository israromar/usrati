/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

export const Swiper = ({ style, position }: any) => {
    return (
        <Layout style={[styles.swiper, style && style]}>
            <Layout style={position === 1 ? styles.active : styles.inActive}>
                {position === 1 && <Layout style={styles.activeDot} />}
            </Layout>
            <Layout style={position === 2 ? styles.active : styles.inActive}>
                {position === 2 && <Layout style={styles.activeDot} />}
            </Layout>
            <Layout style={position === 3 ? styles.active : styles.inActive}>
                {position === 3 && <Layout style={styles.activeDot} />}
            </Layout>
        </Layout>
    );
};
const styles = StyleSheet.create({
    swiper: {
        // flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        minWidth: 70,
        // backgroundColor: 'grey',
    },
    active: {
        margin: 1,
        height: 8,
        width: 8,
        borderRadius: 50,
        borderColor: '#6F99EB',
        borderWidth: 1,
        justifyContent: 'center',
    },
    inActive: {
        width: 4,
        height: 4,
        borderRadius: 50,
        borderColor: '#C9EDF8',
        borderWidth: 1,
    },
    activeDot: {
        alignSelf: 'center',
        width: 4,
        height: 4,
        backgroundColor: '#6F99EB',
        borderRadius: 50,
    },
});
