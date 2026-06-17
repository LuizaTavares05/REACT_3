import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Header({ nomeUsuario }) {

  const usuarioLogado = true;
  let tema: "claro" | "escuro" = "escuro";

  return (
    <View style={styles.headerContainer}>
      <View style={styles.linhaSuperior}>
        <Text style={styles.titulo}>Sistema Acadêmico</Text>

        <TouchableOpacity 
          style={[
            styles.btnTema, 
            { backgroundColor: tema === "claro" ? "#fafafa" : "#34495e" }
          ]}
          onPress={() => alert("Alterar Tema")}
          activeOpacity={0.8} >
          <Text style={[styles.btnTemaTexto, { color: tema === "claro" ? "black" : "white" }]}>
            {tema === "claro" ? "☀ Claro" : "🌙 Escuro"}
          </Text>
        </TouchableOpacity>
      </View>

      {usuarioLogado && (
        <View style={styles.linhaInferior}>
          {nomeUsuario ? (
            <Text style={styles.nomeUsuario}>Olá, {nomeUsuario}!</Text>
          ) : null}
          <TouchableOpacity 
            style={styles.btnLogout} 
            onPress={() => alert("Fazer Logout")}
            activeOpacity={0.8}>
            <Text style={styles.btnLogoutTexto}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#1e3a5f',
    paddingTop: 50,            
    paddingBottom: 16,
    paddingHorizontal: 20,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 4,
    shadowColor: '#1e3a5f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  linhaSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  btnTema: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  btnTemaTexto: {
    fontSize: 12,
    fontWeight: '600',
  },
  linhaInferior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  nomeUsuario: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
  },
  btnLogout: {
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  btnLogoutTexto: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
});