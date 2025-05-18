import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface Candidate {
  id: string;
  name: string;
  description: string;
}

const candidatos: Candidate[] = [
  { id: '1', name: 'Pedro', description: 'Propuesta de educativa' },
  { id: '2', name: 'Luis', description: 'Enfoque en desarrollo' },
  { id: '3', name: 'Sofia', description: 'Mejoras en infraestructura' },
];

export default function VotanteScreen() {
  const candidato = ({ item }: { item: Candidate }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity style={styles.voteButton}>
          <Text style={styles.voteText}>Votar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige un Candidato</Text>
      <FlatList
        data={candidatos}
        keyExtractor={(item) => item.id}
        renderItem={candidato}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay candidatos disponibles.</Text>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    color: 'white',
  },
  description: {
    color: '#b0b0b0',
    fontSize: 14,
  },
  voteButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  voteText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});
