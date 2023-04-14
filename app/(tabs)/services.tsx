import React from 'react';
import { View, StyleSheet } from 'react-native';
import Grid from '../../components/Grid';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor, Text } from '../../components/Themed';
import i18n from '../../constants/localization';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import ProgressBar from '../../components/ProgressBar';

const MyScreen: React.FC = () => {
  const iconColor = useThemeColor({}, 'iconColor');
  const expenseIcon = <Ionicons name="wallet-outline" size={40} color={iconColor} />;
  const electionIcon = <Ionicons name="clipboard-outline" size={40} color={iconColor} />;
  const profileIcon = <Ionicons name="person-outline" size={40} color={iconColor} />;
  //Route translations
  const expensesTranslated = i18n.t('expenses');
  const profileTranslated = i18n.t('profile');
  const eventsTranslated = i18n.t('events');


  //Bruker velger campus i sin profil, og data her vil etterhvert bli hentet fra backend utifra brukerens campus
  const [progressBarData, setProgressBarData] = React.useState([
    {
      label: 'D-blokka',
      value: 100,
      maxValue: 100,
    },
    {
      label: 'E-blokka',
      value: 50,
      maxValue: 100,
    },
    {
      label: 'F-blokka',
      value: 0,
      maxValue: 100,
    },
  ]);


  const router = useRouter();

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
      title: 'Elections',
      onPress: () => console.log('Elections pressed'),
    },
    {
      key: 'item3',
      icon: profileIcon,
      title: profileTranslated,
      onPress: () => router.push('profile'),
    },
    {
      key: 'item4',
      icon: profileIcon,
      title: eventsTranslated,
      onPress: () => router.push('events'),
    },
    {
      key: 'item5',
      icon: expenseIcon,
      title: 'Create Expense',
      onPress: () => router.push('createExpense'),
    },
  ];

  return (
    <View style={styles.container}>
      <ProgressBar data={progressBarData} 
      style=
      {{ 
        width: '95%', 
        padding: 10, 
        borderRadius: 10, 
        margin: 10 }} 
      header="Avaliable seats" 
      valueLabel='seats available' />
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
