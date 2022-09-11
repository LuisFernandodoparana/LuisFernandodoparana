import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/views/Home';
import LinkNotification from './src/views/LinkNotification';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={() => {
              return {
                title: 'Home'
              }
            }} />
          <Stack.Screen
            name="Notification"
            component={LinkNotification}
            options={() => {
              return {
                title: 'Notificações'
              }
            }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}