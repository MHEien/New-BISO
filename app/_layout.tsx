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

/*Seems to be a bug regarding fetching permissions in Expo SDK 48 for Android. Will need to fix this when I have time, and will disable notifications for now.*/
/*
Notifications.setNotificationChannelAsync('default', {
  name: 'default',
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: '#FF231F7C',
});
*/
/*
Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    const senderId = notification.request.content.data.sender_id;

    if (senderId === '633338868564') {
      return {
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      };
    } else {
      // Ignore notifications from other sender_ids
      return {
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
      };
    }
  },
});


async function getExpoPushTokenAsync() {

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const token = (await Notifications.getDevicePushTokenAsync()).data;
  console.log(token);
  return token;
}
*/


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

  const [devicePushToken, setDevicePushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  /*
  useEffect(() => {
    getExpoPushTokenAsync().then((token) => setDevicePushToken(token));
  }, []);
*/

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

