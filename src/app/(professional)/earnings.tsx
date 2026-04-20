import { Text, View } from "react-native";

export default function EarningsScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold mb-2.5 text-textPrimary">Meus Ganhos</Text>
      <Text className="text-[32px] text-primary font-bold">R$ 0,00</Text>
    </View>
  );
}
