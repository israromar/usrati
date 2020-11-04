import React from 'react';
import RootAppNavigation from '../../navigation/RootNavigation';

export default function AppView() {
  return (
    <RootAppNavigation onNavigationStateChange={() => {}} uriPrefix="/app" />
  );
}
