import { Text, View } from "react-native";

export default function MessagesScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white p-5">
      <Text className="text-2xl font-bold mb-2.5 text-textPrimary">Mensagens</Text>
      <Text className="text-base text-textSecondary text-center">Nenhuma conversa por enquanto.</Text>
    </View>
  );
}
