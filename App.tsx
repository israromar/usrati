import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

// import {Route} from './src/navigation/routes';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Store, persistor} from './src/store';
import {StatusBar} from 'react-native';
import AppView from './src/containers/appView';

// import RNBootSplash from 'react-native-bootsplash';
const App = () => {
  //  RNBootSplash.hide();
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar backgroundColor="#000" barStyle="light-content" />
          <AppView />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};
export default App;
