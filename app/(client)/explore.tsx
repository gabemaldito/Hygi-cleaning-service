import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useData, Service } from '@/context/DataContext';
import Colors from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export default function ExploreScreen() {
  const router = useRouter();
  const { services } = useData();

  const handleBookService = (serviceId: string) => {
    router.push({
      pathname: '/book-service',
      params: { serviceId }
    });
  };

  const renderItem = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => handleBookService(item.id)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
            <Ionicons name="sparkles" size={24} color={Colors.white} />
        </View>
        <Text style={styles.cardPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>

      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.cardFooter}>
        <View style={styles.durationBadge}>
            <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.durationText}>{item.duration}h</Text>
        </View>
        <Text style={styles.bookButtonText}>Agendar</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Serviços Disponíveis</Text>
        <Text style={styles.headerSubtitle}>Escolha o melhor serviço para você</Text>
      </View>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: spacing.l,
    paddingTop: spacing.m,
    paddingBottom: spacing.m,
  },
  headerTitle: {
    fontSize: typography.size.xl,
    fontFamily: typography.family.bold,
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: typography.size.m,
    color: Colors.textSecondary,
    fontFamily: typography.family.regular,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: spacing.l,
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: spacing.m,
    padding: spacing.m,
    marginBottom: spacing.m,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.surface,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.s,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPrice: {
    fontSize: typography.size.l,
    fontFamily: typography.family.bold,
    color: Colors.primary,
  },
  cardTitle: {
    fontSize: typography.size.l,
    fontFamily: typography.family.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: typography.size.s,
    color: Colors.textSecondary,
    fontFamily: typography.family.regular,
    marginBottom: spacing.m,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.surface,
    paddingTop: spacing.s,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationText: {
    fontSize: typography.size.xs,
    color: Colors.textSecondary,
    marginLeft: 4,
    fontFamily: typography.family.medium,
  },
  bookButtonText: {
    color: Colors.primary,
    fontFamily: typography.family.bold,
    fontSize: typography.size.m,
  },
});
