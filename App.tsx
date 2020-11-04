import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
// import {Route} from './src/navigation/routes';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store';
import {StatusBar} from 'react-native';
import AppView from './src/containers/appView';

// import RNBootSplash from 'react-native-bootsplash';
const App = () => {
  //  RNBootSplash.hide();
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <StatusBar backgroundColor="#000" barStyle="light-content" /> */}
          {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}

          <AppView />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};
export default App;
