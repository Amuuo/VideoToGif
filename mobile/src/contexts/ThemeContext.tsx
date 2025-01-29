import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = useCallback(async () => {
    try {
      const newTheme = !isDarkMode;
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
      setIsDarkMode(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, [isDarkMode]);

  const value = useMemo(() => ({ isDarkMode, toggleTheme }), [isDarkMode, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 