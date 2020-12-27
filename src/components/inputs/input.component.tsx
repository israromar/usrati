import React from 'react';
import { Input } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const InputField = ({
  status,
  placeholder,
  accessoryLeft,
  value,
  onChange,
}) => {
  return (
    <Input
      // style={styles.InputField}
      status={status}
      placeholder={placeholder}
      accessoryRight={accessoryLeft}
      value={value}
      onChangeText={onChange}
    />
  );
};

const styles = StyleSheet.create({
  InputField: {
    borderWidth: 0,
    // backgroundColor: 'transparent',
  },
});
