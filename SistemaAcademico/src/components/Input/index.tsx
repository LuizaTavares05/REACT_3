import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Input(props: TextInputProps) {
    const { cores, isDarkMode } = useAuth();
    
    return (
        <TextInput
            placeholderTextColor={isDarkMode ? cores.textoSecundario : '#999'}
            style={[styles.input, {color: cores.texto}]}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
});