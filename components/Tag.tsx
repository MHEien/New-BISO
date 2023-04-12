import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TagProps {
  color: string;
  content: string;
  onRemove: () => void;
}

const Tag: React.FC<TagProps> = ({ color, content, onRemove }) => {
  return (
    <View style={styles.tagContainer}>
      <View style={[styles.colorLabel, { backgroundColor: color }]} />
      <Text style={styles.content}>{content}</Text>
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Text style={styles.removeText}>x</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  colorLabel: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  content: {
    marginLeft: 10,
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  removeText: {
    fontSize: 16,
  },
});

export default Tag;
