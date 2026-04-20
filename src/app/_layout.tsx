import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';

import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { userToken, userType, isLoading, hasSeenOnboarding } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inClientGroup = segments[0] === '(client)';
    const inProGroup = segments[0] === '(professional)';

    if (!userToken) {
      // If not signed in, redirect to auth group if not already there
      // We also check against the root index to avoid loops or stuck states
      if (!inAuthGroup) {
        if (!hasSeenOnboarding) {
           router.replace('/(auth)/onboarding');
        } else {
           router.replace('/(auth)/login');
        }
      }
    } else {
      // If signed in, redirect based on user type
      if (userType === 'client') {
        if (!inClientGroup) {
          router.replace('/(client)/explore');
        }
      } else if (userType === 'professional') {
        if (!inProGroup) {
          router.replace('/(professional)/jobs');
        }
      }
    }
  }, [userToken, userType, isLoading, segments]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
