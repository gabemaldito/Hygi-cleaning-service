import Colors from "@/theme/colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WalletScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="chevron-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wallet</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.cardSection}>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceValue}>$2,580.00</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardHolder}>Gabriel Maldito</Text>
              <Feather name="shield" size={20} color="rgba(255,255,255,0.6)" />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payout Method</Text>
          <TouchableOpacity style={styles.payoutCard}>
            <View style={styles.bankIcon}>
              <Feather name="home" size={24} color={Colors.primary} />
            </View>
            <View style={styles.bankInfo}>
              <Text style={styles.bankName}>Chase Bank</Text>
              <Text style={styles.bankAccount}>Ending in 4242</Text>
            </View>
            <Feather name="check-circle" size={20} color="#1DB954" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={styles.transactionItem}>
              <View style={styles.transIcon}>
                <Feather
                  name="dollar-sign"
                  size={20}
                  color={Colors.textSecondary}
                />
              </View>
              <View style={styles.transInfo}>
                <Text style={styles.transTitle}>Cleaning - Maria Silva</Text>
                <Text style={styles.transDate}>Jan {i + 1}, 2026</Text>
              </View>
              <Text style={styles.transAmount}>+$85.00</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payoutButton}>
          <Text style={styles.payoutButtonText}>Instant Payout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    paddingBottom: 20,
    backgroundColor: Colors.white,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  cardSection: {
    padding: 24,
  },
  balanceCard: {
    backgroundColor: "#1A1A1A",
    padding: 30,
    borderRadius: 32,
    height: 200,
    justifyContent: "space-between",
  },
  balanceLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
  },
  balanceValue: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: "bold",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHolder: {
    color: Colors.white,
    fontSize: 16,
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  payoutCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bankIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FFF0F3",
    alignItems: "center",
    justifyContent: "center",
  },
  bankInfo: {
    flex: 1,
    marginLeft: 16,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  bankAccount: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  transIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  transInfo: {
    flex: 1,
    marginLeft: 16,
  },
  transTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  transDate: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  transAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1DB954",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: Platform.OS === "ios" ? 44 : 24,
    backgroundColor: Colors.background,
  },
  payoutButton: {
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  payoutButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
