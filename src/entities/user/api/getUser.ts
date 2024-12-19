import { getDoc, doc } from 'firebase/firestore';

import { User } from '../model';
import { db } from '@/src/shared/config/firebase';

export const getUser = async (userId: string): Promise<User> => {
  const userDoc = await getDoc(doc(db, 'users', userId));

  const userData = userDoc.data() as User;

  return { ...userData, id: userDoc.id };
};
