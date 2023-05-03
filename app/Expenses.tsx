import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Grid from '../components/Grid';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor, Text } from '../components/Themed';
import i18n from '../constants/localization';
import { useRouter, useNavigation } from 'expo-router';
import { Expense } from '../types';
import { FlatList } from 'react-native-gesture-handler';
import ReimbursementListItem from '../components/ReimbursementListItem';
import { query, collectionGroup, where, getDocs, DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuthentication } from '../hooks/useAuthentication';
import { getExpenses } from '../hooks/getExpenses';

export default function Expenses () {
  const iconColor = useThemeColor({}, 'iconColor');
  const expenseIcon = <Ionicons name="wallet-outline" size={40} color={iconColor} />;
  const electionIcon = <Ionicons name="clipboard-outline" size={40} color={iconColor} />;
  const profileIcon = <Ionicons name="person-outline" size={40} color={iconColor} />;
  //Route translations
  const expensesTranslated = i18n.t('expenses');
  const profileTranslated = i18n.t('profile');
  const eventsTranslated = i18n.t('events');

    const { user } = useAuthentication();
  
  const router = useRouter();
  const navigation = useNavigation();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    getExpenses().then((expenses) => {
      setExpenses(expenses);
    }
    );
  }, []);

  


  const renderItem = ({ item }: { item: Expense }) => (
    <ReimbursementListItem
      item={item}
      onPress={() => navigation.navigate('ExpenseDetails', { item })}
    />
  );

  

  return (
    <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        onRefresh={getExpenses}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

});
