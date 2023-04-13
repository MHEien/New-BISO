import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput as DefaultInput, StyleSheet, Animated, TextInputProps } from 'react-native';
import { TextInput as DefaultTextInput } from './Themed';
import { useThemeColor } from './Themed';

interface Props extends TextInputProps {
    label: string;
    style?: any;
  }
  

const TextInput: React.FC<Props> = ({ label, ...otherProps }) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = useRef(new Animated.Value(isFocused ? 0 : 1)).current;
  
  const labelColor = useThemeColor({}, 'text');

  useEffect(() => {
    if (otherProps.value) {
      setIsFocused(true);
      animateLabel(0);
    }
  }, []);

  const animateLabel = (toValue: number) => {
    Animated.timing(labelPosition, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = () => {
    setIsFocused(true);
    animateLabel(0);
  };

  const handleBlur = () => {
    if (!otherProps.value) {
      setIsFocused(false);
      {otherProps.onBlur}
      animateLabel(1);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.label,
          {
            color: labelColor,
            top: labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 20],
            }),
            left: labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 10],
            }),
            fontSize: labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [12, 16],
            }),
          },
        ]}
      >
        {label}
      </Animated.Text>
      <DefaultTextInput
        {...otherProps}
        onFocus={handleFocus}
        onBlur={() => 
          handleBlur()
        }
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 6,
    position: 'relative',
    width: '70%',
  },
  label: {
    position: 'absolute',
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    padding: 0,
    backgroundColor: 'transparent',
  },
});

export default TextInput;
