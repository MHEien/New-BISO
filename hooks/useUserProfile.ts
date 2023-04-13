import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuthentication } from './useAuthentication';

export interface UserProfile {
  address?: string;
  city?: string;
  zip?: string;
  // Add other fields as needed
}

export function useUserProfile() {
  const { user } = useAuthentication();
  const [profile, setProfile] = useState<UserProfile>({});

  useEffect(() => {
    if (!user) return;

    const fetchUserProfile = async () => {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      if (userData) {
        setProfile({
          address: userData.address,
          city: userData.city,
          zip: userData.zip,
        });
      }
    };

    fetchUserProfile();
  }, [user]);

  const updateUserProfile = async (updatedFields: Partial<UserProfile>) => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), updatedFields);
      setProfile((prevProfile) => ({ ...prevProfile, ...updatedFields }));
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return {
    profile,
    updateUserProfile,
  };
}
