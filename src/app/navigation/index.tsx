import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import { TabNavigation } from './TabNavigation';
import { Chat } from '@/src/pages/chat';
import { SignIn, SignUp } from '@/src/pages/authentication';
import { RootStackParamList } from '@/src/shared/types/routes';
import { useAuth } from '@/src/shared/hooks/useAuth';
import { usePreferences } from '@/src/shared/hooks/usePreferences';
import { CombinedDarkTheme, CombinedDefaultTheme } from '@/src/shared/ui/theme';
import { Loader } from '@/src/shared/ui/Loader';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  const { user, isAuthenticating } = useAuth();
  const { isThemeDark } = usePreferences();

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />

      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            navigationBarHidden: true,
          }}
        >
          {isAuthenticating && (
            <Stack.Screen
              name='Loading'
              options={{ title: 'Messenger' }}
              component={Loader}
            />
          )}
          {user && !isAuthenticating ? (
            <Stack.Group>
              <Stack.Screen
                name='TabNavigation'
                options={{ title: 'Messenger' }}
                component={TabNavigation}
              />
              <Stack.Screen name='Chat' component={Chat} />
            </Stack.Group>
          ) : (
            <Stack.Group screenOptions={{ animation: 'none' }}>
              <Stack.Screen name='SignIn' component={SignIn} />
              <Stack.Screen name='SignUp' component={SignUp} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
