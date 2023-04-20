import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Accordion from '../components/Accordion';
import TextInput from '../components/TextInput';
import { Attachment } from '../types';
import { Button } from '../components/Button';
import { Text, useThemeColor } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';


const AttachmentAccordion: React.FC<{
    item: Attachment;
    index: number;
    onDelete: () => void;
    onDescriptionChange: (text: string) => void;
    onDateChange: (text: string) => void;
    onAmountChange: (text: string) => void;
  }> = ({ item, index, onDelete, onDescriptionChange, onDateChange, onAmountChange }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  const primaryBackgroundColor = useThemeColor({}, 'primary');

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      key={item.id}
      style={{
        transform: [{ translateX: slideAnim }],
      }}
    >
      <Accordion
        key={item.id}
        title={`Expense Item ${index + 1}`}
        deleteable={true}
        onDelete={onDelete}
        content={
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.inputContainer}>
              <TextInput key={`description_${item.id}`} label="Description" value={item.description} onChangeText={onDescriptionChange} />
              <TextInput key={`date_${item.id}`} label="Date" value={item.date} onChangeText={onDateChange} />
              <TextInput key={`amount_${item.id}`} label="Amount" value={item.amount} onChangeText={onAmountChange} />
            </View>
            <View style={styles.buttonsContainer}>
              <Button onPress={() => console.log('Button 1 pressed')} style={[styles.button, { backgroundColor: primaryBackgroundColor }]}>
                <Ionicons name="camera" size={24} color="white" />
              </Button>
              <Button onPress={() => console.log('Button 2 pressed')} style={[styles.button, { backgroundColor: primaryBackgroundColor }]}>
                <Ionicons name="document" size={24} color="white" />
                </Button>
            </View>
          </View>
        }
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    inputContainer: {
      width: '70%',
    },
    buttonsContainer: {
      width: '30%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    button: {
        height: 60,
    }
  });

export default AttachmentAccordion;
