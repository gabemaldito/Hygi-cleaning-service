import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserType = "client" | "professional" | null;

interface AuthContextType {
  userToken: string | null;
  userType: UserType;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  completeOnboarding: () => void;
  signIn: (token: string, type: UserType) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  userToken: null,
  userType: null,
  isLoading: true,
  hasSeenOnboarding: false,
  completeOnboarding: async () => {},
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("userToken");
        const savedType = await AsyncStorage.getItem("userType");
        const savedOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");

        if (savedToken && savedType) {
          setUserToken(savedToken);
          setUserType(savedType as UserType);
        }

        if (savedOnboarding === "true") {
          setHasSeenOnboarding(true);
        }
      } catch (e) {
        console.error("Erro ao carregar storage", e);
      } finally {
        setIsLoading(false); // Para o loading screen do index.tsx
      }
    };
    loadStorageData();
  }, []);

  const completeOnboarding = async () => {
    setHasSeenOnboarding(true);
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
  };

  const signIn = async (token: string, type: UserType) => {
    try {
      setUserToken(token);
      setUserType(type);
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userType", type as string);
    } catch (e) {
      console.error("Error saving credentials:", e);
    }
  };

  const signOut = async () => {
    try {
      setUserToken(null);
      setUserType(null);
      await AsyncStorage.multiRemove(["userToken", "userType"]);
    } catch (e) {
      console.error("Error clearing storage:", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userType,
        hasSeenOnboarding,
        isLoading,
        completeOnboarding,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
