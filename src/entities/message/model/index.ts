export type Attachment = {
  url: string;
  width: number;
  height: number;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: number;
  attachments: Attachment[];
};
