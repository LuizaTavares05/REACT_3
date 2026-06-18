import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  nomeUsuario: string;
  noLogin?: boolean; 
  naoVoltar?: boolean;
}

export default function Header({ nomeUsuario, noLogin = false, naoVoltar = false }: HeaderProps) {

  const navigation = useNavigation<any>();

  function handleLogout() {
    navigation.navigate('Login');
  }

  function handleVoltar() {
    navigation.navigate('Home');
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.linhaSuperior}>
        <Text style={styles.titulo}>Sistema Acadêmico</Text>
      </View>

      {!noLogin && (
        <View style={styles.linhaInferior}>
          {nomeUsuario ? (
            <Text style={styles.nomeUsuario}>Olá, {nomeUsuario}!</Text>
          ) : null}
          
          <View style={styles.grupoBotoes}>

            {!naoVoltar && (
              <TouchableOpacity
                style={styles.btnVoltar}
                onPress={handleVoltar}
                activeOpacity={0.7}>
                <Text style={styles.btnVoltarTexto}>Voltar</Text>
              </TouchableOpacity>
              )}
              
              <TouchableOpacity
                style={styles.btnLogout}
                onPress={handleLogout}>
                <Text style={styles.btnLogoutTexto}>Sair</Text>
              </TouchableOpacity>
            </View>
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
    flex: 1, 
    marginRight: 10,
  },
  grupoBotoes: {
    flexDirection: 'row',
    gap: 8,
  },
  btnVoltar: {
    backgroundColor: '#475569', 
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  btnVoltarTexto: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
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