/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Layout, Button, Text, Avatar, Card } from '@ui-kitten/components';
import {
    widthPercentageToDP as wp2dp,
    heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import { PencilIcon, DeleteIcon } from '../assets/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../styles';
import { UpIcon, AddIcon } from '../assets/icons';
interface IDashboard {
    currentState: {},
    userInfo: {},
    selectedTab: number,
    onPressUp: () => void,
    onCardPress: (v: object) => void,
    onGuardianAction: (i: string, v: object) => void,
    onChildAction: (i: string, v: object) => void,
    onAddNewPress: (i: string) => void,
    onEditFamilyPress: (v: object) => void
}

export const ProfileHeader = ({ currentState, userInfo, selectedTab, onPressUp, onCardPress, onGuardianAction, onChildAction, onAddNewPress, onEditFamilyPress }: IDashboard) => {

    const Header = (data: { username: string; photo: string }) => {
        const handleActionClick = (type: string, data: {}) => {
            if (selectedTab === 2) {
                onGuardianAction(type, data);
                return;
            }
            if (selectedTab === 3) {
                onChildAction(type, data);
                return;
            }
        };

        return (
            <>
                <TouchableOpacity style={{ borderRadius: 5, overflow: 'hidden' }} onPress={() => onCardPress(data)}>
                    <Avatar
                        shape="square"
                        source={data?.photo ? { uri: data.photo } : selectedTab === 2 ? require('../assets/guardian-avatar.png') : require('../assets/child.png')}
                        style={{ width: wp2dp('22%'), height: hp2dp('10.5%') }}
                    />
                </TouchableOpacity>
                <Layout style={styles.iconsWrap}>
                    <TouchableOpacity style={styles.icons} onPress={() => handleActionClick('edit', data)}><PencilIcon /></TouchableOpacity>
                    <TouchableOpacity style={styles.icons} onPress={() => handleActionClick('delete', data)}><DeleteIcon /></TouchableOpacity>
                </Layout>
            </>
        );
    };

    const RenderUserInfo = () => {
        return (
            <>
                <Layout style={[styles.userInfoWrap]}>
                    <Avatar style={{ top: selectedTab === 0 ? -25 : -40, width: 100, height: 90 }} shape="square" source={require('../../../assets/images/usericon.png')} />
                    <Layout style={styles.userInfoInnerWrap}>
                        <Text
                            category="h4"
                            status="info"
                            style={{
                                color: 'grey',
                                fontWeight: 'bold',
                            }}
                        >
                            {userInfo?.username}
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
                    {selectedTab !== 0 && <TouchableOpacity style={styles.upIcon} onPress={onPressUp}>
                        <UpIcon />
                    </TouchableOpacity>}
                </Layout>
                {
                    selectedTab === 0 &&
                    <Layout
                        style={styles.description}
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
                            the 1500s
                        </Text>
                    </Layout>
                }
            </>
        );
    };

    const RenderFamily = () => {
        console.log('userInfo?.familyID', userInfo?.familyID);

        if (selectedTab === 1) {
            return (
                <Layout style={[styles.familyInfoWrap]}>
                    {userInfo?.familyID ?
                        <>
                            <Avatar style={{ width: 150, height: 150, borderRadius: 5 }} shape="square"
                                source={userInfo?.familyID?.photo ? { uri: userInfo?.familyID?.photo } : require('../../../assets/images/usericon.png')} />
                            <Text category="h4" status="info" style={{ color: 'grey', fontWeight: 'bold' }}>
                                {userInfo?.familyID?.name}
                            </Text>
                            <Layout style={styles.familyInfoInnerWrap}>
                                <Button
                                    style={styles.familyActionButtons}
                                    status="control"
                                    size="medium"
                                    appearance="ghost"
                                    onPress={() => onEditFamilyPress(userInfo?.familyID)}
                                >
                                    Edit
                                </Button>
                            </Layout>
                        </> : currentState?.family?.family?.families?.length > 0 ?
                            <>
                                <Avatar style={{ width: 150, height: 150, borderRadius: 5 }} shape="square" source={currentState?.family?.family?.families[0]?.photo ? { uri: currentState?.family?.family?.families[0]?.photo } : require('../../../assets/images/usericon.png')} />
                                <Text category="h4" status="info" style={{ color: 'grey', fontWeight: 'bold' }}>
                                    {currentState?.family?.family?.families[0]?.name}
                                </Text>
                                <Layout style={styles.familyInfoInnerWrap}>
                                    <Button
                                        style={styles.familyActionButtons}
                                        status="control"
                                        size="medium"
                                        appearance="ghost"
                                        onPress={() => onEditFamilyPress(currentState?.family?.family?.families[0])}
                                    >
                                        Edit
                            </Button>
                                </Layout>
                            </> :
                            <>
                                <Text category="h4" status="info" style={{ color: 'grey', fontWeight: 'bold' }}>
                                    No Family Added
                            </Text>
                                <Button onPress={() => onAddNewPress('family')} style={styles.familyActionButtons} status="control" size="medium" appearance="ghost">
                                    Add
                           </Button>
                            </>
                    }
                </Layout>
            );
        }
    };

    const RenderGuardians = () => {
        if (selectedTab === 2) {
            return (
                <Layout style={[styles.active]}>
                    {currentState?.family?.guardian?.guardians?.length > 0 && (
                        <Text
                            category="h6"
                            status="control"
                            style={{ color: 'grey', fontWeight: 'bold', marginBottom: 5 }}
                        >
                            Select Guardian
                        </Text>
                    )}
                    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                        <Layout style={styles.cardsOuterWrap}>
                            {currentState?.family?.guardian?.guardians.length > 0 ? (
                                currentState?.family?.guardian?.guardians?.map((guardian, idx) => {
                                    return (
                                        <Card
                                            key={idx + 1}
                                            // onPress={() => onPress(AppRoute.CHILD_PROFILE)}
                                            style={[styles.card]}
                                            header={() => Header(guardian)}
                                        />
                                    );
                                })
                            ) : (
                                    <Layout style={[styles.noDataWrap]}>
                                        <Text category="h4" status="info" style={styles.noDataText}>
                                            No data available!
                                        </Text>
                                        <TouchableOpacity style={styles.addIcon} onPress={() => onAddNewPress('guardian')}>
                                            <AddIcon />
                                        </TouchableOpacity>
                                    </Layout>
                                )}
                            {currentState?.family?.guardian?.guardians.length > 0 && (
                                <TouchableOpacity style={styles.addIcon} onPress={() => onAddNewPress('guardian')}>
                                    <AddIcon />
                                </TouchableOpacity>
                            )}
                        </Layout>
                    </ScrollView>
                    {currentState?.family?.guardian?.guardians.length > 9 && (
                        <Button
                            style={styles.loadMoreButton}
                            status="control"
                            size="medium"
                            appearance="ghost"
                        >
                            Load more
                        </Button>
                    )}
                </Layout>
            );
        }
    };

    const RenderChildren = () => {
        if (selectedTab === 3) {
            return (
                <Layout style={[styles.active]}>
                    {currentState?.family?.child?.children.length > 0 && (
                        <Text
                            category="h6"
                            status="control"
                            style={{ color: 'grey', fontWeight: 'bold', marginBottom: 5 }}
                        >
                            Select Child
                        </Text>
                    )}
                    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                        <Layout style={styles.cardsOuterWrap}>
                            {currentState?.family?.child?.children.length > 0 ? (
                                currentState?.family?.child?.children?.map((child, idx) => {
                                    return (
                                        <Card
                                            key={idx + 1}
                                            style={styles.card}
                                            header={() => Header(child)}
                                        />
                                    );
                                })
                            ) : (
                                    <Layout style={styles.noDataWrap}>
                                        <Text category="h4" status="info" style={styles.noDataText}>
                                            No children data available!
                                        </Text>
                                        <TouchableOpacity style={styles.addIcon} onPress={() => onAddNewPress('child')}>
                                            <AddIcon />
                                        </TouchableOpacity>
                                    </Layout>
                                )}
                            {currentState?.family?.child?.children.length > 0 && (
                                <TouchableOpacity style={styles.addIcon} onPress={() => onAddNewPress('child')}>
                                    <AddIcon />
                                </TouchableOpacity>
                            )}
                        </Layout>
                    </ScrollView>
                    {currentState?.family?.child?.children.length > 9 && (
                        <Button
                            style={styles.loadMoreButton}
                            status="control"
                            size="medium"
                            appearance="ghost"
                        >
                            Load more
                        </Button>
                    )}
                </Layout>
            );
        }
    };

    return (
        <Layout style={[styles.profileHeaderWrap]}>
            <Layout style={selectedTab === 0 ? styles.innerWrap : styles.innerWrapWithChild} level="1">
                {RenderUserInfo()}
                {RenderFamily()}
                {RenderGuardians()}
                {RenderChildren()}
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
    description: {
        alignSelf: 'center',
        width: wp2dp('70%'),
        marginBottom: 10,
    },
    userInfoWrap: {
        // flex: 0.1,
        flexDirection: 'row',
        borderRadius: 5,
        marginLeft: -30,
        backgroundColor: 'transparent',
    },
    userInfoInnerWrap: { marginTop: 10, padding: 0, margin: 0, backgroundColor: 'transparent' },
    upIcon: {
        marginLeft: wp2dp('25%'),
        margin: 20,
        borderWidth: 1,
        alignSelf: 'flex-end',
        borderRadius: 5,
        padding: 2,
        borderColor: colors.primaryBlue,
    },
    addIcon: {
        borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 4,
        padding: 2,
        borderColor: colors.primaryBlue,

        height: 90,
        width: 90,
        paddingHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
    },
    loadMoreButton: {
        marginVertical: 10,
        marginTop: 20,
        width: '50%',
        height: '10%',
        borderRadius: 5,
        backgroundColor: '#6F99EB',
        alignSelf: 'center',
    },
    card: {
        height: 100,
        width: '33.33%',
        paddingHorizontal: 5,
        borderRadius: 0,
        borderWidth: 0,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0,
        // shadowRadius: 10.32,

        // elevation: 6,
    },
    noDataWrap: {
        flex: 1,
        height: hp2dp('35%'),
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    noDataText: {
        color: 'grey',
        fontWeight: 'bold',
    },
    familyInfoWrap: {
        flex: 1,
        height: hp2dp('35%'),
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 5,
    },
    familyInfoInnerWrap: {
        width: wp2dp('80%'),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    familyActionButtons: {
        width: '40%',
        height: '10%',
        borderRadius: 5,
        backgroundColor: '#6F99EB',
    },
    active: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: wp2dp('70%'),
        maxHeight: hp2dp('43%'),
    },
    innerWrap: {
        justifyContent: 'center',
        borderColor: 'grey',
        height: 200,
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
        borderColor: 'grey',
        minHeight: hp2dp('30%'),

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
    cardsOuterWrap: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        display: 'flex',
        width: '100%',
        marginBottom: 5,
    },
    iconsWrap: { width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' },
    avatar: {
        height: hp2dp('10.5%'),
        width: '100%',
        borderRadius: 5,
    },
    icons: { top: -10, backgroundColor: '#fff', borderRadius: 5, padding: 2, borderWidth: 0.5, borderColor: colors.primaryBlue },
});
