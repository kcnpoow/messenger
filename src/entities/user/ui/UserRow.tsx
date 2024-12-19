import { useNavigation } from '@react-navigation/native';
import { List, TouchableRipple } from 'react-native-paper';
import { useAuth } from '@/src/shared/hooks/useAuth';

import { User } from '../model';
import { Container } from '@/src/shared/ui/layout';
import { UserAvatar } from '@/src/shared/ui/UserAvatar';

type UserRowProps = {
  companion: User;
};

export const UserRow = ({ companion }: UserRowProps) => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const handlePress = () => {
    const conversationId = [user!.id, companion.id].sort().join('_');

    navigation.navigate('Chat', {
      conversationId,
      companionId: companion.id,
    });
  };

  const fullName = `${companion.firstName} ${companion.lastName}`;

  return (
    <TouchableRipple onPress={handlePress}>
      <Container>
        <List.Item
          title={fullName}
          left={() => (
            <UserAvatar
              firstName={companion.firstName}
              lastName={companion.lastName}
              size={40}
            />
          )}
        />
      </Container>
    </TouchableRipple>
  );
};
