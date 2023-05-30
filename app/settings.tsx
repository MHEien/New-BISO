import React from 'react';
import { View, StyleSheet } from 'react-native';
import Grid from '../components/Grid';
import Ionicons from '@expo/vector-icons/Ionicons';
import i18n from '../constants/localization';
import { useRouter, useNavigation } from 'expo-router';
import { Link } from 'expo-router';
import { logOut } from '../hooks/login';
import { Layout, Button, Text, useTheme } from '@ui-kitten/components';

const Settings = () => {
    
    const theme = useTheme();

    const iconColor = theme['color-primary-500'];

      const expenseIcon = <Ionicons name="wallet-outline" size={40} color={iconColor} />;
      const electionIcon = <Ionicons name="people-outline" size={40} color={iconColor} />;
      const profileIcon = <Ionicons name="person-outline" size={40} color={iconColor} />;
      //Route translations
      return (
        <Layout style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Button onPress={logOut}>Log out</Button>
        </Layout>
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

export default Settings;