import React, { useState } from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
    TouchableOpacity,
} from 'react-native';
import { View, Text } from '../components/Themed';
import { useThemeColor } from '../components/Themed';

interface ListItem {
  id: string | number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface MultiSelectListProps {
  items: ListItem[];
  style?: StyleProp<ViewStyle>;
  onSelectionChange?: (selectedItems: Set<string | number>) => void; // add this line
}

const MultiSelectList: React.FC<MultiSelectListProps> = ({ items, style, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState<Set<string | number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const containerBackgroundColor = useThemeColor({}, 'primaryBackground');
  const listItemTextColor = useThemeColor({}, 'text');

  const toggleItemSelection = (id: string | number) => {
    setSelectedItems((prevSelectedItems) => {
      let newSelectedItems;
      if (prevSelectedItems.has(id)) {
        prevSelectedItems.delete(id);
        newSelectedItems = new Set([...prevSelectedItems]);
      } else {
        newSelectedItems = new Set([...prevSelectedItems, id]);
      }

      // call the callback with the new selected items
      if (onSelectionChange) {
        onSelectionChange(newSelectedItems);
      }

      return newSelectedItems;
    });
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());

      // call the callback with an empty set
      if (onSelectionChange) {
        onSelectionChange(new Set());
      }
    } else {
      const allItems = new Set(items.map((item) => item.id));
      setSelectedItems(allItems);

      // call the callback with all items
      if (onSelectionChange) {
        onSelectionChange(allItems);
      }
    }
    setSelectAll(!selectAll);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.selectAllButton} onPress={toggleSelectAll}>
        <Text style={{ color: listItemTextColor }}>{selectAll ? 'Unselect All' : 'Select All'}</Text>
      </TouchableOpacity>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.listItem,
            selectedItems.has(item.id) && styles.selectedItem
          ]}
          onPress={() => toggleItemSelection(item.id)}
        >
            {item.icon}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
          <View style={[styles.checkbox, selectedItems.has(item.id) && styles.checkedCheckbox]} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectAllButton: {
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
  },
  listItem: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
    height: 120,
  },
  selectedItem: {
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#8bc34a',
    marginLeft: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#8bc34a',
  },
});

export default MultiSelectList;
