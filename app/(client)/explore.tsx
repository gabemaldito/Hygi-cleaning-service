import Colors from "@/theme/colors";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width } = Dimensions.get("window");

const PROFESSIONALS = [
  {
    id: "1",
    name: "Maria Silva",
    rating: 4.8,
    reviews: 124,
    price: 85,
    type: "Standard",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    coordinate: { latitude: 38.6041, longitude: -121.3324 }, // Sacramento area
  },
  {
    id: "2",
    name: "Ana Costa",
    rating: 4.9,
    reviews: 89,
    price: 110,
    type: "Deep Clean",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    coordinate: { latitude: 38.6441, longitude: -121.2724 }, // Fair Oaks area
  },
  {
    id: "3",
    name: "Juliana Lima",
    rating: 4.7,
    reviews: 56,
    price: 95,
    type: "Move-out",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    coordinate: { latitude: 38.6141, longitude: -121.3124 },
  },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [region, setRegion] = useState({
    latitude: 38.6041,
    longitude: -121.3324,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const renderProCard = ({ item }: { item: (typeof PROFESSIONALS)[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/(client)/pro-detail" as any,
          params: item as any,
        } as any)
      }
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{item.name}</Text>
        <View style={styles.ratingRow}>
          <Feather name="star" size={14} color="#FFD700" fill="#FFD700" />
          <Text style={styles.ratingText}>
            {item.rating} ({item.reviews})
          </Text>
        </View>
        <Text style={styles.priceText}>From ${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        customMapStyle={Platform.OS === "android" ? mapStyle : undefined}
      >
        {PROFESSIONALS.map((pro) => (
          <Marker
            key={pro.id}
            coordinate={pro.coordinate}
            title={pro.name}
            onPress={() =>
              router.push({
                pathname: "/(client)/pro-detail" as any,
                params: pro as any,
              } as any)
            }
          >
            <View style={styles.customMarker}>
              <View style={styles.markerInner}>
                <Image source={{ uri: pro.image }} style={styles.markerImage} />
              </View>
              <View style={styles.markerPointer} />
            </View>
          </Marker>
        ))}
      </MapView>

      <View style={styles.header}>
        <BlurView intensity={80} tint="light" style={styles.searchBar}>
          <Feather
            name="search"
            size={20}
            color={Colors.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search address or professional..."
            placeholderTextColor={Colors.textSecondary}
            style={styles.searchInput}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => router.push("/(client)/filters")}
          >
            <Feather name="sliders" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </BlurView>
      </View>

      <View style={styles.footer}>
        <FlatList
          data={PROFESSIONALS}
          renderItem={renderProCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
          snapToInterval={width * 0.7 + 20}
          decelerationRate="fast"
        />
      </View>
    </View>
  );
}

const mapStyle = [
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.business",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 54,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  filterButton: {
    padding: 8,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  carouselContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: width * 0.7,
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  cardName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
    marginTop: 6,
  },
  customMarker: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    padding: 2,
  },
  markerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  markerPointer: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: Colors.primary,
    transform: [{ rotate: "180deg" }],
    marginTop: -2,
  },
});
