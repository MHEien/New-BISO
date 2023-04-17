import React, { useEffect, useState } from 'react';
import { StyleSheet} from 'react-native';
import { View, Button, Text } from '../components/Themed';
import { useAuthentication } from '../hooks/useAuthentication';
import { login } from '../hooks/login';
import LanguageSwitcher from '../components/LanguangeSwitcher';
import i18n from '../constants/localization';
import TextInput from '../components/TextInput';
import { Link } from 'expo-router';
import { useThemeColor } from '../components/Themed';
import { useNavigation } from 'expo-router';


export default function Login() {
    const { user } = useAuthentication();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const linkTextColor = useThemeColor({}, 'text');


    
    useEffect(() => {
        if (user) {
        navigation.goBack();
        }
    }, [user]);



    return (
        <View style={styles.container}>
        <Text style={styles.title}>{i18n.t('login')}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <LanguageSwitcher />
        <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            label="Email"
        />
        <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            label="Password"
        />
        <Button
            title="Login"
            onPress={() => login(email, password)}
        />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.row}>
        <Text> Not registered?</Text>
        <Link style={{ color: linkTextColor }} href="/register">
            <Text> Register</Text>
        </Link>
        </View>
        </View>
    );
}


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
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        flex: 1,
        width: '300',
    },
    row: {
        flexDirection: 'row',
    },
});
