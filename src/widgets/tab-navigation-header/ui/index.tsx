import { Appbar } from 'react-native-paper';

type TabNavigationHeaderProps = {
  title: string;
};

export const TabNavigationHeader = ({ title }: TabNavigationHeaderProps) => {
  return (
    <Appbar.Header style={{ backgroundColor: 'transparent' }}>
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};
