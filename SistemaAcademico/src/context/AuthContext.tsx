import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export const lightTheme = {
  background: '#f5f6fa',
  card: '#ffffff',
  texto: '#2c3e50',
  textoSecundario: '#64748b',
  primaria: '#1e3a5f',
  borda: 'rgba(0, 0, 0, 0.1)',
};

export const darkTheme = {
  background: '#121212',
  card: '#1e1e1e',
  texto: '#f8fafc',
  textoSecundario: '#94a3b8',
  primaria: '#0f172a',
  borda: 'rgba(255, 255, 255, 0.1)',
};

interface AuthContextType {
  usuario: string | null;
  primeiroNome: string | null;
  token: string | null;
  loading: boolean;
  isDarkMode: boolean;
  cores: typeof lightTheme;
  toggleTheme: () => void;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const primeiroNome = usuario 
    ? usuario.split('@')[0].split('.')[0].split('_')[0] 
    : null;

    const cores = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    async function restaurarSessao() {
      try {
        const tokenSalvo = await AsyncStorage.getItem('@Academico:token');
        const usuarioSalvo = await AsyncStorage.getItem('@Academico:usuario');
        const temaSalvo = await AsyncStorage.getItem('@Academico:tema');

        if (tokenSalvo && usuarioSalvo) {
          setToken(tokenSalvo);
          setUsuario(usuarioSalvo);
        }
        if (temaSalvo) {
          setIsDarkMode(temaSalvo === 'dark');
        }
      } catch (e) {
        console.error("Erro ao carregar dados locais do usuário", e);
      } finally {
        setLoading(false);
      }
    }
    restaurarSessao();
  }, []);

  async function toggleTheme() {
    const novoTema = !isDarkMode;
    setIsDarkMode(novoTema);
    await AsyncStorage.setItem('@Academico:tema', novoTema ? 'dark' : 'light');
  }

  async function login(email: string, senha: string) {
    const resposta = await api.post('/auth/login', { email, senha });
    const { token: tokenRecebido, username } = resposta.data;
    setToken(tokenRecebido);
    setUsuario(username);
    await AsyncStorage.setItem('@Academico:token', tokenRecebido);
    await AsyncStorage.setItem('@Academico:usuario', username);
  }

  async function logout() {
    setToken(null);
    setUsuario(null);
    await AsyncStorage.removeItem('@Academico:token');
    await AsyncStorage.removeItem('@Academico:usuario');
  }

  return (
    <AuthContext.Provider value={{ usuario, primeiroNome, token, loading, isDarkMode, cores, toggleTheme, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado sob um AuthProvider');
  return context;
}