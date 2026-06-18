import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Disciplinas() {
  const disciplinas = [
    {
      nome: "Programação Web",
      cargaHoraria: "80h",
    },
    {
      nome: "Banco de Dados",
      cargaHoraria: "60h",
    },
    {
      nome: "Estrutura de Dados",
      cargaHoraria: "80h",
    },
    {
      nome: "Programação Orientada a Objetos",
      cargaHoraria: "80h",
    },
    {
      nome: "Engenharia de Software",
      cargaHoraria: "60h",
    },
    {
      nome: "Redes de Computadores",
      cargaHoraria: "60h",
    },
    {
      nome: "Segurança da Informação",
      cargaHoraria: "40h",
    },
    {
      nome: "Desenvolvimento Mobile",
      cargaHoraria: "60h",
    },
  ];

  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.conteudoPrincipal}>
          <Text style={styles.titulo}>Disciplinas</Text>
          <Text style={styles.subtitulo}>Gerenciamento das disciplinas</Text>
          <Text style={styles.descricao}>
            Visualize as disciplinas disponíveis
          </Text>

          <FlatList
            data={disciplinas}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.linhaGrid}
            showsVerticalScrollIndicator={false}
            style={styles.lista}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.carga}>
                  Carga Horária: {item.cargaHoraria}
                </Text>

                <TouchableOpacity style={styles.botao}>
                  <Text style={styles.botaoTexto}>Ver Conteúdo</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    padding: 20,
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: "center",
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: "center",
  },

  descricao: {
    fontSize: 16,
    color: '#555',
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },

  lista: {
    width: '100%',
  },

  linhaGrid: {
    justifyContent: 'space-between',
    width: '100%',
  },

  card: {
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 15,
    borderRadius: 12,
    elevation: 4,
    width: '48%',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },

  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 10,
    minHeight: 44,
  },

  carga: {
    color: "#555",
    marginBottom: 15,
  },

  botao: {
    backgroundColor: "#003366",
    padding: 10,
    borderRadius: 8,
    minHeight: 44,
  },

  botaoTexto: {
    color: "#fff",
    textAlign: "center",
  },
});
