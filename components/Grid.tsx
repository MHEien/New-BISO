import React from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor, Text } from './Themed';

interface GridItem {
  key: string;
  icon: React.ReactElement;
  title: string;
  onPress: () => void;
}

interface GridProps {
  items: GridItem[];
}

const Grid: React.FC<GridProps> = ({ items }) => {
  const renderItem = ({ item }: { item: GridItem }) => (
    <TouchableOpacity style={styles.gridItem} onPress={item.onPress}>
      {item.icon}
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      numColumns={3}
      style={{ width: '100%' }}
    />
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  title: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'normal',
  },
});

export default Grid;
