import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/context/AuthContext";
import Colors from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

const { width, height } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    title: "Limpeza de Elite",
    description:
      "Encontre os profissionais mais dedicados de Sacramento, prontos para brilhar sua casa.",
    image: require("@/assets/images/clay_cleaner.png"),
    color: "#f7e3fdff", // Light sky blue
  },
  {
    id: "2",
    title: "Sempre no Horário",
    description:
      "Agende com facilidade e gerencie seu tempo. Nós cuidamos da faxina, você aproveita o dia.",
    image: require("@/assets/images/clay_calendar.png"),
    color: "#FCE4EC", // Light pink
  },
  {
    id: "3",
    title: "Total Confiança",
    description:
      "Segurança máxima e perfis verificados. No Hygi, sua paz de espírito é nossa prioridade.",
    image: require("@/assets/images/glass_shield.png"),
    color: "#E3F2FD", // Light green
  },
];

const Slide = ({ item }: { item: (typeof SLIDES)[0] }) => {
  return (
    <View style={[styles.slide, { backgroundColor: item.color }]}>
      <View style={styles.imageContainer}>
        <Image
          source={item.image}
          style={styles.image}
          contentFit="contain"
          transition={1000}
        />
      </View>

      <BlurView intensity={80} tint="light" style={styles.glassCard}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </BlurView>
    </View>
  );
};

export default function OnboardingScreen() {
  const { completeOnboarding } = useAuth();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const finishOnboarding = async () => {
    await completeOnboarding();
    router.replace("/(auth)/login");
  };

  const handleNext = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentSlideIndex + 1 });
    } else {
      finishOnboarding();
    }
  };

  const handleSkip = () => {
    finishOnboarding();
  };

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.overlay}>
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.skipText}>Pular</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View style={styles.footer}>
          <View style={styles.indicatorContainer}>
            {SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentSlideIndex === index && styles.indicatorActive,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {currentSlideIndex === SLIDES.length - 1
                ? "Começar Agora"
                : "Próximo"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    pointerEvents: "box-none",
  },
  header: {
    paddingHorizontal: spacing.l,
    paddingTop: spacing.m,
    alignItems: "flex-end",
  },
  skipText: {
    color: Colors.textSecondary,
    fontFamily: typography.family.medium,
    fontSize: typography.size.m,
    backgroundColor: "rgba(255,255,255,1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: "hidden",
  },
  slide: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
    // Claymorphism shadow effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  glassCard: {
    width: width * 0.85,
    padding: spacing.l,
    borderRadius: 32,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    overflow: "hidden",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: typography.family.bold,
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: spacing.m,
  },
  description: {
    fontSize: typography.size.m,
    fontFamily: typography.family.regular,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: spacing.l,
    paddingBottom: spacing.xl + spacing.m,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  indicator: {
    height: 8,
    width: 8,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginHorizontal: 4,
    borderRadius: 4,
  },
  indicatorActive: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: typography.size.m,
    fontFamily: typography.family.bold,
  },
});
