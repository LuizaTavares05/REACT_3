import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../../services/api';

export default function EditarAluno() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { id } = route.params || {}; 

  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDadosAluno = async () => {
      if (!id) {
        Alert.alert("Erro", "ID do aluno não foi fornecido.");
        navigation.navigate("HomeAlunos");
        return;
      }

      try {
        setCarregando(true);
        const response = await api.get(`/alunos/${id}`);
        setNome(response.data.nome);
        setMatricula(response.data.matricula);
        setCurso(response.data.curso);
      } catch (error) {
        console.error("Erro ao carregar dados do aluno:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do aluno.");
        navigation.navigate("HomeAlunos");
      } finally {
        setCarregando(false);
      }
    };

    carregarDadosAluno();
  }, [id, navigation]);

  const atualizarAluno = async () => {

    if (!nome.trim() || !matricula.trim() || !curso.trim()) {
      Alert.alert("Aviso", "Todos os campos são obrigatórios.");
      return;
    }

    const alunoAtualizado = { nome, matricula, curso };

    try {
      const response = await api.put(`/alunos/${id}`, alunoAtualizado);
      
      if (response.status === 200 || response.status === 204) {
        Alert.alert("Sucesso", "Aluno atualizado com sucesso!");
        navigation.navigate("HomeAlunos"); 
      }
    } catch (error) {
      console.error("Erro na requisição", error);
      Alert.alert("Erro", "Não foi possível atualizar o aluno na API.");
    }
  };

  if (carregando) {
    return (
      <View style={styles.containerCentrado}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.textoCarregando}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.criarWrapper}>
      <Text style={styles.criarTitle}>Editar Informações do Aluno</Text>
      
      <View style={styles.formulario}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do Aluno" 
          placeholderTextColor="#9ca3af"
          value={nome} 
          onChangeText={setNome} 
        />
        
        <TextInput 
          style={styles.input}
          placeholder="Matrícula" 
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
          value={matricula} 
          onChangeText={setMatricula} 
        />
        
        <TextInput 
          style={styles.input}
          placeholder="Curso" 
          placeholderTextColor="#9ca3af"
          value={curso} 
          onChangeText={setCurso} 
        />

        <View style={styles.containerBotoes}>
          <TouchableOpacity 
            style={[styles.btnBase, styles.btnSalvar]} 
            onPress={atualizarAluno}
            activeOpacity={0.7}
          >
            <Text style={styles.btnTexto}>Salvar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.btnBase, styles.btnCancelar]} 
            onPress={() => navigation.navigate("HomeAlunos")} 
            activeOpacity={0.7}
          >
            <Text style={styles.btnTexto}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  criarWrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  containerCentrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  textoCarregando: {
    marginTop: 10,
    color: '#1e3a5f',
    fontSize: 16,
    fontWeight: '500',
  },
  criarTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e3a5f',
    marginBottom: 20,
    textAlign: 'center',
  },
  formulario: {
    width: '100%',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    // Sombra para iOS
    shadowColor: '#303a5f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    // Sombra para Android
    elevation: 4, 
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: '#f9fafb',
    color: '#000000',
    marginBottom: 14,
  },
  containerBotoes: {
    flexDirection: 'row', 
    gap: 10, 
    width: '100%',
    marginTop: 6,
  },
  btnBase: {
    flex: 1, // Faz com que os dois botões dividam o espaço igualmente lado a lado
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  btnSalvar: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  btnCancelar: {
    backgroundColor: '#ef4444',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  btnTexto: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
