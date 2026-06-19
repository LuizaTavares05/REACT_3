import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../../context/AuthContext'; 
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListarAlunos from './Listar/ListarAluno';
import CriarAluno from './Criar/CriarAluno';
import EditarAluno from './Editar/EditarAluno';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function AbasAlunos() {
  const { cores, isDarkMode } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? cores.texto : '#1e3a5f',
        tabBarInactiveTintColor: cores.textoSecundario,
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '700',
          letterSpacing: 0.3,
        },
        tabBarIndicatorStyle: {
          backgroundColor: isDarkMode ? cores.texto : '#1e3a5f',
          height: 3,
          borderRadius: 2,
        },
        tabBarStyle: {
          backgroundColor: cores.card,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: isDarkMode ? cores.borda : '#e5e7eb',
          marginBottom: 1,
        },
        tabBarPressColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(30, 58, 95, 0.05)',
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
  const { cores } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: cores.background }]}>
      <Header />

      <View style={[styles.headerContainer, { backgroundColor: cores.background }]}>
        <Text style={[styles.titulo, { color: cores.texto }]}>Portal dos Alunos</Text>

        <Text style={[styles.subtitulo, { color: cores.textoSecundario }]}>
          Gerencie as informações dos estudantes e faça novos cadastros
        </Text>
      </View>

      <View style={styles.conteudoNavegacao}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="HomeAlunos"
            component={AbasAlunos}
          />

          <Stack.Screen
            name="EditarAluno"
            component={EditarAluno}
          />
        </Stack.Navigator>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 12,
    lineHeight: 18,
  },
  conteudoNavegacao: {
    flex: 1,
  },
});