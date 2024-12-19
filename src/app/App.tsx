import { useEffect } from 'react';
import { Platform, AppState } from 'react-native';

import { Navigation } from './navigation';
import { updateUserStatus } from '../entities/user';
import { useAuth } from '../shared/hooks/useAuth';

export const App = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }

    if (Platform.OS === 'web') {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          updateUserStatus(user.id, false);
        } else if (document.visibilityState === 'visible') {
          updateUserStatus(user.id, true);
        }
      };

      const handleBeforeUnload = () => {
        updateUserStatus(user.id, false);
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    } else {
      AppState.addEventListener('change', (state) => {
        if (state === 'active') {
          updateUserStatus(user!.id, true);
        } else {
          updateUserStatus(user!.id, false);
        }
      });
    }
  }, [user]);

  return <Navigation />;
};
