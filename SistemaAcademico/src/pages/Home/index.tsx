import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Footer from '../../components/Footer';

export default function Home({ navigation }) {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.titulo}>Bem-vindo ao Portal Acadêmico</Text>
      
      <Text style={styles.descricao}>
        Selecione uma opção abaixo para navegar entre as seções do sistema.
      </Text>
      
      <View style={styles.gridCards}>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => alert("Página Alunos")} 
          activeOpacity={0.6}>
          <Text style={styles.cardIcone}>👥</Text>
          <Text style={styles.cardTitulo}>Alunos</Text>
          <Text style={styles.cardDescricao}>
            Gerencie a lista de alunos, crie novos registros e edite informações existentes.
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => alert("Página Disciplinas")}
          activeOpacity={0.6}>
          <Text style={styles.cardIcone}>📚</Text>
          <Text style={styles.cardTitulo}>Disciplinas</Text>
          <Text style={styles.cardDescricao}>
            Visualize a grade curricular e informações sobre as disciplinas ofertadas.
          </Text>
        </TouchableOpacity>
      </View>
      <Footer/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f5f6fa', 
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 15,
  },
  descricao: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  gridCards: {
    width: '100%',
    gap: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 25,
    width: '100%',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  cardIcone: {
    fontSize: 32,
    marginBottom: 10,
  },
  cardTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  cardDescricao: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  }
});