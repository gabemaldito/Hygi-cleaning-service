import { Text, View } from "react-native";

export default function ProCalendarScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold mb-2.5 text-textPrimary">Agenda de Trabalho</Text>
      <Text className="text-base text-textSecondary">Sua agenda está vazia.</Text>
    </View>
  );
}
