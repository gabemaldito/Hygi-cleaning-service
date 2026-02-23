import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '@/context/AuthContext';
import Colors from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export default function ClientProfileScreen() {
  const { userToken, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color={Colors.white} />
        </View>
        <Text style={styles.userName}>Cliente</Text>
        <Text style={styles.userEmail}>{userToken}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color={Colors.textSecondary} />
            <Text style={styles.menuText}>Dados Pessoais</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="card-outline" size={24} color={Colors.textSecondary} />
            <Text style={styles.menuText}>Pagamentos</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color={Colors.textSecondary} />
            <Text style={styles.menuText}>Configurações</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <Ionicons name="log-out-outline" size={24} color={Colors.error} />
            <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    padding: spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  userName: {
    fontSize: typography.size.l,
    fontFamily: typography.family.bold,
    color: Colors.textPrimary,
  },
  userEmail: {
    fontSize: typography.size.m,
    color: Colors.textSecondary,
    fontFamily: typography.family.regular,
  },
  menuContainer: {
    padding: spacing.m,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  menuText: {
    flex: 1,
    marginLeft: spacing.m,
    fontSize: typography.size.m,
    color: Colors.textPrimary,
    fontFamily: typography.family.medium,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.m,
    marginTop: spacing.l,
  },
  logoutText: {
    marginLeft: spacing.m,
    fontSize: typography.size.m,
    color: Colors.error,
    fontFamily: typography.family.bold,
  },
});
