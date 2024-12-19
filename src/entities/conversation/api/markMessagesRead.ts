import { setDoc, doc } from 'firebase/firestore';

import { db } from '@/src/shared/config/firebase';

export const markMessagesRead = async (
  userId: string,
  conversationId: string
) => {
  await setDoc(
    doc(db, 'conversations', conversationId),
    {
      readBy: {
        [userId]: 0,
      },
    },
    { merge: true }
  );
};
