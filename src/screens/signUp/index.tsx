/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
interface ISignUp {
  onSignUpPress(obj: {
    fullName: string;
    userName: string;
    email: string;
    password: string;
  }): void;
}
export const SignUp = ({ onSignUpPress }: ISignUp) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.wrap}>
      <View>
        <ScrollView style={{ padding: 20 }}>
          <Text style={{ fontSize: 27, textAlign: 'center' }}>Sign Up</Text>
          <TextInput
            style={styles.inputFields}
            placeholder="Full Name"
            onChangeText={setFullName}
            value={fullName}
          />
          <TextInput
            style={styles.inputFields}
            placeholder="Username"
            onChangeText={setUserName}
            value={userName}
          />
          <TextInput
            style={styles.inputFields}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.inputFields}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                onPress={() =>
                  onSignUpPress({ fullName, userName, email, password })
                }
                title="Sign Up"
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            onPress={() => navigation.navigate('SignIn')}
            title="Sign In"
          />
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
