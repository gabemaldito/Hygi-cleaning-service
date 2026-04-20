import { Text, View } from "react-native";

export default function BookingsScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white p-5">
      <Text className="text-2xl font-bold mb-2.5 text-textPrimary">Meus Agendamentos</Text>
      <Text className="text-base text-textSecondary text-center">Você ainda não tem agendamentos.</Text>
    </View>
  );
}
