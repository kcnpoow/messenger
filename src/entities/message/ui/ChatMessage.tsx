import { View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';

import { Message } from '../model';
import { useAuth } from '@/src/shared/hooks/useAuth';
import { formatTimestamp } from '@/src/shared/lib/formatTimestamp';
import { Attachments } from '@/src/shared/ui/Attachments';

type ChatMessageProps = {
  message: Message;
};

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const { user } = useAuth();
  const theme = useTheme();

  const isOwn = user!.id === message.senderId;
  const date = formatTimestamp(message.timestamp);

  return (
    <View
      style={{
        maxWidth: '70%',
        marginVertical: 8,
        alignSelf: isOwn ? 'flex-end' : 'flex-start',
      }}
    >
      <Surface
        style={{
          marginBottom: 8,
          padding: 16,
          backgroundColor: isOwn
            ? theme.colors.primaryContainer
            : theme.colors.tertiaryContainer,
          borderRadius: 10,
          borderBottomRightRadius: isOwn ? 0 : 10,
          borderBottomLeftRadius: isOwn ? 10 : 0,
        }}
      >
        <Text
          style={{
            color: isOwn
              ? theme.colors.onPrimaryContainer
              : theme.colors.onTertiaryContainer,
            flexWrap: 'wrap',
            overflow: 'hidden',
          }}
        >
          {message.content}
        </Text>

        {message.attachments.length > 0 && (
          <Attachments attachments={message.attachments} />
        )}
      </Surface>
      <Text
        style={{
          marginLeft: isOwn ? 'auto' : 0,
          color: theme.colors.onSurfaceVariant,
          fontSize: 12,
        }}
      >
        {date}
      </Text>
    </View>
  );
};
