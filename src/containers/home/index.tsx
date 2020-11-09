import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/auth.actions';
import { toggleTheme } from '../../store/actions/theme.actions';
import { HomeScreen } from '../../screens';
import { IAppRooStack } from '../../navigation/RootNavigation';

const HomeContainer = () => {
  const { user } = useSelector((state: IAppRooStack) => state.auth);
  console.log('HomeContainer -> user', user);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const {
    theme: { activeTheme },
  } = useSelector((state) => {
    return state;
  });
  console.log('mystate -> mystate', activeTheme);
  // const [checked, setChecked] = useState(false);

  const handleThemeToogle = (isChecked: boolean) => {
    setChecked(isChecked);
    dispatch(
      toggleTheme({ theme: activeTheme === 'Light' ? 'Dark' : 'Light' }),
    );
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
    />
  );
};

export default HomeContainer;
