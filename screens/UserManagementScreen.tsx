import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

type Role = 'ADMIN' | 'ADMINISTRATIVO' | 'CANDIDATO' | 'VOTANTE';

type Usuario = {
  id: number;
  identificacion: string;
  username: string;
  password: string;
  role: Role;
};

const STORAGE_KEY = '@usuarios';

export default function UserManagement({ navigation }: { navigation: any }){
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [identificacion, setIdentificacion] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('ADMINISTRATIVO');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  // Cargar usuarios guardados al montar el componente
  useEffect(() => {
    const loadUsuarios = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          setUsuarios(JSON.parse(jsonValue));
        }
      } catch (e) {
        showFlash('❌ Error cargando usuarios');
      }
    };
    loadUsuarios();
  }, []);

  // Guardar usuarios cada vez que cambien
  useEffect(() => {
    const saveUsuarios = async () => {
      try {
        const jsonValue = JSON.stringify(usuarios);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      } catch (e) {
        showFlash('❌ Error guardando usuarios');
      }
    };
    saveUsuarios();
  }, [usuarios]);

  const showFlash = (msg: string) => {
    setFlashMessage(msg);
    setTimeout(() => setFlashMessage(null), 3000);
  };

  const handleSave = () => {
    if (!identificacion || !username || !password) {
      showFlash('⚠️ Todos los campos son obligatorios');
      return;
    }

    if (editingId !== null) {
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === editingId ? { ...u, identificacion, username, password, role } : u
        )
      );
      showFlash('✏️ Usuario editado correctamente');
    } else {
      if (usuarios.find(u => u.identificacion === identificacion)) {
        showFlash('⚠️ Ya existe un usuario con esta identificación');
        return;
      }
      const nuevo: Usuario = {
        id: Date.now(),
        identificacion,
        username,
        password,
        role,
      };
      setUsuarios((prev) => [...prev, nuevo]);
      showFlash('✅ Usuario creado correctamente');
    }
    resetForm();
  };

  const handleEdit = (usuario: Usuario) => {
    setIdentificacion(usuario.identificacion);
    setUsername(usuario.username);
    setPassword(usuario.password);
    setRole(usuario.role);
    setEditingId(usuario.id);
  };

  const handleDelete = (id: number) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
    showFlash('🗑️ Usuario eliminado');
    if (editingId === id) resetForm();
  };

  const handleDeleteAll = () => {
    setUsuarios([]);
    showFlash('🗑️ Todos los usuarios eliminados');
    resetForm();
  };

  const resetForm = () => {
    setIdentificacion('');
    setUsername('');
    setPassword('');
    setRole('ADMINISTRATIVO');
    setEditingId(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Gestión de Usuarios</Text>

      {flashMessage && (
        <View style={styles.flash}>
          <Text style={styles.flashText}>{flashMessage}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="🆔 Identificación"
        value={identificacion}
        onChangeText={setIdentificacion}
      />
      <TextInput
        style={styles.input}
        placeholder="👤 Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="🔒 Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>🎓 Rol:</Text>
      <View style={styles.rolesRow}>
        {(['ADMIN', 'ADMINISTRATIVO', 'CANDIDATO', 'VOTANTE'] as Role[]).map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.roleBtn, role === r && styles.roleBtnSelected]}
            onPress={() => setRole(r)}
          >
            <Text style={[styles.roleText, role === r && styles.roleTextSelected]}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonsRow}>
        <Button title={editingId ? '💾 Guardar cambios' : '➕ Agregar usuario'} onPress={handleSave} />
        {editingId && <Button title="✖️ Cancelar" color="gray" onPress={resetForm} />}
      </View>

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Button title="🗑️ Eliminar todos los usuarios" color="red" onPress={handleDeleteAll} />
      </View>
      <View style={styles.container}>
      <Button title="🔙 Volver" onPress={() => navigation.goBack()} />

      <Text style={styles.title}>📋 Gestión de Usuarios</Text>
      
      {/* resto de tu componente */}
    </View>

      <Text style={styles.subtitle}>👥 Usuarios registrados:</Text>

      {usuarios.length === 0 ? (
        <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>No hay usuarios</Text>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userRow}>
              <View style={{ flex: 1 }}>
                <Text>🆔 {item.identificacion}</Text>
                <Text>👤 {item.username}</Text>
                <Text>🎓 {item.role}</Text>
              </View>
              <View style={styles.actionBtns}>
                <Button title="✏️ Editar" onPress={() => handleEdit(item)} />
                <Button
                  title="🗑️ Eliminar"
                  color="red"
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  flash: {
    backgroundColor: '#4BB543',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  flashText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  label: { fontWeight: 'bold', marginBottom: 5 },
  rolesRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  roleBtn: {
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  roleBtnSelected: {
    backgroundColor: '#007bff',
  },
  roleText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  roleTextSelected: {
    color: 'white',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  actionBtns: {
    justifyContent: 'space-between',
  },
});
