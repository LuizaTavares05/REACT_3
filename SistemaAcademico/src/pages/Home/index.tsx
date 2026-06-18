import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Home({ navigation }: any) {
  const nomeDoUsuarioLogado = 'Aluno';

    useEffect(() => {
    alert("Bem-Vindo!")

  }, []);

  return (
    <View style={styles.telaContainer}>
      <Header nomeUsuario={nomeDoUsuarioLogado} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.conteudoPrincipal}>
          <Text style={styles.titulo}>
            Bem-vindo ao Portal Acadêmico
          </Text>

          <Text style={styles.descricao}>
            Selecione uma opção abaixo para navegar entre as seções do sistema.
          </Text>

          <View style={styles.gridCards}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Alunos')}
              activeOpacity={0.6}
            >
              <Text style={styles.cardIcone}>👥</Text>
              <Text style={styles.cardTitulo}>Alunos</Text>
              <Text style={styles.cardDescricao}>
                Gerencie a lista de alunos, crie novos registros e edite
                informações existentes.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Disciplinas')}
              activeOpacity={0.6}
            >
              <Text style={styles.cardIcone}>📚</Text>
              <Text style={styles.cardTitulo}>Disciplinas</Text>
              <Text style={styles.cardDescricao}>
                Visualize a grade curricular e informações sobre as disciplinas
                ofertadas.
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  telaContainer: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 0,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    width: '100%',
  },

  conteudoPrincipal: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },

  titulo: {
    fontSize: 26,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 15,
  },

  descricao: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 35,
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
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
  },
});