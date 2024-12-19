import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  List,
  TouchableRipple,
  Badge,
  Text,
  useTheme,
} from 'react-native-paper';

import { Conversation } from '../model';
import { User, getUser } from '../../user';
import { useAuth } from '@/src/shared/hooks/useAuth';
import { Container, Row, Col } from '@/src/shared/ui/layout';
import { formatTimestamp } from '@/src/shared/lib/formatTimestamp';
import { UserAvatar } from '@/src/shared/ui/UserAvatar';

type ConversationRowProps = {
  conversation: Conversation;
};

export const ConversationRow = ({ conversation }: ConversationRowProps) => {
  const theme = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();

  const [companion, setCompanion] = useState<User | null>(null);

  const companionId = conversation.participants.filter(
    (participantId) => participantId !== user!.id
  )[0];

  useEffect(() => {
    const fetchCompanion = async () => {
      const fetchedCompanion = await getUser(companionId);

      setCompanion(fetchedCompanion);
    };

    fetchCompanion();
  }, []);

  if (!companion) {
    return;
  }

  const handlePress = () => {
    navigation.navigate('Chat', {
      companionId: companion.id,
      conversationId: conversation.id,
    });
  };

  const fullName = `${companion.firstName} ${companion.lastName}`;

  const description =
    (user!.id === conversation.lastMessageSenderId ? 'You: ' : '') +
    conversation.lastMessageContent;

  const timestamp = formatTimestamp(conversation.lastMessageTimestamp, true);
  const unreadCount = conversation.readBy[user!.id];

  return (
    <TouchableRipple onPress={handlePress}>
      <Container>
        <List.Item
          title={fullName}
          description={description}
          descriptionNumberOfLines={1}
          left={() => (
            <UserAvatar
              firstName={companion.firstName}
              lastName={companion.lastName}
              size={40}
            />
          )}
          right={() => (
            <Col justifyContent='center' alignItems='flex-end' rowGap={0}>
              <Row>
                <Badge visible={unreadCount > 0} size={19}>
                  {conversation.readBy[user!.id]}
                </Badge>
              </Row>
              <Row>
                <Text style={{ color: theme.colors.secondary }}>
                  {timestamp}
                </Text>
              </Row>
            </Col>
          )}
          style={{ paddingHorizontal: 0 }}
        />
      </Container>
    </TouchableRipple>
  );
};
