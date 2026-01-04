import Colors from "@/theme/colors";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CLEANING_TYPES = ["Standard", "Deep Clean", "Move-out", "Office"];
const ROOMS = ["1", "2", "3", "4", "5+"];

export default function FiltersScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("Standard");
  const [rooms, setRooms] = useState("2");
  const [bathrooms, setBathrooms] = useState("1");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <Feather name="x" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Type</Text>
          <View style={styles.chipContainer}>
            {CLEANING_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.chip,
                  selectedType === type && styles.chipSelected,
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedType === type && styles.chipTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number of Bedrooms</Text>
          <View style={styles.chipContainer}>
            {ROOMS.map((num) => (
              <TouchableOpacity
                key={num}
                style={[styles.chip, rooms === num && styles.chipSelected]}
                onPress={() => setRooms(num)}
              >
                <Text
                  style={[
                    styles.chipText,
                    rooms === num && styles.chipTextSelected,
                  ]}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number of Bathrooms</Text>
          <View style={styles.chipContainer}>
            {ROOMS.map((num) => (
              <TouchableOpacity
                key={num}
                style={[styles.chip, bathrooms === num && styles.chipSelected]}
                onPress={() => setBathrooms(num)}
              >
                <Text
                  style={[
                    styles.chipText,
                    bathrooms === num && styles.chipTextSelected,
                  ]}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          {/* Placeholder for a range slider */}
          <View style={styles.sliderPlaceholder}>
            <View style={styles.sliderTrack}>
              <View style={styles.sliderFill} />
              <View style={[styles.sliderThumb, { left: "20%" }]} />
              <View style={[styles.sliderThumb, { left: "70%" }]} />
            </View>
            <View style={styles.priceLabels}>
              <Text style={styles.priceLabel}>$50</Text>
              <Text style={styles.priceLabel}>$500+</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BlurView intensity={90} tint="light" style={styles.footer}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => router.back()}
        >
          <Text style={styles.applyButtonText}>Show 42 cleaners</Text>
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
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  resetText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  chipTextSelected: {
    color: Colors.white,
    fontWeight: "600",
  },
  sliderPlaceholder: {
    height: 60,
    justifyContent: "center",
  },
  sliderTrack: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    position: "relative",
  },
  sliderFill: {
    position: "absolute",
    left: "20%",
    right: "30%",
    height: "100%",
    backgroundColor: Colors.primary,
  },
  sliderThumb: {
    position: "absolute",
    top: -10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  priceLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  priceLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  applyButton: {
    backgroundColor: Colors.textPrimary,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
