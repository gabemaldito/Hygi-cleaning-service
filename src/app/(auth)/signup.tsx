import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/context/AuthContext";
import { FormInput } from "@/components/FormInput";

export default function SignupScreen() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"client" | "professional">("client");

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Senha fraca", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      signIn("dummy-signup-token", userType);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a conta. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-8">
            <Text className="text-3xl font-bold text-textPrimary mb-2">Crie sua conta</Text>
            <Text className="text-base text-textSecondary leading-6">
              Junte-se ao Hygi para serviços de limpeza prêmio.
            </Text>
          </View>

          {/* User Type Selector */}
          <View className="flex-row mb-8 bg-surface p-1 rounded-2xl">
            <TouchableOpacity
              className={`flex-1 py-3 items-center rounded-xl ${userType === "client" ? 'bg-white shadow-sm' : ''}`}
              onPress={() => setUserType("client")}
            >
              <Text className={`text-sm font-medium ${userType === "client" ? 'text-primary font-bold' : 'text-textSecondary'}`}>
                Cliente
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 py-3 items-center rounded-xl ${userType === "professional" ? 'bg-white shadow-sm' : ''}`}
              onPress={() => setUserType("professional")}
            >
              <Text className={`text-sm font-medium ${userType === "professional" ? 'text-primary font-bold' : 'text-textSecondary'}`}>
                Profissional
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1">
            <FormInput
              label="Nome completo"
              icon="person-outline"
              placeholder="Seu nome"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <FormInput
              label="E-mail"
              icon="mail-outline"
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <FormInput
              label="Senha"
              icon="lock-closed-outline"
              placeholder="Sua senha segura"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              rightIcon={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
              onRightIconPress={() => setPasswordVisible(!isPasswordVisible)}
            />

            <Text className="text-xs text-textSecondary text-center my-4 leading-5">
              Ao selecionar &quot;Criar Conta&quot;, você concorda com os{" "}
              <Text className="text-primary font-medium underline">Termos de Serviço</Text> e{" "}
              <Text className="text-primary font-medium underline">Política de Privacidade</Text> do Hygi.
            </Text>

            <TouchableOpacity
              className={`bg-primary rounded-full h-14 justify-center items-center mt-2 shadow-lg shadow-primary ${isSubmitting ? 'opacity-70' : ''}`}
              onPress={handleSignup}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-base">Criar Conta</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-8 items-center py-2"
              onPress={() => router.push("/(auth)/login")}
            >
              <Text className="text-textSecondary text-sm">
                Já tem uma conta?{" "}
                <Text className="text-primary font-bold">Entrar</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
