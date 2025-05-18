import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

interface Voter {
  id: string;
  name: string;
  validated: boolean;
}

const voters: Voter[] = [
  { id: '1', name: 'Juan', validated: false },
  { id: '2', name: 'Carlos ', validated: false },
];

export default function AdministrativoScreen() {
  const Voto = ({ item }: { item: Voter }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.validateBtn]}>
            <Text style={styles.buttonText}>Validar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.rejectBtn]}>
            <Text style={styles.buttonText}>Rechazar</Text>
          </TouchableOpacity>
        </View>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validación de Votantes</Text>
      <FlatList
        data={voters}
        keyExtractor={(item) => item.id}
        renderItem={Voto}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay votantes pendientes.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2c2f33',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  validated: {
    color: '#28a745',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  validateBtn: {
    backgroundColor: '#007bff',
  },
  rejectBtn: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  emptyText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});
