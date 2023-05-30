import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native'


const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});


export { db, storage, auth };
