import {
  query,
  where,
  collection,
  onSnapshot,
  orderBy,
  CollectionReference,
} from 'firebase/firestore';

import { Message } from '../model';
import { db } from '@/src/shared/config/firebase';

export const onMessage = (
  conversationId: string,
  callback: (messages: Message[]) => void
) => {
  let q = query(
    collection(db, 'messages') as CollectionReference<Message>,
    where('conversationId', '==', conversationId),
    orderBy('timestamp', 'asc')
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messagesData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    callback(messagesData);
  });

  return unsubscribe;
};
