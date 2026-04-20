import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/context/AuthContext";
import Colors from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export default function SignupScreen() {
  const router = useRouter();
  const { signIn } = useAuth(); // In real app, we might use a dedicated signUp function

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"client" | "professional">("client");

  // UX States
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async () => {
    // Basic Validation
    if (!name || !email || !password) {
      Alert.alert(
        "Campos obrigatórios",
        "Por favor, preencha todos os campos."
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert("Senha fraca", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Simulate API delay for UX
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would be:
      // await authService.signUp({ name, email, password, type: userType })

      signIn("dummy-signup-token", userType);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a conta. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginNav = () => {
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Crie sua conta</Text>
            <Text style={styles.subtitle}>
              Junte-se ao Hygi para serviços de limpeza prêmio.
            </Text>
          </View>

          {/* User Type Selector */}
          <View style={styles.typeSelectorContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                userType === "client" && styles.typeButtonActive,
              ]}
              onPress={() => setUserType("client")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  userType === "client" && styles.typeButtonTextActive,
                ]}
              >
                Cliente
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                userType === "professional" && styles.typeButtonActive,
              ]}
              onPress={() => setUserType("professional")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  userType === "professional" && styles.typeButtonTextActive,
                ]}
              >
                Profissional
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome completo</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={Colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Seu nome"
                  placeholderTextColor={Colors.textSecondary}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-mail</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={Colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="seu@email.com"
                  placeholderTextColor={Colors.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={Colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Sua senha segura"
                  placeholderTextColor={Colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={Colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms Disclaimer - Critical for Rover/Airbnb style trust */}
            <Text style={styles.termsText}>
              Ao selecionar &quot;Criar Conta&quot;, você concorda com os{" "}
              <Text style={styles.termsLink}>Termos de Serviço</Text> e{" "}
              <Text style={styles.termsLink}>Política de Privacidade</Text> do
              Hygi.
            </Text>

            <TouchableOpacity
              style={[
                styles.submitButton,
                isSubmitting && styles.submitButtonDisabled,
              ]}
              onPress={handleSignup}
              activeOpacity={0.8}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={styles.submitButtonText}>Criar Conta</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={handleLoginNav}
            >
              <Text style={styles.linkText}>
                Já tem uma conta?{" "}
                <Text style={styles.linkTextBold}>Entrar</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.l,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.l,
  },
  title: {
    fontSize: typography.size.xxl,
    fontFamily: typography.family.bold,
    color: Colors.textPrimary,
    marginBottom: spacing.s,
  },
  subtitle: {
    fontSize: typography.size.m,
    fontFamily: typography.family.regular,
    color: Colors.textSecondary,
    lineHeight: typography.lineHeight.m,
  },
  typeSelectorContainer: {
    flexDirection: "row",
    marginBottom: spacing.l,
    backgroundColor: Colors.surface,
    padding: 4,
    borderRadius: spacing.m,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
  },
  typeButtonActive: {
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  typeButtonText: {
    fontSize: typography.size.s,
    fontFamily: typography.family.medium,
    color: Colors.textSecondary,
  },
  typeButtonTextActive: {
    color: Colors.primary,
    fontFamily: typography.family.bold,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: spacing.m,
  },
  label: {
    fontSize: typography.size.s,
    fontFamily: typography.family.medium,
    color: Colors.textPrimary,
    marginBottom: 6,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row", // Added for icon + input + eye layout
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: spacing.m,
    paddingHorizontal: spacing.m, // Reduced padding if relying on height, but standard is fine
    height: 56, // Fixed height for consistency
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputIcon: {
    marginRight: spacing.s,
  },
  input: {
    flex: 1,
    fontSize: typography.size.m,
    fontFamily: typography.family.regular,
    color: Colors.textPrimary,
    height: "100%", // Take full height of wrapper
    padding: 0,
  },
  termsText: {
    fontSize: typography.size.xs,
    color: Colors.textSecondary,
    textAlign: "center",
    marginVertical: spacing.s,
    lineHeight: 18,
  },
  termsLink: {
    color: Colors.primary,
    fontFamily: typography.family.medium,
    textDecorationLine: "underline",
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: spacing.xl,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.s,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: Colors.white,
    fontFamily: typography.family.bold,
    fontSize: typography.size.m,
  },
  linkButton: {
    marginTop: spacing.l,
    alignItems: "center",
    paddingVertical: spacing.s,
  },
  linkText: {
    color: Colors.textSecondary,
    fontSize: typography.size.s,
    fontFamily: typography.family.regular,
  },
  linkTextBold: {
    color: Colors.primary,
    fontFamily: typography.family.bold,
  },
});
