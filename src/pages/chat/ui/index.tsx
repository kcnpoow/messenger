import { StatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { RootStackProps } from '@/src/shared/types/routes';

export const Chat = ({ route }: RootStackProps<'Chat'>) => {
  const theme = useTheme();

  const { conversationId, companionId } = route.params;

  return (
    <>
      <StatusBar backgroundColor={theme.colors.surface} />
      {companionId && <Header companionId={companionId} />}
      <Main conversationId={conversationId} />
      {companionId && (
        <Footer companionId={companionId} conversationId={conversationId} />
      )}
    </>
  );
};
