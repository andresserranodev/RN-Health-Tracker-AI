import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import HomeScreen from '@presentation/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Pressure Blood Tracker',
        }}
      />
    </Stack.Navigator>
  );
}
