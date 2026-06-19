import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../../context/AuthContext"; 
import api from "../../../services/api";

export default function ListarAlunos() {
  const [listaAlunos, setListaAlunos] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigation = useNavigation<any>();
  const { cores, isDarkMode } = useAuth(); 

  const buscarAlunos = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/alunos");
      setListaAlunos(response.data);
    } catch (error) {
      console.error("Erro na requisição GET: ", error);
      Alert.alert("Erro", "Não foi possível carregar a lista de alunos.");
    } finally {
      setCarregando(false);
    }
  };

  const confirmarExclusao = (id: number, nome: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir o aluno ${nome || ""}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deletarAluno(id),
        },
      ],
    );
  };

  const deletarAluno = async (id: number) => {
    try {
      const response = await api.delete(`/alunos/${id}`);

      if (response.status === 204 || response.status === 200) {
        Alert.alert("Sucesso", "Aluno removido com sucesso!");
        setListaAlunos(listaAlunos.filter((aluno) => aluno.id !== id));
      }
    } catch (error) {
      console.error("Erro ao deletar aluno: ", error);
      Alert.alert("Erro", "Não foi possível excluir the aluno.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      buscarAlunos();
    }, [])
  );

  const alunosFiltrados = listaAlunos.filter((aluno) => {
    const termo = busca.toLowerCase();
    return (
      aluno.nome?.toLowerCase().includes(termo) ||
      aluno.matricula?.toString().toLowerCase().includes(termo)
    );
  });

  const renderItemAluno = ({ item, index }: any) => {
    const backgroundDoCard = isDarkMode 
      ? cores.card 
      : (index % 2 === 0 ? "#ffffff" : "#f9fafb");

    return (
      <View
        style={[
          styles.card, 
          { backgroundColor: backgroundDoCard, borderColor: cores.borda }
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={[styles.cardId, { color: cores.textoSecundario }]}>ID: {item.id}</Text>
          <Text style={[styles.cardMatricula, { color: cores.textoSecundario }]}>Matrícula: {item.matricula}</Text>
        </View>

        <Text style={[styles.cardNome, { color: cores.texto }]}>{item.nome}</Text>
        <Text style={[styles.cardCurso, { color: cores.textoSecundario }]}>Curso: {item.curso}</Text>

        <View style={[styles.acoesContainer, { borderTopColor: isDarkMode ? cores.borda : "#f3f4f6" }]}>
          <TouchableOpacity
            style={[styles.btnTabela, styles.btnEditar]}
            onPress={() => navigation.navigate("EditarAluno", { id: item.id })}
            activeOpacity={0.7}
          >
            <Text style={styles.btnTexto}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnTabela, styles.btnExcluir]}
            onPress={() => confirmarExclusao(item.id, item.nome)}
            activeOpacity={0.7}
          >
            <Text style={styles.btnTexto}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.alunosWrapper, { backgroundColor: cores.background }]}>
      <Text style={[styles.alunosTitle, { color: cores.texto }]}>Lista de Alunos Cadastrados</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput, 
            { backgroundColor: cores.card, color: cores.texto, borderColor: cores.borda }
          ]}
          placeholder="Filtrar por nome ou matrícula"
          placeholderTextColor={cores.textoSecundario}
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <FlatList
        data={alunosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItemAluno}
        refreshing={carregando}
        onRefresh={buscarAlunos}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={[styles.mensagemVaziaContainer, { backgroundColor: cores.card, borderColor: cores.borda }]}>
            <Text style={[styles.mensagemVazia, { color: cores.textoSecundario }]}>
              {listaAlunos.length === 0
                ? "Nenhum aluno cadastrado até o momento."
                : "Nenhum aluno ou matrícula corresponde à busca."}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  alunosWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  alunosTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderRadius: 8,
    fontSize: 14,
  },
  mensagemVaziaContainer: {
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    marginTop: 10,
  },
  mensagemVazia: {
    fontSize: 15,
    textAlign: "center",
  },
  card: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardId: {
    fontSize: 12,
    fontWeight: "700",
  },
  cardMatricula: {
    fontSize: 12,
    fontWeight: "600",
  },
  cardNome: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  cardCurso: {
    fontSize: 14,
    marginBottom: 12,
  },
  acoesContainer: {
    flexDirection: "row",
    gap: 8,
    borderTopWidth: 1,
    paddingTop: 12,
  },
  btnTabela: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  btnEditar: {
    backgroundColor: "#f59e0b",
  },
  btnExcluir: {
    backgroundColor: "#ef4444",
  },
  btnTexto: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
});