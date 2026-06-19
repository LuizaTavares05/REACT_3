import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import api from "../../../services/api";

export default function ListarAlunos() {
  const [listaAlunos, setListaAlunos] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigation = useNavigation<any>();

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
      Alert.alert("Erro", "Não foi possível excluir o aluno.");
    }
  };

  useEffect(() => {
    buscarAlunos();
  }, []);

  const alunosFiltrados = listaAlunos.filter((aluno) => {
    const termo = busca.toLowerCase();
    return (
      aluno.nome?.toLowerCase().includes(termo) ||
      aluno.matricula?.toString().toLowerCase().includes(termo)
    );
  });

  const renderItemAluno = ({ item, index }: any) => (
    <View
      style={[styles.card, index % 2 === 0 ? styles.cardPar : styles.cardImpar]}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardId}>ID: {item.id}</Text>
        <Text style={styles.cardMatricula}>Matrícula: {item.matricula}</Text>
      </View>

      <Text style={styles.cardNome}>{item.nome}</Text>
      <Text style={styles.cardCurso}>Curso: {item.curso}</Text>

      <View style={styles.acoesContainer}>
        <TouchableOpacity
          style={[styles.btnTabela, styles.btnEditar]}
          onPress={() => navigation.navigate("EditarAluno", { id: item.id })}
        >
          <Text style={styles.btnTexto}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnTabela, styles.btnExcluir]}
          onPress={() => confirmarExclusao(item.id, item.nome)}
        >
          <Text style={styles.btnTexto}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.alunosWrapper}>
      <Text style={styles.alunosTitle}>Lista de Alunos Cadastrados</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Filtrar por nome ou matrícula"
          placeholderTextColor="#9ca3af"
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
        ListEmptyComponent={() => (
          <View style={styles.mensagemVaziaContainer}>
            <Text style={styles.mensagemVazia}>
              {listaAlunos.length === 0
                ? "Nenhum aluno cadastrado até o momento."
                : "Nenhum aluno ou matrícula corresponde à busca."}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  alunosWrapper: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  alunosTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e3a5f",
    marginBottom: 16,
    textAlign: "center",
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#f9fafb",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    fontSize: 14,
    color: "#000000",
  },
  mensagemVaziaContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    marginTop: 10,
  },
  mensagemVazia: {
    color: "#64748b",
    fontSize: 15,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    // Sombra do Card
    shadowColor: "#1e3a5f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardPar: {
    backgroundColor: "#ffffff",
  },
  cardImpar: {
    backgroundColor: "#f9fafb", // Zebrado equivalente ao CSS original
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardId: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748b",
  },
  cardMatricula: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
  cardNome: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
  },
  cardCurso: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 12,
  },
  acoesContainer: {
    flexDirection: "row",
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
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
