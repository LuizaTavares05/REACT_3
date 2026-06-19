import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext'; 
import Footer from '../../components/Footer';
import Input from '../../components/Input'; 
import Header from '../../components/Header';

export default function Disciplinas() {
  const { cores, isDarkMode } = useAuth(); 

  const disciplinas = [
    { nome: "Big Data", cargaHoraria: "80h" },
    { nome: "Banco de Dados", cargaHoraria: "60h" },
    { nome: "Programação Web", cargaHoraria: "80h" },
    { nome: "Estrutura de Dados", cargaHoraria: "80h" },
    { nome: "Inteligência Artificial", cargaHoraria: "60h" },
    { nome: "Computação em Nuvem (Cloud)", cargaHoraria: "60h" },
    { nome: "Engenharia de Software", cargaHoraria: "70h" },
    { nome: "Redes de Computadores", cargaHoraria: "60h" },
    { nome: "Segurança da Informação", cargaHoraria: "40h" },
    { nome: "Desenvolvimento Mobile", cargaHoraria: "60h" },   
  ];

  const [pesquisa, setPesquisa] = useState("");
  
  const disciplinasFiltradas = disciplinas.filter((disciplina) => 
    disciplina.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: cores.background }]}>
      <Header/>

      <View style={styles.conteudoInterno}>
        <Text style={[styles.titulo, { color: cores.texto }]}>Disciplinas</Text>
        <Text style={[styles.subtitulo, { color: cores.textoSecundario }]}>Gerenciamento das disciplinas</Text>
        <Text style={[styles.descricao, { color: cores.textoSecundario }]}>Visualize as disciplinas disponíveis</Text>

        <View style={styles.containerInput}>
          <Input 
            placeholder='Pesquisar disciplina...' 
            value={pesquisa} 
            onChangeText={setPesquisa} 
          />
        </View>
     
        <FlatList
          data={disciplinasFiltradas} 
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listaScroll}

          ListEmptyComponent={
            <Text style={[styles.naoEncontrado, { color: cores.textoSecundario }]}>
              Nenhuma disciplina encontrada!
            </Text>
          }

          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: cores.card }]}>
              <Text style={[styles.nome, { color: isDarkMode ? cores.texto : '#003366' }]}>
                {item.nome}
              </Text>
              <Text style={[styles.carga, { color: cores.textoSecundario }]}>
                Carga Horária: {item.cargaHoraria}
              </Text>

              <TouchableOpacity style={[styles.botao, { backgroundColor: cores.primaria }]} activeOpacity={0.7}>
                <Text style={styles.botaoTexto}>Ver Conteúdo</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <Footer />   
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudoInterno: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  titulo: {
    paddingTop: 15,
    paddingBottom: 5,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center"
  },
  subtitulo: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: '500',
  },
  descricao: {
    textAlign: "center",
    marginBottom: 15,
    marginTop: 4,
    fontSize: 13,
  },
  containerInput: {
    paddingHorizontal: 8,
    marginBottom: 5,
  },
  listaScroll: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 15,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    justifyContent: 'space-between',
  },
  nome: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
  },
  carga: {
    marginBottom: 15,
    fontSize: 13,
  },
  botao: {
    padding: 10,
    borderRadius: 8,
    marginTop: 'auto', 
  },
  botaoTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: '600',
    fontSize: 13,
  },
  naoEncontrado: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 30,
  }
});