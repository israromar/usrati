import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import { store, persistor } from './store';
import AppNavigator from './navigation/root-navigation';

export interface IAppRooStack {
  theme: { activeTheme: string };
}

const RootNavigation: React.FC = () => {
  const {
    theme: { activeTheme },
  } = useSelector((state: IAppRooStack) => {
    return state;
  });

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva[activeTheme]}>
        <SafeAreaView style={styles.topSafeArea} />
        <StatusBar barStyle={'light-content'} />
        <AppNavigator />
      </ApplicationProvider>
    </React.Fragment>
  );
};

const App: React.FC = () => {
  //  RNBootSplash.hide();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;

const THEME_COLOR = '#222b45';

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: THEME_COLOR,
  },
});
