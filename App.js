// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import BottomTabNavigator from './navigation/BottomTabNavigation';
import { AddressProvider } from './contexts/AddressContext';

export default function App() {
  return (
    <AddressProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
      /</AddressProvider>
  );
}
