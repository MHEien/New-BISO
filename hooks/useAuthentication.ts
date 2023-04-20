import React from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { getDoc, doc, collection, where, addDoc } from 'firebase/firestore';
import { UserProfile, Expense } from '../types';




//Basic useAuth provided by firebase.
export function useAuthentication() {
  const [user, setUser] = React.useState<User>();
  const [profile, setProfile] = React.useState<UserProfile>();

  const createExpense = async (expense: Expense) => {
    const expenseRef = collection(db, `users/${user?.uid}/expenses`);
    await addDoc(expenseRef, expense);
  };


  const fetcProfile = async (uid: string) => {
    const profileRef = doc(db, 'users', uid);
    const profileSnap = await getDoc(profileRef);

    if (profileSnap.exists()) {
      setProfile(profileSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        fetcProfile(user.uid);
      } else {
        // User is signed out
        setUser(undefined);

      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
    profile,
    createExpense,
  };
}