import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@/theme/ThemeContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Screens to be implemented
const MainNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          paddingBottom: 5,
          height: 60,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'dashboard' : 'dashboard-outlined';
              break;
            case 'Tasks':
              iconName = focused ? 'task-alt' : 'task-alt';
              break;
            case 'Calendar':
              iconName = focused ? 'calendar-month' : 'calendar-month';
              break;
            case 'Notes':
              iconName = focused ? 'note' : 'note-outlined';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outlined';
              break;
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Stack.Navigator} />
      <Tab.Screen name="Tasks" component={Stack.Navigator} />
      <Tab.Screen name="Calendar" component={Stack.Navigator} />
      <Tab.Screen name="Notes" component={Stack.Navigator} />
      <Tab.Screen name="Settings" component={Stack.Navigator} />
    </Tab.Navigator>
  );
};

export default MainNavigator;