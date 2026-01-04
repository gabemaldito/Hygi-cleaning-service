import Colors from "@/theme/colors";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
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

const DAYS = [
  { day: "Mon", date: "4" },
  { day: "Tue", date: "5" },
  { day: "Wed", date: "6" },
  { day: "Thu", date: "7" },
  { day: "Fri", date: "8" },
  { day: "Sat", date: "9" },
  { day: "Sun", date: "10" },
];

const TIME_SLOTS = [
  { id: "1", time: "08:00 AM", period: "Morning" },
  { id: "2", time: "10:00 AM", period: "Morning" },
  { id: "3", time: "01:00 PM", period: "Afternoon" },
  { id: "4", time: "03:00 PM", period: "Afternoon" },
  { id: "5", time: "06:00 PM", period: "Evening" },
];

export default function SchedulingScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState("6");
  const [selectedSlot, setSelectedSlot] = useState("2");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="chevron-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Time</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>January 2026</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.dateScroll}
          >
            {DAYS.map((item) => (
              <TouchableOpacity
                key={item.date}
                style={[
                  styles.dateCard,
                  selectedDate === item.date && styles.dateCardSelected,
                ]}
                onPress={() => setSelectedDate(item.date)}
              >
                <Text
                  style={[
                    styles.dayText,
                    selectedDate === item.date && styles.textWhite,
                  ]}
                >
                  {item.day}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === item.date && styles.textWhite,
                  ]}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Slots</Text>
          <View style={styles.slotGrid}>
            {TIME_SLOTS.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.slotCard,
                  selectedSlot === slot.id && styles.slotCardSelected,
                ]}
                onPress={() => setSelectedSlot(slot.id)}
              >
                <Text
                  style={[
                    styles.slotTime,
                    selectedSlot === slot.id && styles.textWhite,
                  ]}
                >
                  {slot.time}
                </Text>
                <Text
                  style={[
                    styles.slotPeriod,
                    selectedSlot === slot.id && styles.textWhite,
                  ]}
                >
                  {slot.period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.noticeBox}>
          <Feather name="info" size={20} color={Colors.textSecondary} />
          <Text style={styles.noticeText}>
            The professional will arrive within a 30-minute window of the
            selected time.
          </Text>
        </View>
      </ScrollView>

      <BlurView intensity={90} tint="light" style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() =>
            router.push({
              pathname: "/(client)/checkout",
              params: { name, date: selectedDate, slot: selectedSlot },
            } as any)
          }
        >
          <Text style={styles.confirmButtonText}>Continue to Checkout</Text>
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
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  dateScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  dateCard: {
    width: 65,
    height: 90,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  dateCardSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dayText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  textWhite: {
    color: Colors.white,
  },
  slotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  slotCard: {
    width: (width - 60) / 2,
    padding: 16,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  slotCardSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  slotTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  slotPeriod: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  noticeBox: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    gap: 12,
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
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
  confirmButton: {
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
