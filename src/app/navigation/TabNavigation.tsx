import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import { Profile } from '@/src/pages/profile';
import { Messages } from '@/src/pages/messages';
import { Settings } from '@/src/pages/settings';
import { TabNavigationHeader } from '@/src/widgets/tab-navigation-header';
import { TabNavigationBottomBar } from '@/src/widgets/tab-navigation-bottom-bar';
import { TabNavigationParamList } from '@/src/shared/types/routes';

const Tab = createBottomTabNavigator<TabNavigationParamList>();

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={TabNavigationBottomBar}
      screenOptions={({ route }) => ({
        header: () => <TabNavigationHeader title={route.name} />,
      })}
      initialRouteName='Messages'
    >
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name='user' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Messages'
        component={Messages}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name='mail' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Settings'
        component={Settings}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name='settings' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
