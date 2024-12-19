import { Pressable } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

import { Container, Row, Col } from '@/src/shared/ui/layout';
import { UserAvatar } from '@/src/shared/ui/UserAvatar';
import { useAuth } from '@/src/shared/hooks/useAuth';

export const Profile = () => {
  const theme = useTheme();
  const { user } = useAuth();

  if (!user) {
    return;
  }

  return (
    <Container
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
    >
      <UserAvatar
        style={{ marginBottom: 16 }}
        firstName={user.firstName}
        lastName={user.lastName}
        size={70}
      />

      <Text variant='headlineMedium' style={{ marginBottom: 32 }}>
        {user.firstName} {user.lastName}
      </Text>

      <Text
        variant='titleMedium'
        style={{ color: theme.colors.tertiary, marginBottom: 8 }}
      >
        {user.status}
      </Text>

      <Row alignItems='center'>
        <Text
          variant='labelMedium'
          style={{ color: theme.colors.secondary, marginRight: 4 }}
        >
          Your status
        </Text>

        <Pressable>
          <Icon name='edit' size={14} color={theme.colors.primary} />
        </Pressable>
      </Row>
    </Container>
  );
};
