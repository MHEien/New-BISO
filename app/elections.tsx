import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
import { useAuthentication } from '../hooks/useAuthentication';
import { ElectionProps } from '../types';
import { getElections } from '../hooks/electionHooks';
import { useRouter } from 'expo-router';
import { getVoterKey } from '../hooks/electionHooks';
import JoinElection from '../components/JoinElection';

export default function Elections() {
  const { user } = useAuthentication();
  const email = user?.email;
  const uid = user?.uid;
  const isAuthenticated = user ? true : false;
  const [elections, setElections] = useState<ElectionProps[]>([]);


  const router = useRouter();

  useEffect(() => {
    if (email) {
      getElections(email).then((elections) => {
        setElections(elections);
      });
    }
  }, [email]);

  if (!email) {
    return null;
  }

  if (!isAuthenticated && !email) {
    return (
      <Layout style={styles.container}>
        <Text>Join election by typing in the 5 code below</Text>
        <JoinElection />
        <Text>
          By signing in or creating an account, you will be able to see
          previously participated elections.
        </Text>
      </Layout>
    );
  }

  if (elections.length === 0) {
    return (
      <Layout style={styles.container}>
        <Text>Join election by typing in the 5 code below</Text>
        <JoinElection />
        <Text>No elections found</Text>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    router.push('index');
  }

  return (
    <Layout style={styles.container}>
      <JoinElection />
      <Text>Participated Elections</Text>
      <ScrollView>
        {elections.map((election) => (
          <Layout key={election.id}>
            <Text>{election.name}</Text>
          </Layout>
        ))}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
