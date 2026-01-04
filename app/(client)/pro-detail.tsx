import Colors from "@/theme/colors";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
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

const REVIEWS = [
  {
    id: "1",
    name: "John Doe",
    rating: 5,
    comment: "Excellent service, highly recommend!",
    date: "2 days ago",
  },
  {
    id: "2",
    name: "Jane Smith",
    rating: 4,
    comment: "Very professional and punctual.",
    date: "1 week ago",
  },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1581578731548-c64695cc6954?w=400&h=300&fit=crop", // Kitchen clean
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop", // Bathroom clean
  "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop", // Living room
];

export default function ProDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { name, rating, reviews, image, price } = params;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Image source={{ uri: image as string }} style={styles.headerImage} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="chevron-left" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.titleSection}>
            <View>
              <Text style={styles.proName}>{name}</Text>
              <View style={styles.ratingRow}>
                <Feather name="star" size={16} color="#FFD700" fill="#FFD700" />
                <Text style={styles.ratingText}>
                  {rating} ({reviews} reviews)
                </Text>
              </View>
            </View>
            <View style={styles.priceBadge}>
              <Text style={styles.priceLabel}>From</Text>
              <Text style={styles.priceValue}>${price}/h</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bioText}>
              Professional cleaner with over 5 years of experience in
              Sacramento. Specialized in Deep Cleaning and Move-out services. I
              bring my own premium cleaning supplies.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Before & After Gallery</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.galleryScroll}
            >
              {GALLERY.map((img, index) => (
                <Image
                  key={index}
                  source={{ uri: img }}
                  style={styles.galleryImage}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            {REVIEWS.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewerName}>{review.name}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <View style={styles.reviewStars}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Feather
                      key={i}
                      name="star"
                      size={12}
                      color="#FFD700"
                      fill="#FFD700"
                    />
                  ))}
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <BlurView intensity={90} tint="light" style={styles.footer}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() =>
            router.push({
              pathname: "/(client)/scheduling" as any,
              params: { name, price },
            } as any)
          }
        >
          <Text style={styles.bookButtonText}>Book Service</Text>
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
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    height: 350,
    width: "100%",
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 24,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  proName: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  priceBadge: {
    backgroundColor: "#FFF0F3",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "600",
  },
  priceValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  seeAll: {
    color: Colors.primary,
    fontWeight: "600",
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textSecondary,
  },
  galleryScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  galleryImage: {
    width: width * 0.6,
    height: 180,
    borderRadius: 20,
    marginRight: 16,
  },
  reviewCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  reviewDate: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  reviewStars: {
    flexDirection: "row",
    marginBottom: 8,
  },
  reviewComment: {
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
  bookButton: {
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  bookButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
