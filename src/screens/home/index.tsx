import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Button, Icon, Text } from '@ui-kitten/components';
import ToggleButton, { IToggleButton } from '../../components/ToggleButton';

const SignoutIcon = (props: any) => <Icon name="log-out-outline" {...props} />;
interface IHome {
  onThemeToggle: () => {};
  onSignOutPress: () => {};
}
export const Home = ({
  activeTheme,
  onThemeToggle,
  checked,
  onSignOutPress,
}: IHome & IToggleButton) => {
  return (
    <Layout style={styles.container}>
      <ToggleButton
        title={'Theme'}
        activeTheme={activeTheme}
        onToggle={onThemeToggle}
        checked={checked}
        label={!checked ? 'Enable Dark Mode :' : 'Disable Dark Mode :'}
      />
      <Layout style={styles.layout} level="4">
        <Text>4</Text>
      </Layout>

      <Layout style={styles.layout} level="3">
        <Text>3</Text>
      </Layout>
      <Layout style={styles.layout} level="2">
        <Text>2</Text>
      </Layout>
      <Layout style={styles.layout} level="1">
        <Text>1</Text>
        <Button
          style={styles.button}
          appearance="outline"
          onPress={onSignOutPress}
          accessoryLeft={SignoutIcon}
        >
          SIGN OUT
        </Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggle: {
    margin: 10,
  },
  text: {
    margin: 15,
  },
  button: {
    margin: 2,
  },
});
