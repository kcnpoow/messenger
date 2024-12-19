import { updateDoc, doc } from 'firebase/firestore';

import { db } from '@/src/shared/config/firebase';

export const updateUserStatus = async (userId: string, isOnline: boolean) => {
  await updateDoc(doc(db, 'users', userId), {
    isOnline,
  });
};
