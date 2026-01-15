import 'react-native-gesture-handler';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import AppNavigator from './src/navigation/AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  if (__DEV__) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('./ReactotronConfig');
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style='auto' />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
