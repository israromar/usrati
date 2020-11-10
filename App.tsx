/* eslint-disable react-native/no-inline-styles */
// import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Button } from '@ui-kitten/components';
import { View, Text, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
// import {Route} from './src/navigation/routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { StatusBar } from 'react-native';
import AppView from './src/containers/appView';
// import RNBootSplash from 'react-native-bootsplash';
// import { strings } from './src/translations';
// import * as RNLocalize from 'react-naitve-localize';
// import i18n from 'i18n-js';

const App = () => {
  //  RNBootSplash.hide();
  useEffect(() => {
    SplashScreen.hide();
    // strings.getInterfaceLanguage();
  }, []);
  // i18n.locale = 'ar';

  return (
    <NavigationContainer>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
            <AppView />
            {/* <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>Welcome to Blitz Reading!</Text>
              <Text>
                {i18n.t('home.welcome', { appName: i18n.t('appName') })}
              </Text>
              <Text>123</Text>
              <Text>{i18n.t('start_practice.practice')}</Text>
              <Text>{i18n.t('home.hello')}</Text>
            </View> */}
          </PersistGate>
        </Provider>
      </ApplicationProvider>
    </NavigationContainer>
  );
};
export default App;
