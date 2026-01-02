import React, { createContext, useContext, useEffect, useState } from 'react';

type UserType = 'client' | 'professional' | null;

interface AuthContextType {
  userToken: string | null;
  userType: UserType;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  completeOnboarding: () => void;
  signIn: (token: string, type: UserType) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userToken: null,
  userType: null,
  isLoading: true,
  hasSeenOnboarding: false,
  completeOnboarding: () => {},
  signIn: () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking storage for credentials
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const completeOnboarding = () => {
    setHasSeenOnboarding(true);
  };

  const signIn = (token: string, type: UserType) => {
    setUserToken(token);
    setUserType(type);
  };

  const signOut = () => {
    setUserToken(null);
    setUserType(null);
    setHasSeenOnboarding(false); // Optional: reset onboarding on sign out? Usually no, but for dev maybe. Let's keep it true normally.
    // Actually for logic consistency, simple sign out shouldn't un-see onboarding.
    // But if we want to test again, we reload the app.
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
