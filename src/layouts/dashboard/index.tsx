import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

interface IHome {
  onThemeToggle: () => void;
  onSignOutPress: () => void;
  handleLocaleChange: () => void;
  selectedIndex: number;
  languages: [];
}

export const Dashboard = () => {
  return (
    <Layout style={styles.container}>
      <Layout style={styles.layout}>
        <Text>Welcome to Dashboard</Text>
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
