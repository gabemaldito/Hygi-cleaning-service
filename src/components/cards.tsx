import { View, Text, Image, TouchableOpacity } from 'react-native';

interface ServiceCardProps {
  name: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
}

export function ServiceCard({ name, category, price, rating, imageUrl }: ServiceCardProps) {
  return (
    <TouchableOpacity className="flex-row bg-white p-4 m-2 rounded-2xl shadow-sm border border-gray-100">
      {/* Imagem do Prestador */}
      <Image 
        source={{ uri: imageUrl }} 
        className="w-20 h-20 rounded-xl bg-gray-200"
      />

      {/* Info à Direita */}
      <div className="flex-1 ml-4 justify-between">
        <div className="flex-row justify-between items-start">
          <View>
            <Text className="text-gray-900 font-bold text-lg">{name}</Text>
            <Text className="text-gray-500 text-sm">{category}</Text>
          </View>
          <View className="flex-row items-center bg-green-50 px-2 py-1 rounded-full">
            <Text className="text-green-700 font-bold text-xs">⭐ {rating}</Text>
          </View>
        </div>

        <View className="flex-row justify-between items-end mt-2">
          <Text className="text-blue-600 font-semibold text-base">
            R$ {price.toFixed(2)}/h
          </Text>
          <Text className="text-gray-400 text-xs">Ver perfil</Text>
        </View>
      </div>
    </TouchableOpacity>
  );
}