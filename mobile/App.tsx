import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import VideoConverter from './src/components/VideoConverter';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { VideoProvider } from './src/contexts/VideoContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <VideoProvider>
          <StatusBar style="auto" />
          <VideoConverter />
        </VideoProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
} 