import { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';

import { searchUsers } from '../api';
import { SearchResult } from '../model';
import { useAuth } from '@/src/shared/hooks/useAuth';

type SearchInputProps = {
  setSearchResult: (searchResult: SearchResult | null) => void;
};

export const SearchInput = ({ setSearchResult }: SearchInputProps) => {
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    setSearchResult(null);

    if (searchTerm === '') {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const delay = setTimeout(async () => {
      try {
        const users = await searchUsers(user.id, searchTerm);

        setSearchResult({ users });
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  return (
    <Searchbar
      style={{ height: 45 }}
      inputStyle={{ minHeight: 0 }}
      placeholder='Search'
      loading={isLoading}
      value={searchTerm}
      onChangeText={setSearchTerm}
    />
  );
};
