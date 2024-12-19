import {
  getDocs,
  collection,
  where,
  query,
  CollectionReference,
  or,
} from 'firebase/firestore';

import { User } from '@/src/entities/user';
import { db } from '@/src/shared/config/firebase';

export const searchUsers = async (searcherId: string, searchTerm: string) => {
  const q = query(
    collection(db, 'users') as CollectionReference<User>,
    or(
      where('firstName', '==', searchTerm),
      where('lastName', '==', searchTerm)
    )
  );

  const usersDoc = await getDocs(q);

  const usersData: User[] = usersDoc.docs.map((user) => ({
    ...user.data(),
    id: user.id,
  }));

  const filteredUsers = usersData.filter((user) => user.id !== searcherId);

  return filteredUsers;
};
