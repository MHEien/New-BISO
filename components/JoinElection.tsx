import React, { useState, useRef } from 'react';
import { TextInput, View, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

const MAX_CHARS = 5;

const JoinElection = () => {
  const [value, setValue] = useState<string>('');

  const router = useRouter();


  return (
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          maxLength={5}
          keyboardType="number-pad"
          onChangeText={setValue}
          value={value}
        />
        <Button
          title="Join"
          onPress={() => {
            router.push({ pathname: '/election', params: { electionCode: value } });
          }}
        />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
  },
});

export default JoinElection;
