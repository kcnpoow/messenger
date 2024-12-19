import { setDoc, doc } from 'firebase/firestore';

import { db } from '@/src/shared/config/firebase';

export const updateUser = async (userId: string, update: object) => {
  const updatedUser = await setDoc(doc(db, 'users', userId), update);

  return updatedUser;
};
