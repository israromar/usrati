import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
  const onLoginPress = () => {};
  return (
    <View style={styles.wrap}>
      <View>
        <ScrollView style={{ padding: 20 }}>
          <Text style={{ fontSize: 27, textAlign: 'center' }}>Sign Up</Text>
          <TextInput style={styles.inputFields} placeholder="Full Name" />
          <TextInput style={styles.inputFields} placeholder="Username" />
          <TextInput style={styles.inputFields} placeholder="Email" />
          <TextInput style={styles.inputFields} placeholder="Password" />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button onPress={onLoginPress} title="Sign Up" />
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

export default SignUp;
