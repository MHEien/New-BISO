import React, { useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Dimensions
} from 'react-native';
import { View, Text, useThemeColor } from '../components/Themed';
import { SelectorProps } from '../types';

const { width } = Dimensions.get('window');

const Selector: React.FC<SelectorProps> = ({
  visible,
  data,
  onSelect,
  onClose,
  selectedItems = [],
  enableSearch = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const textColor = useThemeColor({}, 'text');
  const buttonColor = useThemeColor({}, 'primary');

  const filteredData = data.filter((item) =>
  item.label
    ? item.label.toLowerCase().includes(searchTerm.toLowerCase())
    : false
);



  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select a department</Text>
          {enableSearch && (
            <TextInput
              style={[styles.searchInput, { width: width, color: textColor }]}
              placeholder='Search'
              placeholderTextColor={textColor}
              onChangeText={setSearchTerm}
              value={searchTerm}
            />
          )}
          <FlatList
            data={filteredData}
            renderItem={({ item }) => {
              const isSelected = selectedItems?.includes(item.label);

              return (
                <TouchableOpacity
                  style={[
                    styles.listItem,
                    isSelected ? styles.listItemSelected : null,
                  ]}
                  onPress={() => onSelect(item)}
                >
                  <Text
                    style={[
                      styles.listItemText,
                      isSelected ? styles.listItemSelectedText : null,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={[styles.closeButtonText, { color: buttonColor }]}>
              Close
            </Text>
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

});

export default Selector;
