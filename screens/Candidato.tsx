import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface Candidate {
  id: string;
  name: string;
  votes: number;
}

const candidates: Candidate[] = [
  { id: '1', name: 'Pedro', votes: 120 },
  { id: '2', name: 'Luis', votes: 95 },
  { id: '3', name: 'Sofia', votes: 80 },
];

export default function CandidatoScreen() {
  const candidato = ({ item }: { item: Candidate }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.votes}>Votos: {item.votes}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados Parciales</Text>
      <FlatList
        data={candidates}
        keyExtractor={(item) => item.id}
        renderItem={candidato}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay datos disponibles.</Text>
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
    marginBottom: 5,
  },
  votes: {
    color: '#00c853',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});
