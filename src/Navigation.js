import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notes from './Notes'; 
import Addnotes from './Addnotes'; 

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Notes">
      <Stack.Screen name="Notes" component={Notes} options={{ title: 'Notes' }} />
      <Stack.Screen name="Addnotes" component={Addnotes} options={{ title: 'Add Note' }} />
    </Stack.Navigator>
  );
};

export default Navigation;
