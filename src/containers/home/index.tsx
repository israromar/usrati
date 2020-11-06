import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/auth.actions';
import { HomeScreen } from '../../screens';
import { IAppRooStack } from '../../navigation/RootNavigation';

const HomeContainer = () => {
  const { user } = useSelector((state: IAppRooStack) => state.auth);
  console.log('HomeContainer -> user', user);
  const dispatch = useDispatch();

  const handleSignOutPress = () => {
    dispatch(logout());
  };
  return <HomeScreen onSignOutPress={handleSignOutPress} />;
};

export default HomeContainer;
