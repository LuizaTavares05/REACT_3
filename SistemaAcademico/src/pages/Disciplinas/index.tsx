import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function Disciplinas() {

   const disciplinas = [
   {
   nome: "Programação Web",
   cargaHoraria: "80h"
    },
   {
   nome: "Banco de Dados",
   cargaHoraria: "60h"
   },
   {
   nome: "Estrutura de Dados",
   cargaHoraria: "80h"
   },
   {
   nome: "Programação Orientada a Objetos",
   cargaHoraria: "80h"
   },
   {
   nome: "Engenharia de Software",
   cargaHoraria: "60h"
   },
   {
   nome: "Redes de Computadores",
   cargaHoraria: "60h"
   },
   {
   nome: "Segurança da Informação",
   cargaHoraria: "40h"
   },
   {
   nome: "Desenvolvimento Mobile",
   cargaHoraria: "60h"
   },
   
   ];

  return (
    <View style = {styles.container}>
      <Text style = {styles.titulo}>Disciplinas</Text>
      <Text style = {styles.subtitulo}>Gerenciamento das disciplinas</Text>
      <Text style = {styles.descricao}>Visualize as disciplinas disponíveis</Text>
   
        <FlatList
            data={disciplinas} 
            keyExtractor={(index) => index.toString()}
            numColumns={2}
            showsVerticalScrollIndicator = {false}
            renderItem={({item}) => (
             <View style = {styles.card}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style = {styles.carga}>Carga Horária: {item.cargaHoraria}</Text>

                    <TouchableOpacity style = {styles.botao}>
                        <Text style = {styles.botaoTexto}>Ver Conteúdo</Text>
                    </TouchableOpacity>
            </View>
            )}
        />
    </View>    
  );
}

const styles = StyleSheet.create({

 container: {
  flex: 1,
  padding: 20,
  backgroundColor: "#f5f5f5"
 },

 titulo: {
  padding:20,
  fontSize: 28,
  fontWeight: "bold",
  textAlign: "center"
 },

 subtitulo: {
  fontSize: 18,
  textAlign: "center",
  marginTop: 10
 },

 descricao: {
  textAlign: "center",
  marginBottom: 20,
  marginTop: 10
 },

 card: {
  flex: 1,
  backgroundColor: "#fff",
  margin: 8,
  padding: 15,
  borderRadius: 12,
  elevation: 4
 },

 nome: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#003366",
  marginBottom: 10
 },

 carga: {
  color: "#555",
  marginBottom: 15
 },

 botao: {
  backgroundColor: "#003366",
  padding: 10,
  borderRadius: 8
 },

 botaoTexto: {
  color: "#fff",
  textAlign: "center"
 }

});
