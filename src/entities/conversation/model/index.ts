export type Conversation = {
  id: string;
  participants: string[];
  lastMessageSenderId: string;
  lastMessageContent: string;
  lastMessageTimestamp: number;
  readBy: {
    [userId: string]: number;
  };
};
