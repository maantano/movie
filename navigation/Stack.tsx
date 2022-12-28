import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from '../screens/Detail';
import {useColorScheme} from 'react-native';
import {BLACK_COLOR} from '../color';

const StackNav = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <StackNav.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : 'white',
        },
        headerTitleStyle: {
          color: isDark ? 'white' : BLACK_COLOR,
        },
      }}>
      <StackNav.Screen name="Detail" component={Detail} />
    </StackNav.Navigator>
  );
};

export default Stack;
