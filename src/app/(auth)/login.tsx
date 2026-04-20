import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    signIn("dummy-token", "client");
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, justifyContent: 'center', paddingVertical: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View className="items-center mb-8">
            <View className="w-16 h-16 rounded-2xl bg-primary justify-center items-center mb-4 shadow-lg shadow-primary">
              <Text className="text-white text-3xl font-bold">H</Text>
            </View>
            <Text className="text-3xl font-bold text-textPrimary text-center mb-1">Bem-vindo ao Hygi</Text>
            <Text className="text-base text-textSecondary text-center">
              Entre para acessar os melhores serviços.
            </Text>
          </View>

          {/* Form Section */}
          <View className="mb-6">
            <FormInput
              icon="mail-outline"
              placeholder="Seu e-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <FormInput
              icon="lock-closed-outline"
              placeholder="Sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              rightIcon={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
              onRightIconPress={() => setPasswordVisible(!isPasswordVisible)}
            />

            <TouchableOpacity className="self-end mb-8">
              <Text className="text-textSecondary font-medium text-sm">Recuperar senha</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="bg-primary h-14 rounded-full flex-row justify-center items-center shadow-lg shadow-primary" 
              onPress={handleLogin}
            >
              <Text className="text-white font-bold text-base">Entrar</Text>
              <Ionicons
                name="arrow-forward"
                size={20}
                color="white"
                className="ml-2"
              />
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center mb-8 px-4">
            <View className="flex-1 h-[1px] bg-border" />
            <Text className="mx-4 text-textSecondary text-sm">ou entre com</Text>
            <View className="flex-1 h-[1px] bg-border" />
          </View>

          {/* Social Buttons */}
          <View className="flex-row justify-center gap-6 mb-8">
            <TouchableOpacity
              className="w-14 h-14 rounded-full bg-white border border-border justify-center items-center shadow-sm"
              onPress={() => handleSocialLogin("apple")}
            >
              <AntDesign name="apple" size={24} color="#222222" />
            </TouchableOpacity>

            <TouchableOpacity
              className="w-14 h-14 rounded-full bg-white border border-border justify-center items-center shadow-sm"
              onPress={() => handleSocialLogin("google")}
            >
              <AntDesign name="google" size={24} color="#222222" />
            </TouchableOpacity>
          </View>

          {/* Create Account */}
          <View className="mt-4 mb-8 items-center bg-surface p-4 rounded-3xl">
            <Text className="text-textSecondary text-sm mb-2">Ainda não tem conta?</Text>
            <TouchableOpacity
              className="w-full h-12 bg-transparent border-2 border-primary rounded-xl justify-center items-center"
              onPress={() => router.push("/(auth)/signup")}
            >
              <Text className="text-primary font-bold text-base">
                Criar Nova Conta
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
