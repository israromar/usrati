import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Layout, Button, Icon, Text } from '@ui-kitten/components';

const LanguageListItem = ({
  handleLocaleChange,
  isActive,
  name,
  englishName,
}: any) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={handleLocaleChange}>
      <Layout style={styles.textWrapper}>
        <Layout>
          <Text style={[styles.title, isActive && styles.active]}>{name}</Text>
        </Layout>
        {/* <Text style={[styles.title, isActive && styles.active]}>{name}</Text> */}
        {englishName && <Text style={styles.subtitle}>{englishName}</Text>}
      </Layout>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  textWrapper: {
    width: '90%',
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: '#434343',
  },
  subtitle: {
    color: '#AAAAAA',
  },
  active: {
    color: '#03a87c',
  },
});

export default LanguageListItem;
