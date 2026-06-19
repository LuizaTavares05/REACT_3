import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Home({ navigation }: any) {
  const { cores } = useAuth(); 

  return (
    <View style={[styles.telaContainer, { backgroundColor: cores.background }]}>
      <Header naoVoltar={true}/>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.conteudoPrincipal}>
          
          <Text style={[styles.titulo, { color: cores.texto }]}>
            Bem-vindo ao Portal Acadêmico
          </Text>

          <Text style={[styles.descricao, { color: cores.textoSecundario }]}>
            Selecione uma opção abaixo para navegar entre as seções do sistema.
          </Text>

          <View style={styles.gridCards}>
            
            <View style={[styles.card, { backgroundColor: cores.card }]}>
              <TouchableOpacity
                style={styles.cardClique}
                onPress={() => navigation.navigate('Alunos')}
                activeOpacity={0.6}
              >
                <Text style={styles.cardIcone}>👥</Text>
                <Text style={[styles.cardTitulo, { color: cores.texto }]}>Alunos</Text>
                <Text style={[styles.cardDescricao, { color: cores.textoSecundario }]}>
                  Gerencie a lista de alunos, crie novos registros e edite
                  informações existentes.
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.card, { backgroundColor: cores.card }]}>
              <TouchableOpacity
                style={styles.cardClique}
                onPress={() => navigation.navigate('Disciplinas')}
                activeOpacity={0.6}
              >
                <Text style={styles.cardIcone}>📚</Text>
                <Text style={[styles.cardTitulo, { color: cores.texto }]}>Disciplinas</Text>
                <Text style={[styles.cardDescricao, { color: cores.textoSecundario }]}>
                  Visualize a grade curricular e informações sobre as disciplinas
                  ofertadas.
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.card, { backgroundColor: cores.card }]}>
              <TouchableOpacity
                style={styles.cardClique}
                onPress={() => navigation.navigate('Sobre')}
                activeOpacity={0.6}
              >
                <Text style={styles.cardIcone}>📖</Text>
                <Text style={[styles.cardTitulo, { color: cores.texto }]}>Sobre</Text>
                <Text style={[styles.cardDescricao, { color: cores.textoSecundario }]}>
                  Saiba um pouco mais sobre nós.
                </Text>
              </TouchableOpacity>
            </View>

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
    textAlign: 'center',
    marginBottom: 15,
  },

  descricao: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 35,
    lineHeight: 22,
  },

  gridCards: {
    width: '100%',
    gap: 20,
  },

  card: {
    borderRadius: 12,
    width: '100%',
    elevation: 4,
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },

  cardClique: {
    width: '100%',
    padding: 25,
    alignItems: 'center',
  },

  cardIcone: {
    fontSize: 32,
    marginBottom: 10,
  },

  cardTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  cardDescricao: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});