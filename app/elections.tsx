import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, useThemeColor } from '../components/Themed';
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
      <View style={styles.container}>
        <Text>Join election by typing in the 5 code below</Text>
        <JoinElection />
        <Text>
          By signing in or creating an account, you will be able to see
          previously participated elections.
        </Text>
      </View>
    );
  }

  if (elections.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Join election by typing in the 5 code below</Text>
        <JoinElection />
        <Text>No elections found</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    router.push('index');
  }

  return (
    <View style={styles.container}>
      <JoinElection />
      <Text>Participated Elections</Text>
      <ScrollView>
        {elections.map((election) => (
          <View key={election.id}>
            <Text>{election.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
