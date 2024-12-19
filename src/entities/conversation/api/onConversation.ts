import {
  query,
  where,
  collection,
  onSnapshot,
  CollectionReference,
  orderBy,
} from 'firebase/firestore';

import { Conversation } from '../model';
import { db } from '@/src/shared/config/firebase';

export const onConversation = (
  userId: string,
  callback: (conversations: Conversation[]) => void
) => {
  const q = query(
    collection(db, 'conversations') as CollectionReference<Conversation>,
    where('participants', 'array-contains', userId),
    orderBy('lastMessageTimestamp', 'desc')
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const conversationsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    callback(conversationsData);
  });

  return unsubscribe;
};
