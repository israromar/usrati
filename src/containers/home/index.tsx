import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/auth.actions';
import { toggleTheme } from '../../store/actions/theme.actions';
import { changeLanguage } from '../../store/actions/language.actions';
import { HomeScreen } from '../../layouts';
import { IAppRooStack } from '../../navigation/root-navigation';
import i18n from '../../translations';
import { Header } from './header';

const HomeContainer = () => {
  const {
    language: { activeLanguage },
    theme: { activeTheme },
  } = useSelector((state: IAppRooStack) => state);

  const dispatch = useDispatch();
  const [checked, setChecked] = useState(activeTheme === 'dark' ? true : false);

  useEffect(() => {
    i18n.locale = activeLanguage;
    dispatch(toggleTheme({ theme: activeTheme }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLanguage]);

  const [selectedIndex, setSelectedIndex] = useState(0);

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

  useEffect(() => {
    languages.map((lan, i) => {
      if (lan.locale === activeLanguage) {
        setSelectedIndex(i);
        let updated = languages;
        updated[i].isActive = true;
        updated[selectedIndex].isActive = false;
        setLanguages(updated);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleSignOutPress = () => {
    dispatch(logout());
  };

  return (
    <>
      <Header onSignOutPress={handleSignOutPress} />
      <HomeScreen
        onSignOutPress={handleSignOutPress}
        onThemeToggle={handleThemeToogle}
        checked={checked}
        activeTheme={activeTheme}
        handleLocaleChange={handleLocaleChange}
        languages={languages}
        selectedIndex={selectedIndex}
      />
    </>
  );
};

export default HomeContainer;
