import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';
import { pickImage, takePhoto, deletePhoto } from '../hooks/firebase/imageCapture';
import { useAuthentication } from '../hooks/useAuthentication';
import { Image } from 'expo-image';

export const ProfileImage = () => {
  const { user } = useAuthentication();
  const [modalVisible, setModalVisible] = useState(false);

  if (!user) return null;

  const uid = user.uid;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={{ uri: 'https://picsum.photos/200/300' }}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              pickImage('user_images', 'users', uid, uid);
              setModalVisible(false);
            }}
          >
            <Text style={styles.modalText}>Upload Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              takePhoto('user_images', 'users', uid, uid);
              setModalVisible(false);
            }}
          >
            <Text style={styles.modalText}>Capture Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              deletePhoto('user_images', 'users', user.uid);
              setModalVisible(false);
            }}
          >
            <Text style={styles.modalText}>Delete Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.modalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#333',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default ProfileImage;