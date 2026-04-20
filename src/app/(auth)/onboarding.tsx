import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/context/AuthContext";

const { width, height } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    title: "Limpeza de Elite",
    description:
      "Encontre os profissionais mais dedicados de Sacramento, prontos para brilhar sua casa.",
    image: require("@/assets/images/clay_cleaner.png"),
    color: "#f7e3fd", 
  },
  {
    id: "2",
    title: "Sempre no Horário",
    description:
      "Agende com facilidade e gerencie seu tempo. Nós cuidamos da faxina, você aproveita o dia.",
    image: require("@/assets/images/clay_calendar.png"),
    color: "#FCE4EC", 
  },
  {
    id: "3",
    title: "Total Confiança",
    description:
      "Segurança máxima e perfis verificados. No Hygi, sua paz de espírito é nossa prioridade.",
    image: require("@/assets/images/glass_shield.png"),
    color: "#E3F2FD", 
  },
];

const Slide = ({ item }: { item: (typeof SLIDES)[0] }) => {
  return (
    <View className="items-center justify-center" style={{ width, height, backgroundColor: item.color }}>
      <View className="w-[80%] h-[80vw] justify-center items-center shadow-2xl shadow-black/10">
        <Image
          source={item.image}
          className="w-full h-full"
          contentFit="contain"
          transition={1000}
        />
      </View>

      <BlurView intensity={80} tint="light" className="w-[85%] p-8 rounded-[32px] mt-12 border border-white/40 overflow-hidden items-center">
        <Text className="text-[28px] font-bold text-textPrimary text-center mb-4">{item.title}</Text>
        <Text className="text-base text-textSecondary text-center leading-6">{item.description}</Text>
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
    <View className="flex-1">
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

      <View className="absolute inset-0 justify-between pointer-events-none">
        <SafeAreaView>
          <View className="px-8 pt-4 items-end">
            <TouchableOpacity onPress={handleSkip} className="pointer-events-auto">
              <Text className="text-textSecondary font-medium text-base bg-white px-4 py-2 rounded-full overflow-hidden">
                Pular
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View className="px-8 pb-16">
          <View className="flex-row justify-center mb-12">
            {SLIDES.map((_, index) => (
              <View
                key={index}
                className={`h-2 mx-1 rounded-full ${currentSlideIndex === index ? 'bg-primary w-6' : 'bg-black/10 w-2'}`}
              />
            ))}
          </View>

          <TouchableOpacity
            className="bg-primary h-14 rounded-full items-center justify-center shadow-lg shadow-primary pointer-events-auto"
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text className="text-white text-base font-bold">
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
