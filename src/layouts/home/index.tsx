import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Button,
  Icon,
  Text,
  Radio,
  RadioGroup,
  LayoutElement,
} from '@ui-kitten/components';

import i18n from '../../translations';
import ToggleButton, {
  IToggleButton,
} from '../../components/toggle-button.component';

const SignoutIcon = (props: any) => <Icon {...props} name="log-out-outline" />;

interface IHome {
  onThemeToggle: () => void;
  onSignOutPress: () => void;
  handleLocaleChange: () => void;
  selectedIndex: number;
  languages: [];
}

export const Home = ({
  activeTheme,
  onThemeToggle,
  checked,
  onSignOutPress,
  handleLocaleChange,
  selectedIndex,
  languages,
}: IHome & IToggleButton & LayoutElement) => {
  return (
    <Layout style={styles.container}>
      {/* <ToggleButton
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
      /> */}
      <Layout style={styles.layout} level="4">
        <Text>{i18n.t('home.selectedLanguage')}</Text>
        <Text>{languages[selectedIndex]?.name}</Text>
      </Layout>

      <Layout style={styles.layout}>
        <Text category="h6">{i18n.t('home.selectLanguage')}</Text>
        <RadioGroup selectedIndex={selectedIndex} onChange={handleLocaleChange}>
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

      <Layout style={styles.layout} level="1">
        <Button
          style={styles.button}
          appearance="outline"
          onPress={onSignOutPress}
          accessoryLeft={SignoutIcon}
        >
          {i18n.t('home.signOut')}
        </Button>
        <Text>{i18n.t('home.hello')}</Text>
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
