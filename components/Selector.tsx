import React, { useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Dimensions,
  Switch,
} from 'react-native';
import { View, Text, useThemeColor } from '../components/Themed';
import { SelectorProps } from '../types';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type Props = SelectorProps & {
  multiSelect?: boolean;
  allData?: {
    id: string;
    label: string;
    campus: string;
  }[];
  favoriteData?: {
    id: string;
    label: string;
    campus: string;
  }[];
};


const Selector: React.FC<Props> = ({
  visible,
  allData,
  favoriteData,
  onSelect,
  onClose,
  enableSearch = false,
  enableFavorites = false,
  multiSelect = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
const [selectedItems, setSelectedItems] = useState<{
  id: string;
  label: string;
  campus: string;
}[]>([]);

  const textColor = useThemeColor({}, 'text');
  const buttonColor = useThemeColor({}, 'primary');

  const filteredData = favoritesOnly && enableFavorites && favoriteData !== undefined
    ? favoriteData
    : allData !== undefined
      ? allData
      : [];
  const filteredDataWithSearch = filteredData.filter((item) =>
    item.label ? item.label.toLowerCase().includes(searchTerm.toLowerCase()) : false
  );

  const toggleFavorites = () => {
    setFavoritesOnly(!favoritesOnly);
  };

  const toggleItemSelection = (item: {
    id: string;
    campus: string;
    label: string;
  }) => {
    if (multiSelect) {
      if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id));
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    } else {
      setSelectedItems([item]);
    }
  };

  const isItemSelected = (item: {
    id: string;
    campus: string;
    label: string;
  }) => selectedItems.some((selectedItem) => selectedItem.id === item.id);

  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Select an item</Text>
            <TouchableOpacity onPress={() => {
                onSelect(selectedItems);
                onClose();
              }
            }>
              <Ionicons name="checkmark" size={32} color="white" />
            </TouchableOpacity>
          </View>
          {enableFavorites && (
            <View style={styles.switchContainer}>
              <TouchableOpacity
                style={[
                  styles.switchButton,
                  !favoritesOnly ? styles.switchActive : null,
                ]}
                onPress={toggleFavorites}
              >
                <Text style={styles.switchText}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.switchButton,
                  favoritesOnly ? styles.switchActive : null,
                ]}
                onPress={toggleFavorites}
              >
                <Text style={styles.switchText}>Favorites</Text>
              </TouchableOpacity>
            </View>
          )}
          {enableSearch && (
  <TextInput
    style={[styles.searchInput, { width: width, color: textColor }]}
    placeholder="Search"
    placeholderTextColor={textColor}
    onChangeText={setSearchTerm}
    value={searchTerm}
  />
)}

<FlatList
  data={filteredDataWithSearch}
  renderItem={({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.listItem,
          isItemSelected(item) ? styles.listItemSelected : null,
        ]}
        onPress={() => toggleItemSelection(item)}
      >
        <Text style={[styles.listItemText, isItemSelected(item) ? styles.listItemSelectedText : null]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  }}
  keyExtractor={(item) => item.id.toString()}
/>

<TouchableOpacity style={styles.closeButton} onPress={onClose}>
  <Text style={[styles.closeButtonText, { color: buttonColor }]}>Close</Text>
</TouchableOpacity>

</View>
</View>
</Modal>
);

};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listItem: {
    paddingVertical: 10,
  },
  listItemText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    fontSize: 18,
  },
  listItemSelected: {
    backgroundColor: 'blue',
  },
  listItemSelectedText: {
    color: 'white',
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'blue',
    width: width - 40,
    marginBottom: 20,
  },
  switchButton: {
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center',
  },
  switchActive: {
    backgroundColor: 'blue',
  },
  switchText: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width - 40,
    marginBottom: 20,
  },
});

export default Selector;
