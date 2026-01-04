import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

export default function LoginScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { signIn } = useAuth();

  // The type of user we are logging in as (defaulted or from onboarding)
  const [userType, setUserType] = useState<"client" | "professional">(
    (params.type as any) || "client"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    // In a real app, the backend would tell us the user type or we verify against what's selected.
    signIn("dummy-token", userType);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
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
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoPlaceholder}>
              {/* You could place an Image logo here */}
              <Text style={styles.logoText}>H</Text>
            </View>
            <Text style={styles.title}>Bem-vindo ao Hygi</Text>
            <Text style={styles.subtitle}>
              Entre para acessar os melhores serviços.
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Seu e-mail"
                placeholderTextColor={Colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Sua senha"
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

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Recuperar senha</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Entrar</Text>
              <Ionicons
                name="arrow-forward"
                size={20}
                color={Colors.white}
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou entre com</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin("apple")}
            >
              <AntDesign name="apple" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin("google")}
            >
              <AntDesign name="google" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <View style={styles.spacer} />

          {/* Create Account - Prominent */}
          <View style={styles.createAccountContainer}>
            <Text style={styles.createAccountLabel}>Ainda não tem conta?</Text>
            <TouchableOpacity
              style={styles.createAccountButton}
              onPress={() => router.push("/(auth)/signup")}
            >
              <Text style={styles.createAccountButtonText}>
                Criar Nova Conta
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
    justifyContent: "center", // Garante centralização vertical
    paddingVertical: spacing.l,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.l, // Reduzi de 60 para evitar overflow
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.m,
    // Removi o marginTop excessivo que empurrava o conteúdo pra fora
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoText: {
    color: Colors.white,
    fontSize: 32,
    fontFamily: typography.family.bold,
  },
  title: {
    fontSize: typography.size.xxl,
    fontFamily: typography.family.bold,
    color: Colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: typography.size.m,
    fontFamily: typography.family.regular,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  form: {
    marginBottom: spacing.l,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: spacing.m,
    borderWidth: 1,
    borderColor: "transparent",
    marginBottom: spacing.m,
    height: 56,
    paddingHorizontal: spacing.m,
  },
  inputIcon: {
    marginRight: spacing.m,
  },
  input: {
    flex: 1,
    fontFamily: typography.family.regular,
    fontSize: typography.size.m,
    color: Colors.textPrimary,
    height: "100%",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: spacing.l,
  },
  forgotPasswordText: {
    color: Colors.textSecondary,
    fontFamily: typography.family.medium,
    fontSize: typography.size.s,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: spacing.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  loginButtonText: {
    color: Colors.white,
    fontFamily: typography.family.bold,
    fontSize: typography.size.m,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.l,
    paddingHorizontal: spacing.m,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.m,
    color: Colors.textSecondary,
    fontFamily: typography.family.regular,
    fontSize: typography.size.s,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.l,
    marginBottom: spacing.l,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  spacer: {
    flex: 1,
    minHeight: 20,
  },
  createAccountContainer: {
    marginTop: spacing.m,
    marginBottom: spacing.l,
    alignItems: "center",
    backgroundColor: Colors.surface,
    padding: spacing.m,
    borderRadius: spacing.l,
  },
  createAccountLabel: {
    color: Colors.textSecondary,
    fontFamily: typography.family.regular,
    fontSize: typography.size.s,
    marginBottom: spacing.s,
  },
  createAccountButton: {
    width: "100%",
    height: 50,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: spacing.m,
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButtonText: {
    color: Colors.primary,
    fontFamily: typography.family.bold,
    fontSize: typography.size.m,
  },
});
