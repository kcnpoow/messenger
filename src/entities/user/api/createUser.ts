import { setDoc, doc } from 'firebase/firestore';

import { db } from '@/src/shared/config/firebase';

export const createUser = async (
  userId: string,
  firstName: string,
  lastName: string
) => {
  await setDoc(doc(db, 'users', userId), {
    firstName,
    lastName,
    createdAt: Date.now(),
    status: "I'm using React Native messenger!",
  });
};
