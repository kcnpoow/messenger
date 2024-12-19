import { addDoc, collection } from 'firebase/firestore';

import { Message, Attachment } from '../model';
import { db } from '@/src/shared/config/firebase';

export const createMessage = async (
  conversationId: string,
  senderId: string,
  content: string,
  attachments: Attachment[]
): Promise<Message> => {
  const message = {
    conversationId,
    senderId,
    content,
    timestamp: Date.now(),
    attachments,
  };

  const messageDoc = await addDoc(collection(db, 'messages'), message);

  return { ...message, id: messageDoc.id };
};
