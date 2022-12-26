import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, TouchableOpacity} from 'react-native';

const ScreenOne = ({navigation: {navigate}}) => (
  <TouchableOpacity onPress={() => navigate('Two')}>
    <Text>go to two</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({navigation: {navigate}}) => (
  <TouchableOpacity onPress={() => navigate('Three')}>
    <Text>go to three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({navigation: {setOptions}}) => (
  <TouchableOpacity onPress={() => setOptions({title: 'Hello!'})}>
    <Text>Change title</Text>
  </TouchableOpacity>
);
const StackNav = createNativeStackNavigator();
const Stack = () => {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <StackNav.Screen name="One" component={ScreenOne} />
      <StackNav.Screen name="Two" component={ScreenTwo} />
      <StackNav.Screen name="Three" component={ScreenThree} />
    </StackNav.Navigator>
  );
};

export default Stack;
