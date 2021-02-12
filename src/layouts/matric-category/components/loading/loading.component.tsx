import React from 'react';
import { Layout } from '@ui-kitten/components';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../../../../styles/colors';

export default function Loading({ text }: any) {
    return (
        <Layout style={[styles.updatingOuterWrap]}>
            <Layout style={styles.updatingInnerWrap}>
                <ActivityIndicator size="large" color={colors.primaryBlue} />
                <Text style={{ color: '#111' }}>{text}</Text>
            </Layout>
        </Layout>
    );
}

const styles = StyleSheet.create({
    updatingOuterWrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        backgroundColor: 'transparent',
    },
    updatingInnerWrap: {
        backgroundColor: 'grey',
        width: 200,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        borderRadius: 2,
    },
});
