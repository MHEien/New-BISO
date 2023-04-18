import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, SplashScreen, Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, useColorScheme } from 'react-native';
import { LanguageProvider } from '../contexts/LanguageContext';
import i18n from '../constants/localization';
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { logOut } from '../hooks/login';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function checkNotificationPermissions() {
try {

  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { granted } = await Notifications.requestPermissionsAsync();
    if (!granted) {
      console.log('Notification permission not granted');
      return;
    }
  }
  // Notification permission has been granted
  console.log('Notification permission granted');
}
catch (error) {
  console.log(error);
}
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const router = useRouter();



  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}



function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    checkNotificationPermissions()
  }, [])

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <LanguageProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen
        name="profile"
        options={{
          title: i18n.t('profile'),
          headerRight: () => (
            <Link href="/home" onPress={logOut} asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="log-out-outline"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
        </Stack>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}

