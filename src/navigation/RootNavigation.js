import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStackNavigator from './AuthNavigator';
import AppStackNavigator from './AppNavigator';

const RootStack = createStackNavigator();

const AppRootStack = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
      setUser({});
    }, 500);
  }, []);

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="AuthStack"
        options={{
          title: 'Sign In',
          headerShown: false,
        }}
        component={AuthStackNavigator}
      />
      <RootStack.Screen name="AppStack" component={AppStackNavigator} />
    </RootStack.Navigator>
  );
};

export default () => <AppRootStack />;
