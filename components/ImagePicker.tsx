import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImagePickerComponentProps {
  onImagePicked: (image: { uri: string }) => void;
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({ onImagePicked }) => {
  const [selectedImage, setSelectedImage] = useState<{ uri: string } | null>(null);

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need media library permissions to make this work!');
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
        setSelectedImage({ uri: result.uri });
        onImagePicked({ uri: result.uri });
    }
    };
        


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>
      {selectedImage && (
        <Image source={selectedImage} style={styles.image} resizeMode="contain" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 150,
  },
});

export default ImagePickerComponent;
