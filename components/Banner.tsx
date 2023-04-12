import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Button } from './Themed';
import { Link } from 'expo-router';
import i18n from '../constants/localization';
import { useThemeColor } from './Themed';

interface BannerProps {
  isAuthenticated: boolean;
  onLoginPress: () => void;
  style?: StyleProp<ViewStyle>;
}


const Banner: React.FC<BannerProps> = ({ isAuthenticated, onLoginPress, style }) => {
  if (isAuthenticated) {
    return null;
  }
  const bannerColor = useThemeColor({}, 'primaryBackground');
  const textColor = useThemeColor({}, 'text');
  const buttonColor = useThemeColor({}, 'primary');
  const buttonTextColor = useThemeColor({}, 'primaryText');


  return (
    <View style={[styles.banner, style, { backgroundColor: bannerColor }]}>
      <Text style={[styles.welcomeText, { color: textColor }]}>
        {i18n.t('welcome_message')}
      </Text>
      <Link href={'/login'}>
        <View style={[styles.loginButton, { backgroundColor: buttonColor }]}>
          <Text style={[styles.buttonText, { color: buttonTextColor }]}>
            {i18n.t('login')}
          </Text>
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
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '100%',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
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
