import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthContext'; 
import api from '../../../services/api';

export default function EditarAluno() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { cores } = useAuth();

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
      <View style={[styles.containerCentrado, { backgroundColor: cores.background }]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={[styles.textoCarregando, { color: cores.texto }]}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.criarWrapper, { backgroundColor: cores.background }]}>
      <Text style={[styles.criarTitle, { color: cores.texto }]}>Editar Informações do Aluno</Text>
      
      <View style={[styles.formulario, { backgroundColor: cores.card, borderColor: cores.borda }]}>
        <TextInput 
          style={[styles.input, { backgroundColor: cores.background, color: cores.texto, borderColor: cores.borda }]}
          placeholder="Nome do Aluno" 
          placeholderTextColor={cores.textoSecundario}
          value={nome} 
          onChangeText={setNome} 
        />
        
        <TextInput 
          style={[styles.input, { backgroundColor: cores.background, color: cores.texto, borderColor: cores.borda }]}
          placeholder="Matrícula" 
          placeholderTextColor={cores.textoSecundario}
          keyboardType="numeric"
          value={matricula} 
          onChangeText={setMatricula} 
        />
        
        <TextInput 
          style={[styles.input, { backgroundColor: cores.background, color: cores.texto, borderColor: cores.borda }]}
          placeholder="Curso" 
          placeholderTextColor={cores.textoSecundario}
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
    </View>
  );
}

const styles = StyleSheet.create({
  criarWrapper: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  containerCentrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarregando: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  criarTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  formulario: {
    width: '100%',
    padding: 24,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4, 
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 14,
  },
  containerBotoes: {
    flexDirection: 'row', 
    gap: 10, 
    width: '100%',
    marginTop: 6,
  },
  btnBase: {
    flex: 1, 
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  btnSalvar: {
    backgroundColor: '#10b981',
  },
  btnCancelar: {
    backgroundColor: '#ef4444',
  },
  btnTexto: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});