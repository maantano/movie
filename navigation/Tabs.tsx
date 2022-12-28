/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Movie from '../screens/Movie';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import {useColorScheme} from 'react-native';
import {BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR} from '../color';

const Tab = createBottomTabNavigator();
const Tabs = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : 'white',
      }}
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : 'white',
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : 'white',
        },
        headerTitleStyle: {
          color: isDark ? 'white' : BLACK_COLOR,
        },
      }}>
      <Tab.Screen name="Movie" component={Movie} />
      <Tab.Screen name="Tv" component={Tv} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;
