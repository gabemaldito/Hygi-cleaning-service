import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useData, Booking } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import Colors from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export default function JobsScreen() {
  const { bookings, services, updateBookingStatus } = useData();
  const { userToken } = useAuth();

  const [processingId, setProcessingId] = useState<string | null>(null);

  const pendingJobs = bookings.filter(b => b.status === 'PENDING');

  const handleAcceptJob = async (bookingId: string) => {
    try {
      setProcessingId(bookingId);
      await updateBookingStatus(bookingId, 'ACCEPTED', userToken || 'pro');
      Alert.alert('Sucesso', 'Trabalho aceito! Verifique sua agenda.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível aceitar o trabalho.');
    } finally {
      setProcessingId(null);
    }
  };

  const renderItem = ({ item }: { item: Booking }) => {
    const service = services.find(s => s.id === item.serviceId);

    return (
      <View style={styles.card}>
        <View style={styles.header}>
            <Text style={styles.serviceTitle}>
                {service ? service.title : 'Serviço'}
            </Text>
            <Text style={styles.price}>R$ {item.totalAmount.toFixed(2)}</Text>
        </View>

        <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={18} color={Colors.textSecondary} />
            <Text style={styles.infoText}>{item.date} às {item.time}</Text>
        </View>

        <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color={Colors.textSecondary} />
            <Text style={styles.infoText} numberOfLines={1}>{item.address}</Text>
        </View>

        <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color={Colors.textSecondary} />
            <Text style={styles.infoText}>{service?.duration}h de duração</Text>
        </View>

        <TouchableOpacity
            style={[styles.acceptButton, processingId === item.id && styles.disabledButton]}
            onPress={() => handleAcceptJob(item.id)}
            disabled={processingId === item.id}
        >
            {processingId === item.id ? (
                <ActivityIndicator color={Colors.white} />
            ) : (
                <Text style={styles.acceptButtonText}>Aceitar Trabalho</Text>
            )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Trabalhos Disponíveis</Text>
            <Text style={styles.subtitle}>Selecione um trabalho para começar</Text>
        </View>

        {pendingJobs.length === 0 ? (
            <View style={styles.emptyContainer}>
                <Ionicons name="briefcase-outline" size={64} color={Colors.textSecondary} />
                <Text style={styles.emptyText}>Nenhum trabalho disponível no momento.</Text>
            </View>
        ) : (
            <FlatList
                data={pendingJobs}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    padding: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  title: {
    fontSize: typography.size.xl,
    fontFamily: typography.family.bold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.size.s,
    color: Colors.textSecondary,
    fontFamily: typography.family.regular,
    marginTop: 4,
  },
  listContent: {
    padding: spacing.m,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    marginTop: spacing.m,
    fontSize: typography.size.m,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontFamily: typography.family.regular,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: spacing.m,
    padding: spacing.m,
    marginBottom: spacing.m,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.m,
  },
  serviceTitle: {
    fontSize: typography.size.l,
    fontFamily: typography.family.bold,
    color: Colors.textPrimary,
    flex: 1,
  },
  price: {
    fontSize: typography.size.l,
    fontFamily: typography.family.bold,
    color: Colors.primary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: spacing.s,
    fontSize: typography.size.m,
    color: Colors.textSecondary,
    fontFamily: typography.family.regular,
    flex: 1,
  },
  acceptButton: {
    backgroundColor: Colors.success,
    borderRadius: spacing.m,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.s,
  },
  disabledButton: {
    opacity: 0.7,
  },
  acceptButtonText: {
    color: Colors.white,
    fontFamily: typography.family.bold,
    fontSize: typography.size.m,
  },
});
