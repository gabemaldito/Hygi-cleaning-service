import Colors from "@/theme/colors";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CheckoutScreen() {
  const router = useRouter();
  const { name, date, slot, price } = useLocalSearchParams();

  const subtotal = Number(price || 85);
  const serviceFee = subtotal * 0.1;
  const total = subtotal + serviceFee;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="chevron-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Order</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Details</Text>
          <View style={styles.detailCard}>
            <View style={styles.serviceRow}>
              <Feather name="user" size={20} color={Colors.primary} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceLabel}>Professional</Text>
                <Text style={styles.serviceValue}>{name}</Text>
              </View>
            </View>
            <View style={[styles.serviceRow, { marginTop: 20 }]}>
              <Feather name="calendar" size={20} color={Colors.primary} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceLabel}>Date & Time</Text>
                <Text style={styles.serviceValue}>
                  Jan {date}, 2026 at {slot === "1" ? "08:00 AM" : "10:00 AM"}
                </Text>
              </View>
            </View>
            <View style={[styles.serviceRow, { marginTop: 20 }]}>
              <Feather name="map-pin" size={20} color={Colors.primary} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceLabel}>Address</Text>
                <Text style={styles.serviceValue}>
                  123 Main St, Sacramento, CA
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity style={styles.paymentCard}>
            <View style={styles.cardInfo}>
              <Feather
                name="credit-card"
                size={24}
                color={Colors.textPrimary}
              />
              <Text style={styles.cardNumber}>•••• •••• •••• 4242</Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service Base Price</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Platform Service Fee (10%)
              </Text>
              <Text style={styles.summaryValue}>${serviceFee.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BlurView intensity={90} tint="light" style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {
            // Mock payment and redirect to bookings
            router.replace("/(client)/bookings" as any);
          }}
        >
          <Text style={styles.payButtonText}>
            Confirm and Pay ${total.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </BlurView>
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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
    padding: 24,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  detailCard: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceInfo: {
    marginLeft: 16,
  },
  serviceLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  serviceValue: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.textPrimary,
  },
  summaryBox: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 24,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: Platform.OS === "ios" ? 44 : 24,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  payButton: {
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  payButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
