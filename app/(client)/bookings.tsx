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

export default function BookingsScreen() {
  const { bookings, services } = useData();
  const { userToken } = useAuth();

  const myBookings = bookings.filter(b => b.clientId === userToken);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'PENDING': return '#FFC107'; // Amber
      case 'ACCEPTED': return '#17A2B8'; // Info Blue
      case 'COMPLETED': return '#28A745'; // Success Green
      case 'CANCELLED': return '#DC3545'; // Danger Red
      default: return Colors.textSecondary;
    }
  };

  const getStatusLabel = (status: Booking['status']) => {
    switch (status) {
      case 'PENDING': return 'Pendente';
      case 'ACCEPTED': return 'Aceito';
      case 'COMPLETED': return 'Concluído';
      case 'CANCELLED': return 'Cancelado';
      default: return status;
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
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
            </View>
        </View>

        <View style={styles.detailsRow}>
            <Ionicons name="calendar-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{item.date} às {item.time}</Text>
        </View>

        <View style={styles.detailsRow}>
            <Ionicons name="location-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText} numberOfLines={1}>{item.address}</Text>
        </View>

        <View style={styles.footer}>
            <Text style={styles.price}>R$ {item.totalAmount.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Meus Agendamentos</Text>
        </View>

        {myBookings.length === 0 ? (
            <View style={styles.emptyContainer}>
                <Ionicons name="calendar-clear-outline" size={64} color={Colors.textSecondary} />
                <Text style={styles.emptyText}>Você ainda não tem agendamentos.</Text>
            </View>
        ) : (
            <FlatList
                data={myBookings}
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
    marginBottom: spacing.s,
  },
  serviceTitle: {
    fontSize: typography.size.m,
    fontFamily: typography.family.bold,
    color: Colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: Colors.white,
    fontSize: typography.size.xs,
    fontFamily: typography.family.bold,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 8,
    fontSize: typography.size.s,
    color: Colors.textSecondary,
    fontFamily: typography.family.regular,
  },
  footer: {
    marginTop: spacing.s,
    alignItems: 'flex-end',
  },
  price: {
    fontSize: typography.size.m,
    fontFamily: typography.family.bold,
    color: Colors.primary,
  },
});
