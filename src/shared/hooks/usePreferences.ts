import { useContext } from 'react';

import {
  PreferencesContext,
  PreferencesContextValue,
} from '@/src/app/store/PreferencesContext';

export const usePreferences = () => {
  return useContext<PreferencesContextValue>(PreferencesContext);
};
