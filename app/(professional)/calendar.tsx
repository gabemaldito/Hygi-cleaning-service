import Colors from "@/theme/colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const JOBS = [
  {
    id: "1",
    customer: "John Doe",
    address: "123 Main St, Sacramento",
    time: "08:00 AM",
    type: "Standard Clean",
    status: "Upcoming",
    price: 85,
  },
  {
    id: "2",
    customer: "Sarah Wilson",
    address: "456 Oak Ave, Fair Oaks",
    time: "01:00 PM",
    type: "Deep Clean",
    status: "Upcoming",
    price: 150,
  },
];

export default function CalendarScreen() {
  const router = useRouter();

  const renderJobItem = ({ item }: { item: (typeof JOBS)[0] }) => (
    <TouchableOpacity
      style={styles.jobCard}
      onPress={() =>
        router.push({
          pathname: "/(professional)/job-detail",
          params: item as any,
        } as any)
      }
    >
      <View style={styles.timeSection}>
        <Text style={styles.timeText}>{item.time}</Text>
        <View style={styles.statusDot} />
      </View>
      <View style={styles.jobInfo}>
        <View style={styles.jobHeader}>
          <Text style={styles.customerName}>{item.customer}</Text>
          <Text style={styles.jobPrice}>${item.price}</Text>
        </View>
        <Text style={styles.jobAddress}>{item.address}</Text>
        <View style={styles.jobFooter}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.type}</Text>
          </View>
          <Feather name="chevron-right" size={18} color={Colors.border} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>January 4, 2026</Text>
          <Text style={styles.title}>Today's Agenda</Text>
        </View>
        <TouchableOpacity style={styles.calendarToggle}>
          <Feather name="calendar" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={JOBS}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="coffee" size={48} color={Colors.border} />
            <Text style={styles.emptyText}>No jobs scheduled for today.</Text>
          </View>
        }
      />
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    paddingBottom: 24,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  calendarToggle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FFF0F3",
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    padding: 24,
  },
  jobCard: {
    flexDirection: "row",
    marginBottom: 24,
  },
  timeSection: {
    width: 80,
    alignItems: "center",
    paddingTop: 4,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 8,
  },
  jobInfo: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  jobPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  jobAddress: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  jobFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tag: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  tagText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
