import { ReactNode, useState } from 'react';
import { View, Pressable } from 'react-native';
import { Portal, Modal, Surface, Text, useTheme } from 'react-native-paper';

import { User } from '../model';
import { UserAvatar } from '@/src/shared/ui/UserAvatar';

type UserModalProps = {
  user: User;
  children?: ReactNode;
};

export const UserModal = ({ user, children }: UserModalProps) => {
  const theme = useTheme();

  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <View>
      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={hideModal}
          style={{
            maxWidth: 400,
            marginHorizontal: 'auto',
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 48,
              paddingHorizontal: 16,
              backgroundColor: theme.colors.surface,
            }}
          >
            <UserAvatar
              firstName={user.firstName}
              lastName={user.lastName}
              size={70}
              style={{ marginBottom: 20 }}
            />

            <Text variant='headlineSmall' style={{ marginBottom: 12 }}>
              {fullName}
            </Text>

            <Text style={{ color: theme.colors.tertiary }}>{user.status}</Text>
          </View>
        </Modal>
      </Portal>

      <Pressable onPress={showModal}>{children}</Pressable>
    </View>
  );
};
