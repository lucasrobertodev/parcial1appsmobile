import 'react-native-screens';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegistroScreen from './src/screens/RegistroScreen';
import HomeScreen from './src/screens/HomeScreen';
import AltaScreen from './src/screens/AltaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Registro" component={RegistroScreen} options={{ title: 'Crear Cuenta' }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Mis Tareas', headerBackVisible: false }} />
          <Stack.Screen name="Alta" component={AltaScreen} options={{ title: 'Nueva Tarea' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}