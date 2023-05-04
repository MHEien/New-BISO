import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, SplashScreen, Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, useColorScheme } from 'react-native';
import { LanguageProvider } from '../contexts/LanguageContext';
import i18n from '../constants/localization';
import { useRouter} from 'expo-router';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { logOut } from '../hooks/login';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useUserProfile } from '../hooks/useUserProfile';
import { UserProfile } from '../types';

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


async function registerForPushNotificationsAsync(profile: UserProfile, updateUserProfile: { (updatedFields: Partial<UserProfile>): Promise<void>; (arg0: { pushToken: string; }): void; }) {
  let token;

  if (Device.isDevice) {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        console.log(status);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync());
      console.log(token.data);

      if (!profile.pushToken || profile.pushToken !== token.data) {
        updateUserProfile({ pushToken: token.data });
      }

    } catch (error) {
      console.error(error);
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (!token) {
    return;
  }
  return token.data;
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
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const [locale, setLocale] = useState<string>(i18n.locale);
const [initialRoute, setInitialRoute] = useState<string | undefined>(undefined);
const { profile, updateUserProfile } = useUserProfile();

const router = useRouter();

  useEffect(() => {
    registerForPushNotificationsAsync(profile, updateUserProfile).then(token => setExpoPushToken(token));
    console.log(expoPushToken);

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    
      // Handle the targetRoute from the notification data
      const targetRoute = response.notification.request.content.data.targetRoute;
      const targetParams = response.notification.request.content.data.targetParams;
     if (targetRoute)
      setTimeout(() => {
        if (targetParams)
        router.push({ pathname: targetRoute, params: targetParams });
        else
        router.push(targetRoute);
      }, 0o1);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!);
      if (responseListener.current !== undefined) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  useEffect(() => {
    if (locale !== i18n.locale) {
      i18n.locale = locale;
    }
  }, [locale]);

  useEffect(() => {
    if (profile && expoPushToken) {
      if (!profile.pushToken) {
        updateUserProfile({ pushToken: expoPushToken });
      } else if (profile.pushToken !== expoPushToken) {
        updateUserProfile({ pushToken: expoPushToken });
      }
    }
  }, [profile, expoPushToken]);



  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <LanguageProvider language={locale} setLanguage={setLocale}>
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