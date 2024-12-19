import { View } from 'react-native';
import { Surface, useTheme, List, Text } from 'react-native-paper';

import { SearchResult } from '../model';
import { UserRow } from '@/src/entities/user';
import { Container } from '@/src/shared/ui/layout';

type SearchListProps = {
  searchResult: SearchResult;
};

export const SearchList = ({ searchResult }: SearchListProps) => {
  const theme = useTheme();

  return (
    <Surface
      style={{
        marginTop: 16,
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
      }}
    >
      <View style={{ borderRadius: 16, overflow: 'hidden' }}>
        {searchResult.users.length === 0 ? (
          <Text
            style={{
              paddingVertical: 32,
              color: theme.colors.onSurface,
              textAlign: 'center',
            }}
          >
            No Result
          </Text>
        ) : (
          <View>
            <Container>
              <List.Subheader style={{ paddingHorizontal: 0 }}>
                Users
              </List.Subheader>
            </Container>
            {searchResult.users.map((user) => (
              <UserRow key={user.id} companion={user} />
            ))}
          </View>
        )}
      </View>
    </Surface>
  );
};
