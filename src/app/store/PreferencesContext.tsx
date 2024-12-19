import { createContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type PreferencesContextValue = {
  isThemeDark: boolean;
  toggleTheme: () => void;
};

type PreferencesProviderProps = {
  children: ReactNode;
};

export const PreferencesContext = createContext<PreferencesContextValue>(
  {} as PreferencesContextValue
);

export const PreferencesProvider = ({ children }: PreferencesProviderProps) => {
  const [isThemeDark, setIsThemeDark] = useState(false);

  const toggleTheme = async () => {
    const newTheme = !isThemeDark;
    setIsThemeDark(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await AsyncStorage.getItem('theme');

        setIsThemeDark(theme === 'dark');
      } catch (error) {
        console.log(error);
      }
    };

    loadTheme();
  }, []);

  return (
    <PreferencesContext.Provider value={{ isThemeDark, toggleTheme }}>
      {children}
    </PreferencesContext.Provider>
  );
};
