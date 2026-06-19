import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  noLogin?: boolean; 
  naoVoltar?: boolean;
}

export default function Header({ noLogin = false, naoVoltar = false }: HeaderProps) {
  const navigation = useNavigation<any>();
  const { logout, primeiroNome, cores, isDarkMode, toggleTheme } = useAuth();

  function handleLogout() {
    logout();
    navigation.navigate('Login');
  }

  function handleVoltar() {
    navigation.navigate('Home');
  }

  return (
    <View style={[styles.headerContainer, { backgroundColor: cores.primaria }]}>
      <View style={styles.linhaSuperior}>
        <Text style={styles.titulo}>Sistema Acadêmico</Text>

        <TouchableOpacity 
          style={[styles.btnTema, { backgroundColor: isDarkMode ? '#f5f6fa' : '#121212' }]} 
          onPress={toggleTheme}
          activeOpacity={0.8}
        >
          <Text style={[styles.btnTemaTexto, { color: isDarkMode ? '#121212' : '#f5f6fa' }]}>
            {isDarkMode ? '☀️ Claro' : '🌙 Escuro'}
          </Text>
        </TouchableOpacity>
      </View>

      {!noLogin && (
        <View style={styles.linhaInferior}>
          {primeiroNome ? (
            <Text style={styles.nomeUsuario}>Olá, {primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1)}!</Text>
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  btnTemaTexto: { 
    fontSize: 12,
    fontWeight: '700',
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