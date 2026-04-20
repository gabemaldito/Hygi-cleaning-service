import { useAuth } from "@/context/AuthContext";
import { Button, Text, View } from "react-native";

export default function ProProfileScreen() {
  const { signOut } = useAuth();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold mb-5 text-textPrimary">Perfil Profissional</Text>
      <Button title="Sair da Conta" onPress={signOut} color="#E31C5F" />
    </View>
  );
}
