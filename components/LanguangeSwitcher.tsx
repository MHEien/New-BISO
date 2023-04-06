import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { Image } from 'expo-image';

interface LanguageSwitcherProps {
  style?: object;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ style }) => {
  const { setLanguage } = useLanguage();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={() => setLanguage('en')}>
        <View style={{ backgroundColor: 'cyan', width: 80, height: 40 }}>
          <Image source={require('../assets/usa.png')} style={{ width: 80, height: 40 }} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setLanguage('nb')}>
        <View style={{ backgroundColor: 'blue', width: 80, height: 40 }}>
          <Image source={require('../assets/norway.png')} style={{ width: 80, height: 40 }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default LanguageSwitcher;
