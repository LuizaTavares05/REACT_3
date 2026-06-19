import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigationState } from '@react-navigation/native';

// Importação dos componentes Header e Footer
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Importe as telas
import ListarAlunos from './Listar/ListarAluno';
import CriarAluno from './Criar/CriarAluno';
import EditarAluno from './Editar/EditarAluno';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function AbasAlunos() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1e3a5f',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: { fontSize: 13, fontWeight: '700', letterSpacing: 0.3 },
        tabBarIndicatorStyle: {
          backgroundColor: '#1e3a5f',
          height: 3,
          borderRadius: 2,
        },
        tabBarStyle: {
          backgroundColor: '#f3f4f6',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 2,
          borderBottomColor: '#e5e7eb',
          marginBottom: 16,
        },
        tabBarPressColor: 'rgba(30, 58, 95, 0.05)',
      }}
    >
      <Tab.Screen 
        name="ListarAlunosTab" 
        component={ListarAlunos} 
        options={{ tabBarLabel: '📋 Listar Alunos' }}
      />
      <Tab.Screen 
        name="CriarAlunoTab" 
        component={CriarAluno} 
        options={{ tabBarLabel: '➕ Novo Aluno' }}
      />
    </Tab.Navigator>
  );
}

export default function Alunos() {
  const nomeDoUsuarioLogado = "Aluno";

  const estadoDaNavegacao = useNavigationState(state => state);

  const obterNomeRotaAtual = (state: any): string => {
    if (!state || !state.routes || state.index === undefined) return '';
    const route = state.routes[state.index];
    if (route.state) {
      return obterNomeRotaAtual(route.state);
    }
    return route.name;
  };

  const rotaAtiva = obterNomeRotaAtual(estadoDaNavegacao);

  const deveMostrarHeaderEFooter = rotaAtiva !== 'EditarAluno' && rotaAtiva !== 'CriarAlunoTab';

  return (
    <SafeAreaView style={styles.container}>
      {deveMostrarHeaderEFooter && <Header nomeUsuario={nomeDoUsuarioLogado} />}

      {deveMostrarHeaderEFooter && (
        <View style={styles.headerContainer}>
          <Text style={styles.titulo}>Portal dos Alunos</Text>
          <Text style={styles.subtitulo}>Gerencie as informações dos estudantes e faça novos cadastros</Text>
        </View>
      )}

      <View style={styles.conteudoNavegacao}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeAlunos" component={AbasAlunos} />
          <Stack.Screen name="EditarAluno" component={EditarAluno} />
        </Stack.Navigator>
      </View>

      {deveMostrarHeaderEFooter && <Footer />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: '#f3f4f6',
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e3a5f',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 12,
    lineHeight: 18,
  },
  conteudoNavegacao: {
    flex: 1,
  }
});
