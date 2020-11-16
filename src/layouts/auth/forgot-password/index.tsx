import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';

import { ImageOverlay } from './extra/image-overlay.component';
import { EmailIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { IForgotPassword as IPropsForgotPassword } from '../../../containers/forgot-password';

interface IForgotPassword {
  onSubmit(obj: IPropsForgotPassword): void;
}

export const ForgotPassword = ({
  onSubmit,
}: IForgotPassword): React.ReactElement => {
  const [email, setEmail] = React.useState<string>('');

  const onResetPasswordButtonPress = (): void => {
    if (email !== '') {
      onSubmit({ email });
    } else {
      Alert.alert('Enter your email');
    }
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require('./assets/image-background.jpg')}
      >
        <Text style={styles.forgotPasswordLabel} category="h4" status="control">
          Forgot Password
        </Text>
        <Text style={styles.enterEmailLabel} status="control">
          Please enter your email address
        </Text>
        <View style={styles.formContainer}>
          <Input
            status="control"
            placeholder="Email"
            accessoryRight={EmailIcon}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <Button size="giant" onPress={onResetPasswordButtonPress}>
          RESET PASSWORD
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 24,
  },
  forgotPasswordLabel: {
    zIndex: 1,
    alignSelf: 'center',
    marginTop: 24,
  },
  enterEmailLabel: {
    zIndex: 1,
    alignSelf: 'center',
    marginTop: 64,
  },
});
