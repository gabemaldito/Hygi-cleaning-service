import React, { createContext, useContext, useEffect, useState } from 'react';

type UserType = 'client' | 'professional' | null;

interface AuthContextType {
  userToken: string | null;
  userType: UserType;
  isLoading: boolean;
  signIn: (token: string, type: UserType) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userToken: null,
  userType: null,
  isLoading: true,
  signIn: () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking storage for credentials
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const signIn = (token: string, type: UserType) => {
    setUserToken(token);
    setUserType(type);
  };

  const signOut = () => {
    setUserToken(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userType,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
