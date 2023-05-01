import React from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
        const userProfile = await getDoc(doc(db, 'users', userCredential.user.uid));

        if (userProfile.exists()) {
            if (!userProfile.data().newFeatures) {
                await updateDoc(doc(db, 'users', userCredential.user.uid), {
                    newFeatures: true
                });
            }
        }
    });
};


const register = async (email: string, password: string, firstname: string, lastname: string, phoneNumber: string, bankAccountNumber: string, address: string, city: string, postcode: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const uid = user.uid;
    await setDoc(doc(db, 'users', user.uid), {
        uid,
        email,
        firstname,
        lastname,
        phoneNumber,
        bankAccountNumber,
        address,
        city,
        postcode,
        newFeatures: true
    });
    return user;
};

const logOut = async () => {
    return signOut(auth);
};
export { login, register, logOut };