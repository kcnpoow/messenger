import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import merge from 'deepmerge';

export const CombinedDefaultTheme = merge(
  MD3LightTheme,
  NavigationDefaultTheme
);
export const CombinedDarkTheme = merge(MD3DarkTheme, NavigationDarkTheme);
