import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Screens to be implemented
const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      {/* Authentication screens will be added here */}
      {/* - LoginScreen */}
      {/* - SignUpScreen */}
      {/* - ForgotPasswordScreen */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;