import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { db, storage } from '../../config/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthentication } from '../useAuthentication';



async function pickImage(savePath: string, docPath: string, docName: string, fileName: string) {

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const response = await fetch(result.assets[0].uri);
            const blob = await response.blob();
            const fileName = result.assets[0].uri.split('/').pop();
    const storageRef = ref(storage, `${savePath}/${fileName}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    const docRef = doc(db, docPath, docName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        await updateDoc(docRef, {
            photoURL: downloadURL,
        });
        }
  }
  return result;
}

async function takePhoto(savePath: string, docPath: string, docName: string, fileName: string) {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  // Request permissions before accessing the camera roll
  if (!status) {
    const { status } = await requestPermission();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
  

  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const response = await fetch(result.assets[0].uri);
    const blob = await response.blob();
    const fileName = result.assets[0].uri.split('/').pop();
    const storageRef = ref(storage, `${savePath}/${fileName}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    const docRef = doc(db, docPath, docName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        await updateDoc(docRef, {
            photoURL: downloadURL,
        });
        }
  }
  return result;
}

const deletePhoto = async (docPath: string, docName: string, fileName: string) => {
  const storageRef = ref(storage, `${docPath}/${fileName}`);
  await deleteObject(storageRef);
  const docRef = doc(db, docPath, docName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      photoURL: null,
    });
  }
};

export { pickImage, takePhoto, deletePhoto };