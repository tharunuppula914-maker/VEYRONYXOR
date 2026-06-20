import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './colors';
import { Theme, ThemeMode } from '@/types';

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(
    colorScheme === 'dark'
  );

  const theme: Theme = {
    mode: isDarkMode ? 'dark' : 'light',
    colors: isDarkMode ? darkTheme : lightTheme,
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const setThemeMode = (mode: ThemeMode) => {
    setIsDarkMode(mode === 'dark');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode,
        toggleTheme,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};