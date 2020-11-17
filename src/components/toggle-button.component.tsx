import React from 'react';
import { StyleSheet } from 'react-native';
import { Toggle, Text } from '@ui-kitten/components';

export interface IToggleButton {
  title: string;
  label: string;
  activeTheme: string;
  onToggle: () => void;
  checked: boolean;
}

const ToggleButton = ({
  title,
  label,
  activeTheme,
  onToggle,
  checked,
}: IToggleButton) => {
  return (
    <React.Fragment>
      <Text style={styles.text}>{`${title}: ${activeTheme}`}</Text>
      <Text>{label}</Text>
      <Toggle checked={checked} onChange={onToggle} style={styles.toggle} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
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
export default ToggleButton;
