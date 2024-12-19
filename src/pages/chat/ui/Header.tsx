import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Text } from 'react-native-paper';

import { User, onUser, UserModal } from '@/src/entities/user';
import { Row, Col } from '@/src/shared/ui/layout';
import { UserAvatar } from '@/src/shared/ui/UserAvatar';

type HeaderProps = {
  companionId: string;
};

export const Header = ({ companionId }: HeaderProps) => {
  const navigation = useNavigation();

  const [companion, setCompanion] = useState<User | null>(null);

  useEffect(() => {
    onUser(companionId, setCompanion);
  }, []);

  if (!companion) {
    return null;
  }

  const fullName = `${companion.firstName} ${companion.lastName}`;

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <UserModal user={companion}>
        <Row alignItems='center'>
          <Col>
            <UserAvatar
              style={{ marginRight: 10 }}
              firstName={companion.firstName}
              lastName={companion.lastName}
              size={40}
            />
          </Col>

          <Col>
            <Row>
              <Text>{fullName}</Text>
            </Row>
            <Row>
              <Text style={{ color: companion.isOnline ? 'green' : 'gray' }}>
                {companion.isOnline ? 'online' : 'offline'}
              </Text>
            </Row>
          </Col>
        </Row>
      </UserModal>
    </Appbar.Header>
  );
};
