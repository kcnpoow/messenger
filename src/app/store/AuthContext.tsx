import { createContext, ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { User, getUser, updateUserStatus } from '../../entities/user';
import { auth } from '@/src/shared/config/firebase';

export type AuthContextValue = {
  user: User | null;
  setUser: (user: User) => void;
  isAuthenticating: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userCredential) => {
      try {
        if (userCredential) {
          setIsAuthenticating(true);

          const user = await getUser(userCredential.uid);

          await updateUserStatus(user.id, true);
          setUser(user);
        } else {
          if (user) {
            await updateUserStatus(user.id, false);
          }

          setUser(null);
        }
      } finally {
        setIsAuthenticating(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticating }}>
      {children}
    </AuthContext.Provider>
  );
};
