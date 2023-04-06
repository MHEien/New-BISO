import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Button } from './Themed';
import { Link } from 'expo-router';
import i18n from '../constants/localization';

interface BannerProps {
  isAuthenticated: boolean;
  onLoginPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const Banner: React.FC<BannerProps> = ({ isAuthenticated, onLoginPress, style }) => {
  if (isAuthenticated) {
    return null;
  }

  return (
    <View style={[styles.banner, style]}>
      <Text style={styles.welcomeText}>{i18n.t('welcome_message')}</Text>
      <Link href={'/login'}>
      <View style={styles.loginButton}>
        <Text style={styles.buttonText}>{i18n.t('login')}</Text>
      </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#8bc34a',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '100%',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loginButton: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Banner;
