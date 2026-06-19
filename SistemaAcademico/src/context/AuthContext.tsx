import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface AuthContextType {
  usuario: string | null;
  primeiroNome: string | null;
  token: string | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const primeiroNome = usuario 
    ? usuario.split('@')[0].split('.')[0].split('_')[0] 
    : null;

  useEffect(() => {
    async function restaurarSessao() {
      try {
        const tokenSalvo = await AsyncStorage.getItem('@Academico:token');
        const usuarioSalvo = await AsyncStorage.getItem('@Academico:usuario');

        if (tokenSalvo && usuarioSalvo) {
          setToken(tokenSalvo);
          setUsuario(usuarioSalvo);
        }
      } catch (e) {
        console.error("Erro ao carregar dados locais do usuário", e);
      } finally {
        setLoading(false);
      }
    }
    restaurarSessao();
  }, []);

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
    <AuthContext.Provider value={{ usuario, primeiroNome, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado sob um AuthProvider');
  return context;
}