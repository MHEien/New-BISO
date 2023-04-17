import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import i18n from '../../constants/localization';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
              <Tabs.Screen
        name="services"
        options={{
          title: i18n.t('services'),
          headerRight: () => (
            <Link href="/settings" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="settings-outline"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          tabBarIcon: ({ color }) => <Ionicons name="apps-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: i18n.t('home'),
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="units"
        options={{
          title: i18n.t('units'),
          tabBarIcon: ({ color }) => <Ionicons name="business-outline" color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
