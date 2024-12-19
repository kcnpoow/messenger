import { Surface, useTheme, Text } from 'react-native-paper';

type GeneralErrorProps = {
  error: string;
};

export const GeneralError = ({ error }: GeneralErrorProps) => {
  const theme = useTheme();

  return (
    <Surface
      style={{
        alignItems: 'center',
        marginBottom: 28,
        padding: 16,
        backgroundColor: theme.colors.errorContainer,
      }}
    >
      <Text style={{ color: theme.colors.onErrorContainer }}>{error}</Text>
    </Surface>
  );
};
