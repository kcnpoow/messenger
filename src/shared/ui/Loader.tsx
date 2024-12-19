import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export const Loader = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size={64} />
    </View>
  );
};
