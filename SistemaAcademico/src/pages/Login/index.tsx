import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Input from '../../components/Input';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            {/* Campo de email */}
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            {/* Campo de senha */}
            <Input
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={true}
            />
        
            {/* Botão de login */}
            <TouchableOpacity
                style={styles.button}>
                onPress={() => console.log("Login clicado", email, senha)}
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 5 },
    buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});