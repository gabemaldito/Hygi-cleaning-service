import { useAuth } from "@/context/AuthContext";
import Colors from "@/theme/colors";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProProfileScreen() {
  const { signOut } = useAuth();

  const settingsOptions = [
    { icon: "user", label: "Personal Information", sub: "Name, address, doc" },
    {
      icon: "shield",
      label: "Verification Status",
      sub: "Fully verified",
      color: "#1DB954",
    },
    {
      icon: "tool",
      label: "Service Settings",
      sub: "Standard, Deep Clean, etc.",
    },
    { icon: "bell", label: "Notifications", sub: "Enabled" },
    { icon: "credit-card", label: "Payout Settings", sub: "Chase ****4242" },
    {
      icon: "help-circle",
      label: "Support & Help",
      sub: "Contact Hygi Center",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
              }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editBadge}>
              <Feather name="camera" size={14} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Maria Silva</Text>
          <View style={styles.ratingRow}>
            <Feather name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>4.9 (124 reviews)</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>156</Text>
            <Text style={styles.statLabel}>Jobs Done</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Success</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>$45/h</Text>
            <Text style={styles.statLabel}>Rate</Text>
          </View>
        </View>

        <View style={styles.settingsSection}>
          {settingsOptions.map((item, index) => (
            <TouchableOpacity key={index} style={styles.optionRow}>
              <View style={styles.optionIconBox}>
                <Feather
                  name={item.icon as any}
                  size={20}
                  color={item.color || Colors.textPrimary}
                />
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionLabel}>{item.label}</Text>
                <Text style={styles.optionSub}>{item.sub}</Text>
              </View>
              <Feather name="chevron-right" size={18} color={Colors.border} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <Feather name="log-out" size={18} color={Colors.error} />
          <Text style={styles.signOutText}>Sign Out from Account</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Hygi Pro v1.2.4</Text>
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
    paddingTop: Platform.OS === "ios" ? 80 : 40,
    backgroundColor: Colors.white,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  profileInfo: {
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#FFF0F3",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  content: {
    padding: 24,
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: -40,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: "60%",
    backgroundColor: Colors.border,
    alignSelf: "center",
  },
  settingsSection: {
    marginBottom: 32,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  optionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  optionInfo: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  optionSub: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFF0F3",
    marginBottom: 24,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.error,
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.border,
    marginBottom: 40,
  },
});
