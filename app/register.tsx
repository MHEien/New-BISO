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
    const [selectedItems, setSelectedItems] = useState<Set<string | number>>(new Set());
    const [profile, setProfile] = useState({ 
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
        bankAccount: '',
        newFeatures: true,
    });
    
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
        }
      ];
      
      const renderExpensesStep = () => {
        return (
            <View>
                <TextInput
                    label="First Name"
                    value={profile.firstName}
                    onChangeText={(text) => setProfile({ ...profile, firstName: text })}
                />
                <TextInput
                    label="Last Name"
                    value={profile.lastName}
                    onChangeText={(text) => setProfile({ ...profile, lastName: text })}
                />
                <TextInput
                    label="Address"
                    value={profile.address}
                    onChangeText={(text) => setProfile({ ...profile, address: text })}
                />
                <TextInput
                    label="City"
                    value={profile.city}
                    onChangeText={(text) => setProfile({ ...profile, city: text })}
                />
                <TextInput
                    label="Zip"
                    value={profile.zip}
                    onChangeText={(text) => setProfile({ ...profile, zip: text })}
                />
                <TextInput
                    label="Phone"
                    value={profile.phone}
                    onChangeText={(text) => setProfile({ ...profile, phone: text })}
                />
                <TextInput
                    label="Bank Account"
                    value={profile.bankAccount}
                    onChangeText={(text) => setProfile({ ...profile, bankAccount: text })}
                />
            </View>
        );
    };

    const renderElectionsStep = () => {
        return (
            <View>
                <Text>Step 2</Text>
            </View>
        );
    };



    useEffect(() => {
        setSteps([
        <View key="1">
            <Text>
                Will you be using any of these services?
            </Text>
            <MultiSelectList items={services} onSelectionChange={setSelectedItems} />
        </View>,
        
        <View key="2">
            {selectedItems.has(1) && renderExpensesStep()}
        </View>,
        <View key="3">
            <TextInput
                label={tEmail}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                label={tPassword}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
        </View>,
        ]);
    }, [selectedItems, email, password]);
    
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