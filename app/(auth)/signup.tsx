import Colors from '@/theme/colors';
import { typography } from '@/theme/typography';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Conta</Text>
      <Text style={styles.subtitle}>Em breve...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: typography.size.xl,
    fontFamily: typography.family.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.size.m,
    fontFamily: typography.family.regular,
    color: Colors.textSecondary,
  }
});
