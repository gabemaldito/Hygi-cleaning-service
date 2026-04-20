import Colors from "@/theme/colors";
import { StyleSheet, Text, View } from "react-native";

export default function EarningsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Ganhos</Text>
      <Text style={styles.subtitle}>R$ 0,00</Text>
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
    marginBottom: 10,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 32,
    color: Colors.primary,
    fontWeight: "bold",
  },
});
