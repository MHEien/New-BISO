import React from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { getDoc, doc } from 'firebase/firestore';


type Profile = {
  uid: string;
  displayName?: string;
  photoURL?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  bankAccount?: string;
  bic?: string;
};


//Basic useAuth provided by firebase.
export function useAuthentication() {
  const [user, setUser] = React.useState<User>();
  const [profile, setProfile] = React.useState<Profile>();

  const getProfile = async (uid: string) => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    const userData = userDoc.data();
    if (userData) {
      setProfile({
        uid: uid,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        city: userData.city,
        zipCode: userData.zipCode,
        bankAccount: userData.bankAccount,
        bic: userData.bic,
      });
    }
  };

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        getProfile(user.uid);
      } else {
        // User is signed out
        setUser(undefined);
        setProfile(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
    profile,
  };
}