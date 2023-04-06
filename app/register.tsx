import React, { useState, useEffect } from 'react';
import { View, Text, Button } from '../components/Themed';
import TextInput from '../components/TextInput';
import { StyleSheet } from 'react-native';
import i18n from '../constants/localization';
import Stepper from '../components/Stepper';
import MultiSelectList from '../components/MultiSelect';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '../components/Themed';

const RegisterScreen = () => {
    const [steps, setSteps] = useState<React.ReactNode[]>([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const tEmail = i18n.t('email');
    const tPassword = i18n.t('password');

    const iconColor = useThemeColor({}, 'iconColor');

    const expenseIcon = <Ionicons name="ios-wallet" size={24} color={iconColor} />;
    const electionIcon = <Ionicons name="ios-people" size={24} color={iconColor} />;

    const services = [
        {
          id: 1,
          title: 'Expenses',
          subtitle: 'Our expenses module lets you submit and track your expenses directly from the BISO app.',
          icon: expenseIcon,
        },
        {
          id: 2,
          title: 'Elections',
          subtitle: 'The election module lets you vote on issues and candidates directly from the BISO app. (Requires a BISO account, and authentication.)',
          icon: electionIcon,
        },
        {
          id: 3,
          title: 'Item 3',
          subtitle: 'Item 3 description',
          icon: electionIcon,
        },
      ];

    useEffect(() => {
        setSteps([
        <View key="1">
            <Text>
                To personalize your experience, will you be using any of these services?
            </Text>
            <MultiSelectList items={services} />
        </View>,
        <View key="2">
            <Text>Step 2</Text>
        </View>,
        <View key="3">
            <Text>Step 3</Text>
        </View>,
        ]);
    }, []);
    
    const onRegister = () => {
        console.log('onRegister');
    };
    
    return (
        <View style={styles.container}>
        <Stepper steps={steps} onRegister={onRegister} />
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
    
    export default RegisterScreen;