import React from 'react';
import { Input, StyleSheet, InputProps } from 'react-native';

export default function Input(props: InputProps) {
    return (
        <Input
            style={styles.Input}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    Input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
});