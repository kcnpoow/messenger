import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { ActivityIndicator } from 'react-native-paper';

import { SearchInput, SearchResult, SearchList } from '@/src/features/search';
import {
  Conversation,
  onConversation,
  ConversationRow,
} from '@/src/entities/conversation';
import { useAuth } from '@/src/shared/hooks/useAuth';
import { Container } from '@/src/shared/ui/layout';

export const Messages = () => {
  const { user } = useAuth();

  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const unsubscribe = onConversation(user!.id, setConversations);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Container>
        <SearchInput setSearchResult={setSearchResult} />

        {searchResult && <SearchList searchResult={searchResult} />}
      </Container>

      <View style={{ marginTop: 16 }}>
        {conversations.map((conversation) => (
          <ConversationRow key={conversation.id} conversation={conversation} />
        ))}
      </View>
    </>
  );
};
