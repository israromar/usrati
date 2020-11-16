import React from 'react';
import {
    Avatar,
    Layout,
    Text,
    Divider,
    Drawer,
    DrawerItem,
    IndexPath,
    Icon,
    Button,
} from '@ui-kitten/components';

const PersonIcon = (props) => <Icon {...props} name="person-outline" />;
const ListsIcon = (props) => <Icon {...props} name="list-outline" />;
const TopicsIcon = (props) => <Icon {...props} name="message-circle-outline" />;
const BookmarksIcon = (props) => <Icon {...props} name="bookmark-outline" />;
const MomentsIcon = (props) => <Icon {...props} name="flash-outline" />;
const ForwardIcon = (props) => <Icon {...props} name="arrow-ios-forward" />;
const BulbIcon = (props) => <Icon {...props} name="bulb-outline" />;
const QrIcon = (props) => <Icon {...props} name="grid-outline" />;

const Header = (props) => (
    <Layout style={{ padding: 10 }}>
        <Layout style={{ padding: 0 }}>
            <Avatar
                size="giant"
                source={require('../../assets/images/drawer/user.png')}
            />
            <Text>Israr</Text>
            <Text>@Israr123</Text>
        </Layout>

        <Layout
            style={{
                width: 200,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10,
            }}
        >
            <Text>{'14'} Following</Text>
            <Text>{'10'} Followers</Text>
        </Layout>
    </Layout>
);

const Footer = (props) => (
    <Layout
        accessoryLeft={MomentsIcon}
        accessoryRight={ForwardIcon}
        style={{
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}
    >
        <Button appearance="ghost" accessoryLeft={BulbIcon} />
        <Button appearance="ghost" status="primary" accessoryLeft={QrIcon} />
    </Layout>
);

const DrawerContent = ({ navigation, state }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    return (
        <Drawer
            header={Header}
            style={{ paddingTop: 10 }}
            footer={Footer}
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
            appearance="noDivider"
        >
            <Divider />
            <DrawerItem
                title="Profile"
                accessoryLeft={PersonIcon}
                accessoryRight={ForwardIcon}
            />
            <DrawerItem
                title="Lists"
                accessoryLeft={ListsIcon}
                accessoryRight={ForwardIcon}
            />
            <DrawerItem
                title="Topics"
                accessoryLeft={TopicsIcon}
                accessoryRight={ForwardIcon}
            />
            <DrawerItem
                title="Bookmarks"
                accessoryLeft={BookmarksIcon}
                accessoryRight={ForwardIcon}
            />
            <DrawerItem
                title="Moments"
                accessoryLeft={MomentsIcon}
                accessoryRight={ForwardIcon}
            />

            <Divider />

            <DrawerItem style={{ top: 10 }} title="Settings and privacy" />
            <DrawerItem style={{ marginVertical: 10 }} title="Help Center" />
        </Drawer>
    );
};

export default DrawerContent;
