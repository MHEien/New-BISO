import React, { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import Ionicons from '@expo/vector-icons/Ionicons';
import i18n from '../constants/localization';
import { useRouter } from 'expo-router';
import { Expense } from '../types';
import { FlatList } from 'react-native-gesture-handler';
import ReimbursementListItem from '../components/ReimbursementListItem';
import { useAuthentication } from '../hooks/useAuthentication';
import { getExpenses } from '../hooks/getExpenses';
import FAB from '../components/FAB';
import { useTheme, Layout, StyleService, Text } from '@ui-kitten/components';

export default function Expenses() {
  const { user } = useAuthentication();
  const [uid, setUid] = useState<string>('');
  const [limit, setLimit] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  const router = useRouter();


  useEffect(() => {
    if (user) {
      setUid(user.uid);
    }
  }, [user]);

  useEffect(() => {
    loadExpenses(); // Load initial expenses
  }, []);

  const loadExpenses = () => {
    getExpenses(uid, limit, expenses[expenses.length - 1])
      .then((newExpenses) => {
        setExpenses((prevExpenses) => [...prevExpenses, ...newExpenses]);
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    loadExpenses();
  };

  const renderItem = ({ item }: { item: Expense }) => (
    <ReimbursementListItem
      item={item}
      onPress={() =>
        router.push({ pathname: '/expenses/', params: { item: item } })
      }
      isApproved={item.isApproved}
    />
  );

  const renderFooter = () => {
    if (!isLoadingMore) {
      return null;
    }
    return (
      <Layout style={styles.loadingFooter}>
        <Text style={styles.loadingFooterText}>Loading...</Text>
      </Layout>
    );
  };

  return (
    <Layout>
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
      <FAB
        icon={<Ionicons name="add" size={24} />}
        onPress={() => router.push('createExpense')}
        style={styles.fab}
      />
    </Layout>
  );
}

const styles = StyleService.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
  loadingFooter: {
    alignSelf: 'center',
    marginVertical: 10,
    paddingVertical: 10,
  },
  loadingFooterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
