import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  Avatar,
  List,
  ListItem,
  Divider,
  CheckBox,
  Button,
} from '@ui-kitten/components';

import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import { RRule, RRuleSet, rrulestr } from 'rrule';

import {
  ArrowForward,
  ArrowUp,
  ArrowDown,
} from '../../components/icons/icons.component';
import { ImageOverlay, LoadingComponent } from '../../components';
// import { RecurrenceModal } from './components/recurrence-modal.component';
import { KeyboardAvoidingView } from '../auth/welcome/extra/3rd-party';
import { colors } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IDashboard {
  currentState: {
    family: { child: { children: [] } };
    matrics: { matrics: [] };
  };
  onPress: (v: string) => void;
  getChild: () => void;
}

export const ChildDashboard = ({
  currentState,
  // onPress,
  getChild,
}: IDashboard) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedChildren, setSelectedChildren] = useState<Array<number>>([]);
  const [rule, setRule] = useState('');
  const [allChildren, setAllChildren] = useState([]);
  const [allTasks, setAllTasks] = useState<Array<object>>([]);
  const [visible, setVisible] = useState(false);
  const [isAssigningTask, setIsAssigningTask] = useState(false);
  const [isTaskCollapsed, setIsTaskCollapsed] = useState(false);
  const [isChildCollapsed, setIsChildCollapsed] = useState(false);

  useEffect(() => {
    getChild();
    return () => {
      // cleanup;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // if (
    //   isAssigningTask &&
    //   currentState?.subMatrics.assignTaskStatus === 'ASSIGN_TASK_FAIL'
    // ) {
    //   setIsAssigningTask(false);
    // }

    if (currentState?.user.userInfo) {
      setAllTasks(currentState?.user?.userInfo?.tasks);
    }
    // currentState?.matrics?.matrics?.map((item: { subCategories: [] }) => {
    //   item?.subCategories?.map((task: object) => {
    //     arr.push(task);
    //   });
    // });
    // setAllTasks(arr);
  }, [currentState]);

  // const handleSelectTask = (index: number) => {
  //   let cpy: any = [...allTasks];
  //   cpy.map((task: { isChecked: boolean }) => {
  //     if (task.isChecked) {
  //       task.isChecked = false;
  //     }
  //   });
  //   cpy[index].isChecked = true;
  //   setAllTasks(cpy);
  //   setSelectedTask(cpy[index].id);
  // };

  const renderTaskItemAccessory = (
    { isChecked }: { isChecked: boolean },
    index: number,
  ) => {
    if (isChecked) {
      return (
        <CheckBox
          checked={isChecked}
          // onChange={() => handleSelectTask(index)}
        />
      );
    }
    return null;
  };

  const renderTaskData = ({ item, index }: any) => (
    <ListItem
      title={'Test Task'}
      // title={`${item.title}`}
      description={`${item.description}`}
      accessoryRight={() => renderTaskItemAccessory(item, index)}
      // onPress={() => handleSelectTask(index)}
    />
  );

  const handleSelectChild = (nextChecked: boolean, index: number) => {
    let cpy: any = [...allChildren];
    cpy[index].isChecked = nextChecked;
    setAllChildren(cpy);
    let arr: number[] = [];
    cpy.map((child: { id: number; isChecked: boolean }) => {
      if (child.isChecked) {
        arr.push(child.id);
      }
    });
    setSelectedChildren(arr);
  };

  const renderItemAccessory = (
    { isChecked }: { isChecked: boolean },
    index: number,
  ) => (
    <CheckBox
      checked={isChecked}
      onChange={(nextChecked) => handleSelectChild(nextChecked, index)}
    />
  );

  const renderItemIcon = (photoUri: string) => {
    return (
      <Avatar
        size="small"
        source={photoUri ? { uri: photoUri } : require('./assets/child.png')}
      />
    );
  };

  const renderChildData = ({
    item,
    index,
  }: {
    item: { name: string; username: string; photo: string; isChecked: boolean };
    index: number;
  }) => {
    return (
      <ListItem
        title={`${item?.name}`}
        description={`${item?.username}`}
        accessoryLeft={() => renderItemIcon(item?.photo)}
        accessoryRight={() => renderItemAccessory(item, index)}
        onPress={() => handleSelectChild(!item.isChecked, index)}
      />
    );
  };

  const RenderNoDataMsg = () => {
    return (
      <Layout style={styles.noDataMsgWrap}>
        <Text category="h6" status="info" style={{ color: 'grey' }}>
          No data available!
        </Text>
      </Layout>
    );
  };

  const renderTaskAssignLoader = () => {
    if (isAssigningTask) {
      return <LoadingComponent text={'Assigning...'} />;
    }
  };

  console.log('asslltasks: ', allTasks);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require('../../assets/images/vector.png')}
      >
        <Layout style={{ backgroundColor: 'none' }}>
          <Text category="h1" status="control" style={{ fontWeight: 'bold' }}>
            Dashboard
          </Text>
          <Text category="h5" status="control">
            Child
          </Text>
        </Layout>
      </ImageOverlay>
      {renderTaskAssignLoader()}
      <Layout style={[styles.taskDataWrap]}>
        <Layout style={[styles.tasks]} level="1">
          <TouchableOpacity>
            <Collapse
              isCollapsed={isTaskCollapsed}
              onToggle={(isCollapsed: boolean) => {
                console.log('Press', isCollapsed);

                setIsTaskCollapsed(isCollapsed);
                setIsChildCollapsed(false);
              }}
              style={styles.collaps}
            >
              <CollapseHeader style={styles.header}>
                <MaterialIcon
                  style={styles.icon}
                  name={'add-task'}
                  size={40}
                  color={colors.primaryBlue}
                />
                <Text category="h6" style={{ fontWeight: 'bold' }}>
                  All Tasks
                </Text>
                {isTaskCollapsed ? <ArrowUp /> : <ArrowDown />}
              </CollapseHeader>
              <Divider />
              <CollapseBody>
                {allTasks?.length > 0 ? (
                  <List
                    style={styles.list}
                    data={allTasks}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderTaskData}
                  />
                ) : (
                  RenderNoDataMsg()
                )}
              </CollapseBody>
            </Collapse>
          </TouchableOpacity>
          <Collapse
            isCollapsed={isChildCollapsed}
            onToggle={(isCollapsed: boolean) => {
              setIsChildCollapsed(isCollapsed);
              setIsTaskCollapsed(false);
            }}
            style={styles.collaps}
          >
            <CollapseHeader style={styles.header}>
              <MaterialIcon
                style={styles.icon}
                name={'child-care'}
                size={40}
                color={colors.primaryBlue}
              />
              <Text category="h6" style={{ fontWeight: 'bold' }}>
                Completed Tasks
              </Text>
              {isChildCollapsed ? <ArrowUp /> : <ArrowDown />}
            </CollapseHeader>
            <CollapseBody>
              {allChildren.length > 0 ? (
                <List
                  style={styles.list}
                  data={allChildren}
                  ItemSeparatorComponent={Divider}
                  renderItem={renderChildData}
                />
              ) : (
                RenderNoDataMsg()
              )}
            </CollapseBody>
          </Collapse>

          <Collapse
            isCollapsed={isChildCollapsed}
            onToggle={(isCollapsed: boolean) => {
              setIsChildCollapsed(isCollapsed);
              setIsTaskCollapsed(false);
            }}
            style={styles.collaps}
          >
            <CollapseHeader style={styles.header}>
              <MaterialIcon
                style={styles.icon}
                name={'child-care'}
                size={40}
                color={colors.primaryBlue}
              />
              <Text category="h6" style={{ fontWeight: 'bold' }}>
                Pending Tasks
              </Text>
              {isChildCollapsed ? <ArrowUp /> : <ArrowDown />}
            </CollapseHeader>
            <CollapseBody>
              {allChildren.length > 0 ? (
                <List
                  style={styles.list}
                  data={allChildren}
                  ItemSeparatorComponent={Divider}
                  renderItem={renderChildData}
                />
              ) : (
                RenderNoDataMsg()
              )}
            </CollapseBody>
          </Collapse>
        </Layout>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bottomWrap: {
    // alignItems: 'center',
    // justifyContent: 'space-around',
    padding: 10,
    alignSelf: 'center',
    // marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    alignItems: 'center',
    borderRadius: 5,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    color: 'grey',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  icon: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primaryBlue,
    padding: 2,
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
    marginTop: -hp2dp('10%'),
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  noDataMsgWrap: {
    height: hp2dp('10%'),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    alignSelf: 'center',
  },
  tasks: {
    borderColor: 'grey',
    height: 'auto',
    // maxHeight: 300,
    // maxHeight: hp2dp('40%'),
    width: wp2dp('85%'),
    borderRadius: 10,
    // overflow: 'scroll',
  },
  list: {
    overflow: 'scroll',
    maxHeight: 220,
    height: 'auto',
    // position: 'relative',
    // zIndex: 222,
  },
  tasksInnerWrapData: {
    width: wp2dp('80%'),
  },
  stretch: {
    height: 200,
    top: -80,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  headerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: hp2dp('30%'),
    paddingHorizontal: 45,
    backgroundColor: 'transparent',
    // padding: 10,
    marginBottom: 10,
  },
  collaps: {
    borderRadius: 5,
    borderWidth: 0.4,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 5,
    // minHeight: hp2dp('0%'),
  },
  loadMoreButton: {
    marginVertical: 5,
    width: '50%',
    height: '10%',
    borderRadius: 5,
    backgroundColor: '#6F99EB',
    alignSelf: 'center',
  },
});
