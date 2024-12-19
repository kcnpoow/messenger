import { useEffect, useState, useRef } from 'react';
import { ScrollView } from 'react-native';

import { Message, onMessage, ChatMessage } from '@/src/entities/message';
import { markMessagesRead } from '@/src/entities/conversation';
import { Container } from '@/src/shared/ui/layout';
import { useAuth } from '@/src/shared/hooks/useAuth';

type MainProps = {
  conversationId: string;
};

export const Main = ({ conversationId }: MainProps) => {
  const refMessagesList = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = onMessage(conversationId, (message) => {
      setMessages(message);

      markMessagesRead(user!.id, conversationId);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ScrollView
      style={{ paddingVertical: 8 }}
      ref={refMessagesList}
      onContentSizeChange={() => refMessagesList.current?.scrollToEnd()}
    >
      <Container>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </Container>
    </ScrollView>
  );
};
