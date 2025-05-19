import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Login from '../screens/Login';
import AdminScreen from '../screens/Admin';
import AdministrativoScreen from '../screens/Administrativo';
import CandidatoScreen from '../screens/Candidato';
import VotanteScreen from '../screens/Votante';
import UserManagementScreen from '../screens/UserManagementScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AdminStack({ onLogout }: { onLogout: () => void }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminMain"
        component={AdminScreen}
        options={{
          title: 'Administrador',
          headerRight: () => (
            <Ionicons
              name="log-out-outline"
              size={28}
              color="red"
              style={{ marginRight: 15 }}
              onPress={() => {
                Alert.alert(
                  'Cerrar sesión',
                  '¿Estás seguro que deseas cerrar sesión?',
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Cerrar sesión', style: 'destructive', onPress: onLogout },
                  ],
                  { cancelable: true }
                );
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function MainTabs({ onLogout }: { onLogout: () => void }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help';

          if (route.name === 'Administrador') iconName = 'person-circle';
          else if (route.name === 'Administracion') iconName = 'person-add';
          else if (route.name === 'Candidato') iconName = 'person';
          else if (route.name === 'Votante') iconName = 'people';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: route.name !== 'Administrador', // Admin usa AdminStack con header
      })}
    >
      <Tab.Screen name="Administrador">
        {() => <AdminStack onLogout={onLogout} />}
      </Tab.Screen>
      <Tab.Screen name="Administracion" component={AdministrativoScreen} />
      <Tab.Screen name="Candidato" component={CandidatoScreen} />
      <Tab.Screen name="Votante" component={VotanteScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificamos sesión guardada al iniciar
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('usuario');
      if (user) {
        setIsLoggedIn(true);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('usuario');
    setIsLoggedIn(false);
    Alert.alert('✅ Sesión cerrada');
  };

  if (loading) {
    // Mientras carga sesión, puedes mostrar un splash o null
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login">
            {(props) => <Login {...props} onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="MainTabs">
              {(props) => <MainTabs {...props} onLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="UserManagement" component={UserManagementScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
