import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, RadioGroup, Radio } from '@ui-kitten/components';

import i18n from '../../translations';
import ToggleButton, {
  IToggleButton,
} from '../../components/toggle-button.component';

// const SignoutIcon = (props: any) => <Icon {...props} name="log-out-outline" />;

interface ISettings {
  activeTheme: string;
  onThemeToggle: () => void;
  checked: boolean;
  onSignOutPress: () => void;
  onLocaleChange: () => void;
  selectedIndex: number;
  languages: [];
}

export const Settings = ({
  activeTheme,
  onThemeToggle,
  checked,
  selectedIndex,
  onLocaleChange,
  languages,
}: ISettings) => {
  return (
    <Layout style={styles.container}>
      <Layout style={styles.layout} level="4">
        <ToggleButton
          title={i18n.t('home.theme')}
          activeTheme={
            activeTheme === 'light' ? i18n.t('home.light') : i18n.t('home.dark')
          }
          onToggle={onThemeToggle}
          checked={checked}
          label={
            activeTheme === 'light'
              ? i18n.t('home.enableDarkMode')
              : i18n.t('home.disableDarkMode')
          }
        />
      </Layout>

      <Layout style={styles.layout} level="2">
        <Text category="h6">{i18n.t('home.selectLanguage')}</Text>
        <RadioGroup selectedIndex={selectedIndex} onChange={onLocaleChange}>
          {languages.map((language) => (
            <Radio
              key={language}
              status={language.isActive ? 'success' : 'info'}
            >
              {language.name}
            </Radio>
          ))}
        </RadioGroup>
      </Layout>
      <Layout style={styles.layout} level="3" />
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
