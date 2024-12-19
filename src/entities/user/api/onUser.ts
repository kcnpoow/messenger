import {
  doc,
  onSnapshot,
} from 'firebase/firestore';

import { User } from '../model';
import { db } from '@/src/shared/config/firebase';

export const onUser = async (
  userId: string,
  callback: (user: User) => void
) => {
  const unsubscribe = onSnapshot(doc(db, 'users', userId), (querySnapshot) => {
    const userData = querySnapshot.data() as User;

    callback(userData);
  });

  return unsubscribe;
};
