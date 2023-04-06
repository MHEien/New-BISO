import React from 'react';
import { View, StyleSheet } from 'react-native';
import Grid from '../../components/Grid';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor, Text } from '../../components/Themed';
import i18n from '../../constants/localization';
import { useRouter, useNavigation } from 'expo-router';
import { Link } from 'expo-router';

const MyScreen: React.FC = () => {


  const iconColor = useThemeColor({}, 'iconColor');
  const expenseIcon = <Ionicons name="ios-wallet" size={24} color={iconColor} />;
  const electionIcon = <Ionicons name="ios-people" size={24} color={iconColor} />;
  const profileIcon = <Ionicons name="ios-person" size={24} color={iconColor} />;

  //Route translations
  const expensesTranslated = i18n.t('expenses');
  const settingsTranslated = i18n.t('settings');
  const profileTranslated = i18n.t('profile');

  const router = useRouter();
  const navigation = useNavigation();

  const items = [
    {
      key: 'expenses',
      icon: expenseIcon,
      title: expensesTranslated,
      onPress: () => console.log('Home pressed'),
    },
    {
      key: 'item2',
      icon: electionIcon,
      title: settingsTranslated,
      onPress: () => console.log('Settings pressed'),
    },
    {
      key: 'item3',
      icon: profileIcon,
      title: profileTranslated,
      onPress: () => navigation.navigate('profile'),
    },
  ];

  return (
    <View style={styles.container}>
      <Grid items={items} />
      <Text>{i18n.t('more_services')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyScreen;
