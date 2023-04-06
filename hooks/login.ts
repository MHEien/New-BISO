import React from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
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
    });
    return user;
};

export { login, register };