import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, ViewStyle } from 'react-native';

interface SwitchProps {
  onClick: (value: boolean) => void;
  mode?: 'horizontal' | 'vertical';
  style?: object;
  isEnabled?: boolean;
  initialValue?: boolean;
  onText?: string;
  offText?: string;
}

const Switch: React.FC<SwitchProps> = ({
  onClick,
  mode = 'horizontal',
  style,
  isEnabled = true,
  initialValue = false,
  onText = 'On',
  offText = 'Off',
}) => {
  const [isOn, setIsOn] = useState(initialValue);

  const handleToggle = () => {
    if (isEnabled) {
      onClick(!isOn);
      setIsOn(!isOn);
    }
  };

  const containerStyle: ViewStyle = {
    ...styles.container,
    flexDirection: mode === 'horizontal' ? 'row' : 'column',
    opacity: isEnabled ? 1 : 0.5,
    ...style,
  };

  const switchStyle = isOn ? styles.switchOn : styles.switchOff;

  return (
    <TouchableOpacity style={containerStyle} onPress={handleToggle}>
      {mode === 'horizontal' && (
        <Text style={isOn ? styles.textOn : styles.hidden}>{onText}</Text>
      )}
      <View style={[styles.switch, switchStyle]} />
      {mode === 'horizontal' && (
        <Text style={!isOn ? styles.textOff : styles.hidden}>{offText}</Text>
      )}
      {mode === 'vertical' && (
        <Text style={isOn ? styles.textOn : styles.hidden}>{onText}</Text>
      )}
      {mode === 'vertical' && (
        <Text style={!isOn ? styles.textOff : styles.hidden}>{offText}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  switchOn: {
    backgroundColor: '#4cd964',
    marginLeft: 30,
  },
  switchOff: {
    backgroundColor: '#fff',
    marginRight: 30,
  },
  textOn: {
    color: 'white',
  },
  textOff: {
    color: 'white',
  },
  hidden: {
    display: 'none',
  },
});

export default Switch;
