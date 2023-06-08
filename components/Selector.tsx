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
import { SelectorProps } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { Layout, Text, Input, StyleService, Button } from '@ui-kitten/components';

const { width } = Dimensions.get('window');

type Props = SelectorProps & {
  multiSelect?: boolean;
  allData?: {
    id: string;
    name: string;
    campus: string;
  }[];
  favoriteData?: {
    id: string;
    name: string;
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
  name: string;
  campus: string;
}[]>([]);

  const filteredData = favoritesOnly && enableFavorites && favoriteData !== undefined
    ? favoriteData
    : allData !== undefined
      ? allData
      : [];
  const filteredDataWithSearch = filteredData.filter((item) =>
    item.name ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) : false
  );

  const toggleFavorites = () => {
    setFavoritesOnly(!favoritesOnly);
  };

  const toggleItemSelection = (item: {
    id: string;
    campus: string;
    name: string;
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
    name: string;
  }) => selectedItems.some((selectedItem) => selectedItem.id === item.id);

  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <Layout style={styles.modalContainer}>
        <Layout style={styles.modalContent}>
          <Layout style={styles.header}>
            <Text style={styles.title}>Select an item</Text>
            <TouchableOpacity onPress={() => {
                onSelect(selectedItems);
                onClose();
              }
            }>
              <Ionicons name="checkmark" size={32} color="white" />
            </TouchableOpacity>
          </Layout>
          {enableFavorites && (
            <Layout style={styles.switchContainer}>
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
            </Layout>
          )}
          {enableSearch && (
  <Input
    style={[styles.searchInput, { width: width - 40 }]}
    placeholder="Search"
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
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }}
  keyExtractor={(item) => item.id.toString()}
/>

<TouchableOpacity style={styles.closeButton} onPress={onClose}>
  <Text style={[styles.closeButtonText, { color: 'blue' }]}>Close</Text>
</TouchableOpacity>

</Layout>
</Layout>
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
