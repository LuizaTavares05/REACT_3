import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Footer() {
  const { cores } = useAuth();

  return (
    <View style={[styles.footer, { backgroundColor: cores.primaria }]}>
      <Text style={styles.texto}>© 2026 Serratec - Grupo Dois</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 40,
  },
  texto: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});