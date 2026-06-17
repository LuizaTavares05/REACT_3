import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Alunos() {
  const nomeDoUsuarioLogado = "Aluno";

  return (
    <View style={styles.telaContainer}>
      <Header nomeUsuario={nomeDoUsuarioLogado} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Portal dos Alunos</Text>

          <Text style={styles.subtitulo}>
            Gerencie as informações dos estudantes e faça novos cadastros
          </Text>

          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => alert("Listar Alunos")}
              activeOpacity={0.6}
            >
              <Text style={[styles.tabText, styles.tabTextActive]}>
                📋 Listar Alunos
              </Text>

              <View style={styles.activeIndicator} />
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.card} 
            onPress={() => alert("Adicionar Novo Aluno")} 
            activeOpacity={0.6}
            > 
            <Text style={styles.tabText}>➕ Novo Aluno</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentWrapper}>
            <View style={styles.card}>
              <Text style={styles.cardTitulo}>Área de Conteúdo</Text>

              <Text style={styles.cardDescricao}>
                Aqui será exibida a listagem dos alunos ou o formulário de
                cadastro.
              </Text>
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
    backgroundColor: "#f5f6fa",
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },

  container: {
    padding: 24,
    width: "100%",
  },

  titulo: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1e3a5f",
  },

  subtitulo: {
    color: "#64748b",
    marginBottom: 24,
    fontSize: 15,
    fontWeight: "500",
  },

  tabsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
    borderBottomWidth: 2,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 12,
  },

  tabLink: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: "relative",
  },

  tabLinkActive: {
    backgroundColor: "rgba(30, 58, 95, 0.08)",
  },

  tabText: {
    color: "#64748b",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  tabTextActive: {
    color: "#1e3a5f",
  },

  activeIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -14,
    height: 3,
    backgroundColor: "#1e3a5f",
    borderRadius: 2,
  },

  contentWrapper: {
    minHeight: 300,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,

    elevation: 4,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },

  cardTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 12,
  },

  cardDescricao: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
});
