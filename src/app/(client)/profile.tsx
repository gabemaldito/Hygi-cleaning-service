import { useAuth } from "@/context/AuthContext";
import Colors from "@/theme/colors";
import { Button, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      <Button title="Sair da Conta" onPress={signOut} color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.textPrimary,
  },
});
