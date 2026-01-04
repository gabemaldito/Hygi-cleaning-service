import Colors from "@/theme/colors";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function JobDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { customer, address, time, type, price } = params;
  const [status, setStatus] = useState<
    "Upcoming" | "In Progress" | "Completed"
  >("Upcoming");

  const handleGPS = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${address}`,
      android: `geo:0,0?q=${address}`,
    });
    if (url) Linking.openURL(url);
  };

  const handleAction = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (status === "Upcoming") {
      setStatus("In Progress");
    } else if (status === "In Progress") {
      Alert.alert("Finish Job", "Confirm you have finished the cleaning?", [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => setStatus("Completed") },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="chevron-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Details</Text>
        <TouchableOpacity>
          <Feather name="message-circle" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.statusBanner}>
          <View
            style={[
              styles.statusCircle,
              {
                backgroundColor:
                  status === "Completed"
                    ? "#E3F9E5"
                    : status === "In Progress"
                    ? "#FFF9DB"
                    : "#F1F3F5",
              },
            ]}
          >
            <Feather
              name={
                status === "Completed"
                  ? "check"
                  : status === "In Progress"
                  ? "play"
                  : "clock"
              }
              size={24}
              color={
                status === "Completed"
                  ? "#1DB954"
                  : status === "In Progress"
                  ? "#F59F00"
                  : Colors.textSecondary
              }
            />
          </View>
          <View>
            <Text style={styles.statusLabel}>Current Status</Text>
            <Text style={styles.statusValue}>{status}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Feather name="user" size={18} color={Colors.textSecondary} />
              <Text style={styles.infoText}>{customer}</Text>
            </View>
            <TouchableOpacity
              style={[styles.infoRow, { marginTop: 16 }]}
              onPress={handleGPS}
            >
              <Feather name="map-pin" size={18} color={Colors.primary} />
              <Text
                style={[
                  styles.infoText,
                  { color: Colors.primary, fontWeight: "600" },
                ]}
              >
                {address}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Details</Text>
          <View style={styles.detailGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Type</Text>
              <Text style={styles.detailValue}>{type}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Price</Text>
              <Text style={styles.detailValue}>${price}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Start Time</Text>
              <Text style={styles.detailValue}>{time}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Estimated</Text>
              <Text style={styles.detailValue}>3 Hours</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <View style={styles.instructionBox}>
            <Text style={styles.instructionText}>
              No pets in the house. The key is under the mat. Please focus on
              the kitchen cabinets.
            </Text>
          </View>
        </View>
      </ScrollView>

      {status !== "Completed" && (
        <BlurView intensity={90} tint="light" style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor:
                  status === "In Progress" ? "#E31C5F" : Colors.textPrimary,
              },
            ]}
            onPress={handleAction}
          >
            <Text style={styles.actionButtonText}>
              {status === "Upcoming"
                ? "Check-in (I arrived)"
                : "Check-out (I finished)"}
            </Text>
          </TouchableOpacity>
        </BlurView>
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
    padding: 24,
    paddingBottom: 120,
  },
  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 32,
    gap: 16,
  },
  statusCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  statusLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
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
  infoCard: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  detailItem: {
    width: (Dimensions.get("window").width - 64) / 2,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 20,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  instructionBox: {
    backgroundColor: "#FFF0F3",
    padding: 20,
    borderRadius: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  instructionText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textPrimary,
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
  actionButton: {
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
