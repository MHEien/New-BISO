import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { Layout, Text, Button } from '@ui-kitten/components';

export default function WelcomeScreen({setIsFirstTime}: {setIsFirstTime: (arg0: boolean) => void;}) {
    const theme = useTheme();

    return (
        <Layout style={styles.container}>
            <Text style={styles.title} category="h1">
                Welcome to the app!
            </Text>
            <Button style={styles.button} onPress={() => setIsFirstTime(false)}>
                Get started
            </Button>
        </Layout>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
});
