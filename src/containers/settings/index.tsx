import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/actions/theme.actions';
import { changeLanguage } from '../../store/actions/language.actions';
import { SettingsScreen } from '../../layouts';
import { IAppRooStack } from '../../navigation/root-navigation';

export const SettingsContainer = () => {
  const {
    language: { activeLanguage },
    theme: { activeTheme },
  } = useSelector((state: IAppRooStack) => state);

  const dispatch = useDispatch();
  const [checked, setChecked] = useState(activeTheme === 'dark' ? true : false);
  const [languages, setLanguages] = useState([
    {
      locale: 'en',
      name: 'English',
      englishName: 'English',
      isActive: false,
    },
    {
      locale: 'ar',
      name: 'عربى',
      englishName: 'Arabic',
      isActive: false,
    },
    {
      locale: 'de',
      name: 'Français',
      englishName: 'French',
      isActive: false,
    },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleThemeToogle = (isChecked: boolean) => {
    setChecked(isChecked);
    dispatch(
      toggleTheme({ theme: activeTheme === 'light' ? 'dark' : 'light' }),
    );
  };

  const onChangeLocale = (index: number, locale: string) => {
    let updated = languages;
    updated[index].isActive = true;
    updated[selectedIndex].isActive = false;
    setLanguages(updated);
    dispatch(changeLanguage({ language: locale }));
    setSelectedIndex(index);
  };

  const handleLocaleChange = (index: number) => {
    selectedIndex !== index &&
      Alert.alert(`Change language to ${languages[index].englishName}?`, null, [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Change',
          onPress: () => onChangeLocale(index, languages[index].locale),
          style: 'destructive',
        },
      ]);
  };

  return (
    <SettingsScreen
      activeTheme={activeTheme}
      onThemeToggle={handleThemeToogle}
      checked={checked}
      languages={languages}
      selectedIndex={selectedIndex}
      onLocaleChange={handleLocaleChange}
    />
  );
};
