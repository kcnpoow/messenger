import { Pressable, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { Row } from '@/src/shared/ui/layout';

type PromptProps = {
  promptText: string;
  linkText: string;
  onLinkPress: () => void;
};

export const Prompt = ({ promptText, linkText, onLinkPress }: PromptProps) => {
  const theme = useTheme();

  return (
    <View style={{ marginTop: 32 }}>
      <Row justifyContent='center'>
        <Text>{promptText}</Text>
        <Pressable onPress={onLinkPress}>
          <Text style={{ color: theme.colors.primary }}>{linkText}</Text>
        </Pressable>
      </Row>
    </View>
  );
};
