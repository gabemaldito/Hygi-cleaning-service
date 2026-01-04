import Colors from "@/theme/colors";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProLandingScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1581578731548-c64695cc6954?w=800&h=600&fit=crop",
          }}
          style={styles.heroImage}
        />
        <BlurView intensity={20} tint="dark" style={styles.overlay}>
          <Text style={styles.heroTitle}>Be your own boss with Hygi</Text>
          <Text style={styles.heroSubtitle}>
            Clean, Earn, and Grow your business on your own terms.
          </Text>
        </BlurView>
      </View>

      <View style={styles.content}>
        <View style={styles.benefitCard}>
          <View style={styles.iconBox}>
            <Feather name="clock" size={24} color={Colors.primary} />
          </View>
          <View style={styles.benefitInfo}>
            <Text style={styles.benefitTitle}>Flexible Schedule</Text>
            <Text style={styles.benefitText}>
              You choose when and where you want to work.
            </Text>
          </View>
        </View>

        <View style={styles.benefitCard}>
          <View style={styles.iconBox}>
            <Feather name="dollar-sign" size={24} color={Colors.primary} />
          </View>
          <View style={styles.benefitInfo}>
            <Text style={styles.benefitTitle}>Weekly Payouts</Text>
            <Text style={styles.benefitText}>
              Get paid every week directly to your bank account.
            </Text>
          </View>
        </View>

        <View style={styles.benefitCard}>
          <View style={styles.iconBox}>
            <Feather name="shield" size={24} color={Colors.primary} />
          </View>
          <View style={styles.benefitInfo}>
            <Text style={styles.benefitTitle}>Insurance Included</Text>
            <Text style={styles.benefitText}>
              Every job is covered by our partner insurance.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => router.push("/(professional)/pro-profile" as any)}
        >
          <Text style={styles.ctaButtonText}>Complete your Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace("/(auth)/login" as any)}
        >
          <Text style={styles.secondaryButtonText}>
            Already a partner? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    height: 400,
    width: "100%",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 30,
    paddingBottom: 40,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 24,
  },
  content: {
    padding: 24,
    marginTop: -20,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  benefitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#FFF0F3",
    alignItems: "center",
    justifyContent: "center",
  },
  benefitInfo: {
    flex: 1,
    marginLeft: 16,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  ctaButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 40,
  },
  secondaryButtonText: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: "600",
  },
});
