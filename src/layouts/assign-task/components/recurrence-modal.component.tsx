/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Layout, Button, Text, Card, Calendar, Input, Radio, RadioGroup } from '@ui-kitten/components';
import Modal from 'react-native-modal';

import { heightPercentageToDP as hp2dp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
// import RNPickerSelect from 'react-native-picker-select';

import { KeyboardAvoidingView } from '../../matric-sub-category/extra/3rd-party';

interface IRecurrenceModal {
    visible: boolean;
    setModal: () => void;
    onDone: (obj: object) => void
}

let FutureDate = new Date();
// add a day
FutureDate.setDate(FutureDate.getDate() + 1);

let daysPrefix = [
    { id: 6, weekday: 'SU', prefix: 'S', isSelected: false },
    { id: 0, weekday: 'MO', prefix: 'M', isSelected: false },
    { id: 1, weekday: 'TU', prefix: 'T', isSelected: false },
    { id: 2, weekday: 'WE', prefix: 'W', isSelected: false },
    { id: 3, weekday: 'TH', prefix: 'T', isSelected: false },
    { id: 4, weekday: 'FR', prefix: 'F', isSelected: false },
    { id: 5, weekday: 'SA', prefix: 'S', isSelected: false },
];
export const RecurrenceModal = ({ visible, setModal, onDone }: IRecurrenceModal) => {

    const [isCalenderVisible, setIsCalenderVisible] = useState(false);
    const [date, setDate] = useState(FutureDate);
    const [days, setDays] = useState(daysPrefix);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [freq, setFreq] = useState('DAILY');
    const [interval, setInterval] = useState('1');
    const [occurence, setOccurence] = useState('1');

    const [byweekday, setByweekday] = useState([{}]);

    useEffect(() => {
        let d = new Date();
        let v = d.getDay();
        let daysCpy = [...days];

        daysCpy.map((day: { id: number, isSelected: boolean }) => {
            if (day.id === v) {
                day.isSelected = true;
                setByweekday([day]);
            }
        });
        setDays(daysCpy);
    }, []);

    const handleSelectWeekDay = (index: number) => {
        let daysCpy = [...days];
        daysCpy[index].isSelected = !daysCpy[index].isSelected;
        setDays(daysCpy);

        let selectedDays = daysCpy.filter((day) => day.isSelected);
        setByweekday(selectedDays);
    };

    const handleChangeOccurence = (nextValue: string) => {
        setOccurence(nextValue);
        setSelectedIndex(1);
    };

    const handleDone = () => {
        let ends = selectedIndex === 0 ? date : occurence;
        onDone({ freq, interval, byweekday, ends });
        setModal();
    };

    return (
        <KeyboardAvoidingView keyboardShouldPersistTaps={'handled'} style={{ backgroundColor: '#fff' }}>
            <Modal
                isVisible={visible}
                onBackdropPress={setModal}
                animationIn={'slideInUp'}
                onBackButtonPress={setModal}>
                <Card disabled={true} style={styles.cardWrap}>
                    <Layout style={styles.cardInnerWrap}>
                        <Text category="h4" style={styles.title}>Custom recurrence</Text>
                        <Layout style={styles.repeatEveryWrap}>
                            <Text category="h6">Repeat every</Text>
                            <Layout style={styles.repeatEveryInnerWrap}>
                                <Input
                                    style={styles.input}
                                    value={interval}
                                    onChangeText={(nextValue) => setInterval(nextValue)}
                                    keyboardType="numeric"
                                />
                                <Layout style={{ width: '50%', backgroundColor: '#f1f3f4', borderRadius: 5, borderWidth: 0, height: 40, marginTop: 5 }}>
                                    <Picker
                                        style={{
                                            height: 40,
                                            width: '100%',
                                        }}
                                        selectedValue={freq}
                                        mode="dropdown"
                                        onValueChange={(itemValue: any) => setFreq(itemValue)}>
                                        <Picker.Item label="day" value="DAILY" />
                                        <Picker.Item label="week" value="WEEKLY" />
                                        <Picker.Item label="month" value="MONTHLY" />
                                        <Picker.Item label="year" value="YEARLY" />
                                    </Picker>
                                </Layout>
                            </Layout>
                        </Layout>
                        {freq === 'WEEKLY' && <Layout style={styles.repeatedOnWrap}>
                            <Text category="h6" style={styles.repeatedOnTitle}>Repeat on</Text>
                            <Layout style={styles.daysWrap}>
                                {days.map((day, index) =>
                                    <TouchableOpacity onPress={() => handleSelectWeekDay(index)} key={index} style={[styles.daysInnerWrap, { backgroundColor: day.isSelected ? '#3d73e8' : '#f0f6fb' }]}>
                                        <Text category="s1" style={[styles.days, { color: day.isSelected ? '#fff' : '#80868b' }]} >
                                            {day.prefix}
                                        </Text>
                                    </TouchableOpacity>)}
                            </Layout>
                        </Layout>}

                        <Layout style={styles.endsWrap}>
                            <Text category="h6" style={{ marginBottom: 25 }}>Ends</Text>
                            <RadioGroup
                                selectedIndex={selectedIndex}
                                onChange={index => {
                                    index === 0 || index === 1 ? setSelectedIndex(index) : setSelectedIndex(selectedIndex);
                                }
                                }>
                                <Radio>
                                    <Layout style={[styles.radioTwoWrap]}>
                                        <Layout style={styles.radioTwoInnerWrap}>
                                            <Text>{'On'}</Text>
                                        </Layout>
                                        <Layout style={styles.dateWrap}>
                                            <TouchableOpacity onPress={() => setIsCalenderVisible(true)}>
                                                <Text style={[styles.date, { color: selectedIndex === 0 ? '#111' : '#a4a9ae' }]}> {date && date?.toLocaleDateString()}</Text>
                                            </TouchableOpacity>
                                        </Layout>
                                        <Layout style={{ flex: 0.60, backgroundColor: 'transparent' }} />
                                    </Layout>
                                </Radio>
                                <Radio>
                                    <Layout style={styles.radioThreeWrap}>
                                        <Layout style={[styles.innerRadioWrapOne]}>
                                            <Text style={{ margin: 2 }}>{'After'}</Text>
                                        </Layout>
                                        <Layout style={styles.innerRadioWrapTwo}>
                                            <Input style={[styles.input, { color: selectedIndex === 1 ? '#111' : '#a4a9ae' }]}
                                                value={occurence}
                                                onChangeText={(nextValue) => {
                                                    handleChangeOccurence(nextValue);
                                                }}

                                                keyboardType="numeric" />
                                            <Text style={styles.occurencesText, { color: selectedIndex === 1 ? '#111' : '#a4a9ae', marginRight: 10 }}>occurrences</Text>
                                        </Layout>
                                        <Layout style={{ flex: 0.4, backgroundColor: 'transparent' }} />
                                    </Layout>
                                </Radio>
                            </RadioGroup>
                        </Layout>
                        <Layout style={styles.bottomWrap}>
                            <Button appearance="ghost" status="basic" onPress={setModal}>
                                Cancel
                            </Button>
                            <Button appearance="ghost" status="info" onPress={handleDone}>
                                Done
                            </Button>
                        </Layout>
                    </Layout>
                </Card>
            </Modal >

            <Modal
                isVisible={isCalenderVisible}
                onBackdropPress={() => setIsCalenderVisible(false)}
                style={{ alignSelf: 'center' }}
                animationIn={'slideInUp'}
                onBackButtonPress={() => setIsCalenderVisible(false)}
            >
                <Calendar
                    style={{ backgroundColor: '#fff' }}
                    min={new Date()}
                    date={new Date()}
                    onSelect={(nextDate) => {
                        setDate(nextDate);
                        setIsCalenderVisible(false);
                        setSelectedIndex(0);
                    }}
                />
            </Modal>
        </KeyboardAvoidingView >
    );
};

const styles = StyleSheet.create({
    cardWrap: { height: hp2dp('70%') },
    cardInnerWrap: { height: '100%', justifyContent: 'flex-start', alignItems: 'center' },
    title: { alignSelf: 'flex-start', marginBottom: 25 },
    repeatEveryWrap: { width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    repeatEveryInnerWrap: { flexDirection: 'row', width: '70%' },
    input: { maxWidth: 100, marginHorizontal: 5, marginTop: 5, backgroundColor: '#f1f3f4', color: '#a4a9ae', borderRadius: 5, borderColor: 'transparent' },
    picker: { height: 40 },
    repeatedOnWrap: { width: '100%', justifyContent: 'space-around', alignItems: 'flex-start', marginBottom: 25 },
    repeatedOnTitle: { alignSelf: 'flex-start', marginBottom: 10 },
    daysWrap: { width: '100%', flexDirection: 'row', justifyContent: 'space-between' },
    daysInnerWrap: {
        width: 30,
        height: 30,
        borderRadius: 50,
        justifyContent: 'center',
    },
    days: {
        textAlign: 'center',
        fontSize: 13,
    },
    endsWrap: { width: '100%', marginBottom: 25 },
    radioOne: { flexDirection: 'row', backgroundColor: 'transparent', marginBottom: 30 },
    radioTwoWrap: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent', marginBottom: 0 },
    radioTwoInnerWrap: { flex: 0.4, flexDirection: 'row', backgroundColor: 'transparent', alignItems: 'center', marginRight: 60 },
    dateWrap: { backgroundColor: '#f1f3f4', height: 40, width: 100, borderRadius: 5, justifyContent: 'center', alignItems: 'center' },
    date: { textAlignVertical: 'center' },
    radioThreeWrap: { backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    innerRadioWrapOne: { flex: 0.4, flexDirection: 'row', backgroundColor: 'transparent', marginRight: 40 },
    innerRadioWrapTwo: {
        flexDirection: 'row',
        backgroundColor: '#f1f3f4',
        borderRadius: 5,
        paddingRight: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 40,
    },
    occurencesText: { marginRight: 50 },
    bottomWrap: { flexDirection: 'row', marginLeft: 'auto' },
});
