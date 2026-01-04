import Colors from "@/theme/colors";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BOOKINGS = [
  {
    id: "1",
    name: "Maria Silva",
    date: "Jan 6, 2026",
    time: "10:00 AM",
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    type: "Standard Clean",
  },
  {
    id: "2",
    name: "Ana Costa",
    date: "Dec 28, 2025",
    time: "02:00 PM",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    type: "Deep Clean",
  },
];

export default function BookingsScreen() {
  const renderItem = ({ item }: { item: (typeof BOOKINGS)[0] }) => (
    <TouchableOpacity style={styles.bookingCard}>
      <Image source={{ uri: item.image }} style={styles.proImage} />
      <View style={styles.bookingInfo}>
        <View style={styles.headerRow}>
          <Text style={styles.proName}>{item.name}</Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === "Confirmed" ? "#E3F9E5" : "#F1F3F5",
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    item.status === "Confirmed"
                      ? "#1DB954"
                      : Colors.textSecondary,
                },
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
        <Text style={styles.serviceType}>{item.type}</Text>
        <View style={styles.dateTimeRow}>
          <Feather name="calendar" size={14} color={Colors.textSecondary} />
          <Text style={styles.dateTimeText}>
            {item.date} • {item.time}
          </Text>
        </View>
      </View>
      <Feather name="chevron-right" size={20} color={Colors.border} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>
      <FlatList
        data={BOOKINGS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  listContent: {
    padding: 24,
  },
  bookingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  proImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  bookingInfo: {
    flex: 1,
    marginLeft: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  proName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  serviceType: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateTimeText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
