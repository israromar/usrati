import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/auth.actions';
import { toggleTheme } from '../../store/actions/theme.actions';
import { changeLanguage } from '../../store/actions/language.actions';
import { HomeScreen } from '../../screens';
import { IAppRooStack } from '../../navigation/RootNavigation';
import i18n from '../../translations';

const HomeContainer = () => {
  const {
    language: { activeLanguage },
  } = useSelector((state: IAppRooStack) => state);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    i18n.locale = activeLanguage;
    dispatch(toggleTheme({ theme: activeTheme }));
  }, [activeLanguage]);

  const {
    theme: { activeTheme },
  } = useSelector((state) => {
    return state;
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [languages, setLanguages] = useState([
    {
      locale: 'en',
      name: 'English',
      isActive: false,
    },
    {
      locale: 'ar',
      name: 'Arabic',
      englishName: 'Arabic',
      isActive: false,
    },
    {
      locale: 'de',
      name: 'French',
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
      Alert.alert('Change language?', null, [
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
    <HomeScreen
      onSignOutPress={handleSignOutPress}
      onThemeToggle={handleThemeToogle}
      checked={checked}
      activeTheme={activeTheme}
      handleLocaleChange={handleLocaleChange}
      languages={languages}
      selectedIndex={selectedIndex}
    />
  );
};

export default HomeContainer;
