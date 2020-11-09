/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Layout, Text, Button, Toggle } from '@ui-kitten/components';
// import {
//   View,
//   Text,
//   Button,
//   ScrollView,
//   TextInput,
//   StyleSheet,
// } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ISignIn {
  onSignInPress(obj: { email: string; password: string }): void;
}
export const SignIn = ({
  onSignInPress,
  checked,
  onCheckedChange,
  activeTheme,
}: ISignIn) => {
  // const navigation = useNavigation();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">HOME</Text>
      <Button>HOME</Button>
      <Layout style={{ margin: 30 }}>
        <Toggle checked={checked} onChange={onCheckedChange}>
          {`Theme: ${activeTheme}`}
        </Toggle>
      </Layout>
    </Layout>
  );
  // return (
  //   <View style={styles.wrap}>
  //     <View>
  //       <ScrollView style={{ padding: 20 }}>
  //         <Text style={{ fontSize: 27, textAlign: 'center' }}>Login</Text>
  //         <TextInput
  //           style={styles.inputFields}
  //           placeholder="Email"
  //           onChangeText={setEmail}
  //           value={email}
  //         />
  //         <TextInput
  //           style={styles.inputFields}
  //           placeholder="Password"
  //           onChangeText={setPassword}
  //           value={password}
  //         />
  //         <View style={styles.buttonContainer}>
  //           <View style={styles.button}>
  //             <Button
  //               onPress={() => onSignInPress({ email, password })}
  //               title="Sign In"
  //             />
  //           </View>
  //         </View>
  //       </ScrollView>
  //     </View>

  //     <View>
  //       <View style={styles.buttonContainer}>
  //         <View style={styles.button}>
  //           <Button
  //             onPress={() => navigation.navigate('SignUp')}
  //             title="Sign Up"
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   </View>
  // );
};

// const styles = StyleSheet.create({
//   wrap: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'stretch',
//     alignContent: 'space-around',
//   },
//   inputFields: {
//     borderWidth: 1 / 2,
//     borderColor: 'grey',
//     borderRadius: 5,
//     padding: 10,
//     margin: 10,
//   },
//   buttonContainer: {
//     // backgroundColor: 'red',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     // borderRadius: 0,
//     minWidth: 150,
//   },
// });
