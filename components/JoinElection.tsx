import React, { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { useThemeColor } from './Themed';
import { Layout, Input, Button, StyleService } from '@ui-kitten/components';


const JoinElection = () => {
  const [value, setValue] = useState<string>('');

  const router = useRouter();
  const textColor = useThemeColor({}, 'text');


  return (
    <Layout style={styles.container}>
        <Input
          style={[styles.input, { color: textColor }]}
          maxLength={5}
          keyboardType="number-pad"
          onChangeText={setValue}
          value={value}
        />
        <Button
          onPress={() => {
            router.push({ pathname: '/election', params: { electionCode: value } });
          }}>
          Join Election
          </Button>
    </Layout>
  );
};


const styles = StyleService.create({
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
