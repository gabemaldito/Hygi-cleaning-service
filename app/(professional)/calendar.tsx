import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useData, Booking } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import Colors from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export default function CalendarScreen() {
  const { bookings, services } = useData();
  const { userToken } = useAuth();

  const proId = userToken || 'pro';

  // Filter bookings for this professional
  const myJobs = bookings.filter(b =>
    (b.status === 'ACCEPTED' || b.status === 'COMPLETED') &&
    b.professionalId === proId
  );

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'ACCEPTED': return '#17A2B8';
      case 'COMPLETED': return '#28A745';
      default: return Colors.textSecondary;
    }
  };

  const getStatusLabel = (status: Booking['status']) => {
    switch (status) {
      case 'ACCEPTED': return 'Agendado';
      case 'COMPLETED': return 'Concluído';
      default: return status;
    }
  };

  const renderItem = ({ item }: { item: Booking }) => {
    const service = services.find(s => s.id === item.serviceId);

    return (
      <View style={styles.card}>
        <View style={styles.header}>
            <Text style={styles.dateText}>{item.date}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
            </View>
        </View>

        <Text style={styles.timeText}>{item.time}</Text>
        <Text style={styles.serviceTitle}>{service ? service.title : 'Serviço'}</Text>

        <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.addressText} numberOfLines={2}>{item.address}</Text>
        </View>

        <View style={styles.footer}>
            <Text style={styles.clientInfo}>Cliente ID: {item.clientId}</Text>
            <Text style={styles.price}>R$ {item.totalAmount.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Minha Agenda</Text>
        </View>

        {myJobs.length === 0 ? (
            <View style={styles.emptyContainer}>
                <Ionicons name="calendar-outline" size={64} color={Colors.textSecondary} />
                <Text style={styles.emptyText}>Você não tem serviços agendados.</Text>
            </View>
        ) : (
            <FlatList
                data={myJobs}
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateText: {
    fontSize: typography.size.m,
    fontFamily: typography.family.bold,
    color: Colors.textPrimary,
  },
  timeText: {
    fontSize: typography.size.l,
    fontFamily: typography.family.regular,
    color: Colors.primary,
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: typography.size.m,
    fontFamily: typography.family.medium,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  addressText: {
    marginLeft: 6,
    fontSize: typography.size.s,
    color: Colors.textSecondary,
    fontFamily: typography.family.regular,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    color: Colors.white,
    fontSize: typography.size.xs,
    fontFamily: typography.family.bold,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.surface,
  },
  clientInfo: {
    fontSize: typography.size.xs,
    color: Colors.textSecondary,
  },
  price: {
    fontSize: typography.size.m,
    fontFamily: typography.family.bold,
    color: Colors.success,
  },
});
