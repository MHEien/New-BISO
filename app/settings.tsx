import React from 'react';
import { View, StyleSheet } from 'react-native';
import Grid from '../components/Grid';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor, Text, Button } from '../components/Themed';
import i18n from '../constants/localization';
import { useRouter, useNavigation } from 'expo-router';
import { Link } from 'expo-router';
import { logOut } from '../hooks/login';

const Settings = () => {
    
      const backgroundColor = useThemeColor({}, 'background');
      const primaryColor = useThemeColor({}, 'primary');
      const iconColor = useThemeColor({}, 'iconColor');
      const expenseIcon = <Ionicons name="wallet-outline" size={40} color={iconColor} />;
      const electionIcon = <Ionicons name="people-outline" size={40} color={iconColor} />;
      const profileIcon = <Ionicons name="person-outline" size={40} color={iconColor} />;
      //Route translations
      return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.title}>Settings</Text>
            <Button onPress={logOut} title='Logout' />
        </View>
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