import React, { useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { View, Text, useThemeColor } from '../components/Themed';

interface SelectorProps {
  visible: boolean;
  data: Array<{ id: string; color: string; label: string }>;
  onSelect: (item: { id: string; color: string; label: string }) => void;
  onClose: () => void;
}

const Selector: React.FC<SelectorProps> = ({
  visible,
  data,
  onSelect,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select an item</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.listItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
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
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    width: '80%',
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
    color: 'blue',
  },
});

export default Selector;
