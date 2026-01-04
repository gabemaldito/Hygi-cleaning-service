import Colors from "@/theme/colors";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const PERFORMANCE_DATA = [
  { day: "M", height: 40 },
  { day: "T", height: 60 },
  { day: "W", height: 30 },
  { day: "T", height: 80 },
  { day: "F", height: 90 },
  { day: "S", height: 50 },
  { day: "S", height: 20 },
];

export default function EarningsScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Earnings</Text>
        <TouchableOpacity style={styles.periodButton}>
          <Text style={styles.periodText}>This Week</Text>
          <Feather name="chevron-down" size={16} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceValue}>$1,240.50</Text>
        <TouchableOpacity style={styles.payoutButton}>
          <Text style={styles.payoutButtonText}>Request Payout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Jobs Done</Text>
          <Text style={styles.statValue}>12</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Earned</Text>
          <Text style={styles.statValue}>$840.00</Text>
        </View>
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Weekly Performance</Text>
        <View style={styles.chartContainer}>
          {PERFORMANCE_DATA.map((item, index) => (
            <View key={index} style={styles.chartBarWrapper}>
              <View style={[styles.chartBar, { height: item.height }]} />
              <Text style={styles.chartDayText}>{item.day}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.historySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Last Payouts</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.payoutItem}>
            <View style={styles.payoutIcon}>
              <Feather name="arrow-down-left" size={20} color="#1DB954" />
            </View>
            <View style={styles.payoutInfo}>
              <Text style={styles.payoutBank}>Chase Bank ****4242</Text>
              <Text style={styles.payoutDate}>Dec {20 + i}, 2025</Text>
            </View>
            <Text style={styles.payoutAmount}>$450.00</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  periodButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  periodText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  balanceCard: {
    backgroundColor: Colors.textPrimary,
    margin: 24,
    padding: 24,
    borderRadius: 30,
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 24,
  },
  payoutButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 16,
  },
  payoutButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  chartSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chartBarWrapper: {
    alignItems: "center",
    width: 30,
  },
  chartBar: {
    width: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  chartDayText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  historySection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAll: {
    color: Colors.primary,
    fontWeight: "600",
  },
  payoutItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  payoutIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E3F9E5",
    alignItems: "center",
    justifyContent: "center",
  },
  payoutInfo: {
    flex: 1,
    marginLeft: 16,
  },
  payoutBank: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  payoutDate: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  payoutAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
});
