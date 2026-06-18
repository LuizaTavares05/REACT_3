import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Sobre({ navigation }: any) {
  const nomeDoUsuarioLogado = 'Visitante';

          const integrantes = [
            {
                id: 1,
                nome: 'Gabriel Aguiar',
                foto: require('../../../assets/Gabriel.jpg'),
            },
            {
                id: 2,
                nome: 'Luiza Tavares',
                foto: require('../../../assets/Luiza.jpg'),
            },
            {
                id: 3,
                nome: 'Danielle Carvalho',
                foto: require('../../../assets/Danielle.jpg'),
            },
            {
                id: 4,
                nome: 'Vanessa Xavier',
                foto: require('../../../assets/Vanessa.jpg'),
            },
            {
                id: 5,
                nome: 'Pedro Reis',
                foto: require('../../../assets/Pedro.jpeg'),
            },
        ];

  return (
    <View style={styles.telaContainer}>
      <Header nomeUsuario={nomeDoUsuarioLogado} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.conteudoPrincipal}>
          <Text style={styles.titulo}>Sobre este trabalho</Text>

          <Text style={styles.descricao}>
            Este é um aplicativo acadêmico de exemplo criado como trabalho prático. O objetivo
            é gerenciar informações básicas de alunos e disciplinas, permitindo visualizar,
            criar e editar registros em uma interface simples e intuitiva.
          </Text>

          <Text style={styles.descricao}>
            Tecnologias: React Native + Expo. Estrutura do projeto pensada para facilitar a
            extensão: componentes reutilizáveis (Header, Footer), navegação entre páginas e
            telas responsivas.
          </Text>

           <Text style={styles.subtitulo}>Integrantes do grupo</Text>

          <View style={styles.cardsContainer}>
            {integrantes.map((integrante) => (
              <View key={integrante.id} style={styles.card}>
                <Image source={integrante.foto} style={styles.foto} />
                <Text style={styles.nomeIntegrante}>{integrante.nome}</Text>
              </View>
            ))}
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
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 15,
  },

    subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 15,
  },

  descricao: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 22,
  },

  cardsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },

  card: {
    width: 140,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 15,
  },

  foto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },

  nomeIntegrante: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2c3e50',
    textAlign: 'center',
  },
});
