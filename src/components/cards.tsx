import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

interface ServiceCardProps {
  name: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
}

export function ServiceCard({ name, category, price, rating, imageUrl }: ServiceCardProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      className="flex-row bg-white p-4 mx-4 my-2 rounded-3xl shadow-lg shadow-black/5 border border-gray-50 items-center"
    >
      {/* Avatar Container */}
      <View className="relative">
        <Image 
          source={{ uri: imageUrl }} 
          className="w-20 h-20 rounded-2xl bg-gray-100"
          contentFit="cover"
          transition={500}
        />
        <View className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
          <View className="bg-success w-3 h-3 rounded-full border-2 border-white" />
        </View>
      </View>

      {/* Content Info */}
      <View className="flex-1 ml-4 justify-center">
        <View className="flex-row justify-between items-start">
          <View className="flex-1 mr-2">
            <Text className="text-textPrimary font-bold text-lg leading-6" numberOfLines={1}>
              {name}
            </Text>
            <View className="flex-row items-center mt-0.5">
              <Text className="text-textSecondary text-xs font-medium">{category}</Text>
              <View className="w-1 h-1 rounded-full bg-gray-300 mx-1.5" />
              <View className="flex-row items-center">
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text className="text-textPrimary font-bold text-xs ml-0.5">{rating}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-3">
          <View className="flex-row items-baseline">
            <Text className="text-primary font-bold text-lg">R$ {price.toFixed(0)}</Text>
            <Text className="text-textSecondary text-xs font-medium ml-1">/h</Text>
          </View>
          
          <View className="bg-primary/10 px-3 py-1.5 rounded-full">
            <Text className="text-primary font-bold text-[10px] uppercase tracking-wider">
              Reservar
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}