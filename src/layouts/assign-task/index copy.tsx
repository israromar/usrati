/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Button, Text, Card, Avatar, List, ListItem, Divider, Calendar, Input, Radio } from '@ui-kitten/components';
import Modal from 'react-native-modal';

import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';

import { ImageOverlay, BodyCard } from '../../components';
import { AppRoute } from '../../navigation/app-routes';
import { KeyboardAvoidingView } from '../auth/welcome/extra/3rd-party';
interface IDashboard {
  currentState: {};
  onPress: (v: string) => void;
  getAllChildren: () => void;
}
bnb;
export const AssignTask = ({
  currentState,
  onPress,
  getAllChildren,
}: IDashboard) => {
  const [allChildren, setAllChildren] = useState([]);
  const [tasks, setTasks] = useState(new Array(10).fill({ title: 'Task name', status: 'Tommorow' }));
  const [visible, setVisible] = useState(false);
  const [isCalenderVisible, setIsCalenderVisible] = useState(false);
  const [date, setDate] = useState(new Date('Jan 01, 2010 00:20:18'));

  const [checked, setChecked] = useState(false);
  const [timeSpan, setTimeSpan] = useState('');

  const [selectedTab, setSelectedTab] = useState(0);
  const [renderBodyElements, setRenderBodyElements] = useState([]);
  const [bodyElements] = useState([
    { id: 1, text: 'Select Child', icon: 'child-care' },
    { id: 2, text: 'Repeat', icon: 'calendar-today' },
    { id: 3, text: 'Reminder', icon: 'alarm' },
  ]);
  const [days] = useState(['S', 'M', 'T', 'W', 'T', 'F', 'S']);

  useEffect(() => {
    getAllChildren();
    return () => {
      // cleanup;
    };
  }, []);

  useEffect(() => {
    if (currentState?.family) {
      setAllChildren(currentState?.family?.child?.children);
    }
  }, [currentState]);

  const Header = (child: { username: string; photo: string }) => {
    return (
      <>
        <Avatar
          shape="square"
          source={child?.photo ? { uri: child.photo } : require('./assets/child.png')}
          style={styles.avatar}
        />
        <Text category="s1" style={{ color: 'grey' }}>
          {child?.username}
        </Text>
      </>
    );
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.status} ${index + 1}`}
    />
  );

  useEffect(() => {
    let temp = [...bodyElements];
    temp = temp.filter((item) => item.id !== selectedTab);
    setRenderBodyElements(temp);
  }, [selectedTab]);

  const handlePressItem = () => {
    setVisible(!visible);
  };

  console.log('timespan', timeSpan);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../assets/images/vector.png')}
      >
        <Layout style={{ backgroundColor: 'none' }}>
          <Text category="h1" status="control" style={{ fontWeight: 'bold' }} >
            Assign
          </Text>
          <Text category="h5" status="control">
            Task
          </Text>
        </Layout>
      </ImageOverlay>
      <Layout style={[styles.taskDataWrap]}>
        <Layout style={[styles.tasks]} level="1">
          {tasks.length > 0 && (
            <Layout style={{ margin: 12 }}>
              <Text category="h2" style={{ fontWeight: 'bold' }}>
                Tasks
              </Text>
            </Layout>
          )}
          <SafeAreaView style={styles.safeArea}>
            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
              <Layout style={[styles.tasksInnerWrap]}>
                {tasks.length > 0 ? (
                  <List
                    style={styles.list}
                    data={tasks}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderItem}
                  />
                ) : (
                    <Layout
                      style={{
                        flex: 1,
                        height: hp2dp('35%'),
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        category="h4"
                        status="info"
                        style={{
                          color: 'grey',
                          // fontWeight: 'bold',
                        }}
                      >
                        No data available!
                    </Text>
                    </Layout>
                  )}
              </Layout>
            </ScrollView>
            {allChildren.length > 9 && (
              <Layout style={{ backgroundColor: 'transparent' }}>
                <Button
                  style={styles.loadMoreButton}
                  status="control"
                  size="medium"
                  appearance="ghost"
                >
                  Load more
                </Button>
              </Layout>
            )}
          </SafeAreaView>
        </Layout>
      </Layout>
      <Layout style={{ backgroundColor: 'transparent' }}>
        {renderBodyElements.map((item) => {
          return <BodyCard key={item.id} currentState={currentState} item={item} onPressItem={handlePressItem} />;
        })}
      </Layout>
      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        animationIn={'slideInUp'}
        onBackButtonPress={() => setVisible(false)}>
        <Card disabled={true} style={{ height: hp2dp('62%') }}>
          <Layout style={{ height: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Text category="h4" style={{ alignSelf: 'flex-start', marginBottom: 25 }}>Custom recurrence</Text>
            <Layout style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <Text category="h5">Repeat every</Text>
              <Input
                style={{ width: 50, marginHorizontal: 10 }}
                value={'1'}
                keyboardType="numeric"
              />
              {/* <Text category="h5" style={{}}>Week</Text> */}
              <Picker
                selectedValue={timeSpan}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue: string, itemIndex: number) =>
                  setTimeSpan(itemValue)
                }>
                <Picker.Item label="day" value="day" />
                <Picker.Item label="week" value="week" />
                <Picker.Item label="month" value="month" />
                <Picker.Item label="year" value="year" />
              </Picker>
            </Layout>

            <Layout style={{ width: '100%', justifyContent: 'space-around', alignItems: 'flex-start', marginBottom: 25 }}>
              <Text category="h5" style={{ alignSelf: 'flex-start', marginBottom: 10 }}>Repeated on</Text>
              <Layout style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                {days.map((day) => <Text category="s1" style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  width: 35,
                  height: 35,
                  borderWidth: 1, borderRadius: 30,
                  backgroundColor: '#f0f6fb',
                }}>{day}</Text>)}
              </Layout>
            </Layout>
            <Layout style={{ width: '100%', marginBottom: 25 }}>
              <Text category="h4" style={{ marginBottom: 25 }}>Ends</Text>
              <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent', marginBottom: 15 }}>
                <Radio checked={checked}
                  onChange={nextChecked => setChecked(nextChecked)}
                >
                  {'Never'}
                </Radio>
              </Layout>
              <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent', marginBottom: 15 }}>
                <Layout style={{ flex: 0.4, flexDirection: 'row', backgroundColor: 'transparent' }}>
                  <Radio checked={checked}
                    onChange={nextChecked => setChecked(nextChecked)}
                  >
                    {'On'}
                  </Radio>
                </Layout>
                <TouchableOpacity
                  // style={styles.dob}
                  onPress={() => {
                    setIsCalenderVisible(true);
                  }}
                >
                  <Text> {date && date?.toLocaleDateString()}</Text>
                </TouchableOpacity>
                <Layout style={{ flex: 0.46, backgroundColor: 'transparent' }} />
              </Layout>
              <Layout style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Layout style={{ flex: 0.4, flexDirection: 'row', backgroundColor: 'transparent' }}>
                  <Radio checked={checked}
                    onChange={nextChecked => setChecked(nextChecked)}
                  >
                    {'After'}
                  </Radio>
                </Layout>
                <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center' }}>
                  <Input
                    style={{ width: 50 }}
                    value={'9'}
                  />
                  <Text style={{ marginLeft: 10, textAlignVertical: 'center' }}>occurrences</Text>
                </Layout>
                <Layout style={{ flex: 0.4, backgroundColor: 'transparent' }} />
              </Layout>
            </Layout>
            <Layout style={{ flexDirection: 'row', marginLeft: 'auto' }}>
              <Button appearance="ghost" status="basic" onPress={() => setVisible(false)}>
                Cancel
              </Button>
              <Button appearance="ghost" status="info" onPress={() => setVisible(false)}>
                Done
              </Button>
            </Layout>
          </Layout>
        </Card>
      </Modal>

      <Modal
        isVisible={isCalenderVisible}
        onBackdropPress={() => setIsCalenderVisible(false)}
        style={{ alignSelf: 'center' }}
        animationIn={'slideInUp'}
        onBackButtonPress={() => setIsCalenderVisible(false)}
      >
        <Calendar
          style={{ backgroundColor: '#fff' }}
          min={new Date('January 01, 2000 00:20:18')}
          date={new Date('Jan 01, 2010 00:20:18')}
          onSelect={(nextDate) => {
            setDate(nextDate);
            setIsCalenderVisible(false);
            // setDateSelected(true);
            // setVisible(false);
          }}
        />
      </Modal>
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
  bottomWrap: {
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    alignSelf: 'center',
    marginVertical: 12,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  scrollView: {
    backgroundColor: 'pink',
  },
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
    height: hp2dp('10.5%'),
    width: wp2dp('24.5%'),
    padding: 0,
  },
  taskDataWrap: {
    // flex: 1,
    marginTop: -hp2dp('15%'),
    backgroundColor: 'transparent',
    alignItems: 'center',
    height: hp2dp('45%'),
    // minHeight: hp2dp('25%'),
    // maxHeight: hp2dp('45%'),
  },
  safeArea: {
    flex: 1,
    alignSelf: 'center',
  },
  tasks: {
    borderColor: 'grey',
    height: hp2dp('45%'),
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
  list: {
    // minHeight: hp2dp('20%'),
    // maxHeight: hp2dp('45%'),
  },
  tasksInnerWrap: {
    backgroundColor: 'transparent',
    // height: hp2dp('100%'),
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
