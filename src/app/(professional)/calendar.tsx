import Colors from "@/theme/colors";
import { StyleSheet, Text, View } from "react-native";

export default function ProCalendarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda de Trabalho</Text>
      <Text style={styles.subtitle}>Sua agenda está vazia.</Text>
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
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
