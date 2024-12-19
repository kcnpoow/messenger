import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type TabNavigationParamList = {
  Profile: undefined;
  Messages: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Messages: undefined;
  Settings: undefined;
  Chat: {
    conversationId: string;
    companionId?: string;
  };
  TabNavigation: NavigatorScreenParams<TabNavigationParamList>;
  Loading: undefined;
};

export type RootStackProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
