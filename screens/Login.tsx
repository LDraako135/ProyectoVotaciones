import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const users = [
  { username: 'admin', password: '1234', role: 'ADMIN' },
  { username: 'user1', password: 'abcd', role: 'VOTANTE' },
];

export default function Login({ onLogin }: { onLogin: (user: any) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true); // Para mostrar cargando mientras buscamos usuario guardado

  useEffect(() => {
    const checkLoggedUser = async () => {
      try {
        const jsonUser = await AsyncStorage.getItem('usuario');
        if (jsonUser) {
          const user = JSON.parse(jsonUser);
          onLogin(user);
        }
      } catch (e) {
        // No hacemos nada si falla
      } finally {
        setLoading(false);
      }
    };
    checkLoggedUser();
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('⚠️ Campos requeridos', 'Por favor ingresa usuario y contraseña.');
      return;
    }

    const user = users.find(u => u.username === username);

    if (!user) {
      Alert.alert('❌ Usuario no encontrado');
      return;
    }

    if (user.password !== password) {
      Alert.alert('❌ Contraseña incorrecta');
      return;
    }

    await AsyncStorage.setItem('usuario', JSON.stringify(user));
    onLogin(user);

    Alert.alert(
      user.role === 'ADMIN' ? '👑 Bienvenido administrador' : '✅ Bienvenido'
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Usuario"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Ingresar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
});
