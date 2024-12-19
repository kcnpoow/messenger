import { useContext } from 'react';

import { AuthContext, AuthContextValue } from '@/src/app/store/AuthContext';

export const useAuth = () => {
  return useContext<AuthContextValue>(AuthContext);
};
