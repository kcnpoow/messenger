import { Avatar, AvatarTextProps } from 'react-native-paper';

type UserAvatarProps = {
  firstName: string;
  lastName: string;
} & Omit<AvatarTextProps, 'label'>;

const constructAvatarLabel = (firstName: string, lastName: string) => {
  const avatarLabel = firstName[0].toUpperCase() + lastName[0].toUpperCase();

  return avatarLabel;
};

export const UserAvatar = ({
  firstName,
  lastName,
  ...props
}: UserAvatarProps) => {
  const label = constructAvatarLabel(firstName, lastName);

  return <Avatar.Text {...props} label={label} />;
};
