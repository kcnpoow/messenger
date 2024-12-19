import { registerRootComponent } from 'expo';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PreferencesProvider } from './store/PreferencesContext';
import { AuthProvider } from './store/AuthContext';
import { App } from './App';

registerRootComponent(() => (
  <SafeAreaProvider>
    <PreferencesProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PreferencesProvider>
  </SafeAreaProvider>
));
