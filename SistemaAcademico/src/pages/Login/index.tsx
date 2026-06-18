import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Login({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false);

    const { login } = useAuth();

    async function handleEntrar() {
        if (!email.trim() || !senha.trim()) {
            Alert.alert("Campos Obrigatórios", "Preencha o e-mail e a senha.");
            return;
        }

        try {
            setCarregando(true);
            await login(email.trim(), senha);
            navigation.navigate("Home");

        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                Alert.alert("Acesso Negado", "Email ou senha incorretos.");
            } else {
                Alert.alert(
                    "Erro de Conexão", 
                    "Não foi possível conectar ao servidor."
                );
            }
        } finally {
            setCarregando(false);
        }
    }

    return (
        <View style={styles.telaContainer}>
            <Header noLogin={true} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.centralizador}>
                    
                    <View style={styles.containerCard}>
                        <Text style={styles.titulo}>Acesso ao Sistema</Text>
                        <Text style={styles.subtitulo}>Faça o login para acessar o sistema</Text>

                        <View style={styles.formulario}>
                            <View style={styles.campoGrupo}>
                                <Text style={styles.label}>E-mail:</Text>
                                <Input
                                    placeholder="exemplo@gmail.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.campoGrupo}>
                                <Text style={styles.label}>Senha:</Text>
                                <Input
                                    placeholder="******"
                                    value={senha}
                                    onChangeText={setSenha}
                                    secureTextEntry={true}
                                />
                            </View>
                        
                            <TouchableOpacity
                                style={[styles.btnEntrar, carregando && { opacity: 0.7 }]}
                                onPress={handleEntrar}
                                disabled={carregando}
                            >
                                {carregando ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={styles.btnEntrarTexto}>Entrar no Sistema</Text>
                                )}
                            </TouchableOpacity>
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
        backgroundColor: '#f5f6fa',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    centralizador: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    containerCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 32,
        width: '100%',
        maxWidth: 380,
        elevation: 8,
        shadowColor: '#1e3a5f',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
    },
    titulo: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1e3a5f',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitulo: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 24,
        fontWeight: '500',
    },
    formulario: {
        width: '100%',
        gap: 16,
    },
    campoGrupo: {
        width: '100%',
        gap: 6,
    },
    label: {
        fontWeight: '600',
        fontSize: 14,
        color: '#1f2937',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    btnEntrar: {
        padding: 12,
        backgroundColor: '#1e3a5f',
        borderRadius: 8,
        marginTop: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#303a5f',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        minHeight: 48,
    },
    btnEntrarTexto: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});