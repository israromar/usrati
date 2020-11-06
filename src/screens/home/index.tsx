/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Home = ({ onSignOutPress }: any) => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrap}>
      <View>
        <ScrollView style={{ padding: 20 }}>
          <Text style={{ fontSize: 27, textAlign: 'center' }}>
            Welcome Home
          </Text>
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button onPress={onSignOutPress} title="Logout" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'space-around',
  },
  inputFields: {
    borderWidth: 1 / 2,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  buttonContainer: {
    // backgroundColor: 'red',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    // borderRadius: 0,
    minWidth: 150,
  },
});
