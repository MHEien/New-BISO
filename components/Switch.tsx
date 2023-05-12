import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SwitchProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    leftText?: string;
    rightText?: string;
}

const Switch: React.FC<SwitchProps> = ({ value, onValueChange, leftText, rightText }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={value ? styles.buttonActive : styles.button}
        onPress={() => onValueChange(true)}
      >
        <Text style={styles.text}>{leftText}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={!value ? styles.buttonActive : styles.button}
        onPress={() => onValueChange(false)}
      >
        <Text style={styles.text}>{rightText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
  },
  button: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  text: {
    fontSize: 16,
  },
});

export default Switch;
