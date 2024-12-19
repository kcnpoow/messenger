import { setDoc, doc, increment } from 'firebase/firestore';

import { db } from '@/src/shared/config/firebase';

export const updateConversation = async (
  senderId: string,
  receiverId: string,
  conversationId: string,
  lastMessageId: string,
  lastMessageSenderId: string,
  lastMessageContent: string,
  lastMessageTimestamp: number
) => {
  await setDoc(
    doc(db, 'conversations', conversationId),
    {
      participants: [senderId, receiverId],
      lastMessageId,
      lastMessageSenderId,
      lastMessageContent,
      lastMessageTimestamp,
      readBy: {
        [receiverId]: increment(1),
      },
    },
    { merge: true }
  );
};
