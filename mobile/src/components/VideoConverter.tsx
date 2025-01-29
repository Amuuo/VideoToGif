import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Slider from '@react-native-community/slider';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import { useVideo } from '../contexts/VideoContext';
import { useTheme } from '../contexts/ThemeContext';

interface ConversionOptions {
  startTime: number;
  duration: number;
  width: number;
  fps: number;
  quality: number;
}

const VideoConverter: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { convertToGif, isProcessing, progress } = useVideo();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [options, setOptions] = useState<ConversionOptions>({
    startTime: 0,
    duration: 5,
    width: 480,
    fps: 10,
    quality: 10,
  });

  const pickVideo = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedVideo(result.assets[0].uri);
      setGifUrl(null);
    }
  }, []);

  const handleConvert = async () => {
    if (!selectedVideo) return;

    try {
      const response = await fetch(selectedVideo);
      const blob = await response.blob();
      const file = new File([blob], 'video.mp4', { type: 'video/mp4' });
      const url = await convertToGif(file, options);
      setGifUrl(url);
    } catch (error) {
      console.error('Error converting video:', error);
      alert('Error converting video. Please try again.');
    }
  };

  const saveToGallery = async () => {
    if (!gifUrl) return;

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need media library permissions to save the GIF!');
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(gifUrl);
      await MediaLibrary.createAlbumAsync('GIF Converter', asset, false);
      alert('GIF saved to gallery!');
    } catch (error) {
      console.error('Error saving GIF:', error);
      alert('Error saving GIF. Please try again.');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
    },
    card: {
      backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 16,
      textAlign: 'center',
    },
    uploadArea: {
      borderWidth: 2,
      borderColor: '#1976d2',
      borderStyle: 'dashed',
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
      marginBottom: 16,
    },
    uploadText: {
      color: isDarkMode ? '#ffffff' : '#000000',
      marginTop: 8,
    },
    video: {
      width: '100%',
      height: 200,
      marginBottom: 16,
    },
    optionContainer: {
      marginBottom: 16,
    },
    optionLabel: {
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 8,
    },
    button: {
      backgroundColor: '#1976d2',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
    },
    buttonText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
    gifContainer: {
      marginTop: 16,
      alignItems: 'center',
    },
    gif: {
      width: '100%',
      height: 200,
      marginVertical: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Video to GIF Converter</Text>

        <TouchableOpacity style={styles.uploadArea} onPress={pickVideo}>
          {!selectedVideo ? (
            <>
              <MaterialIcons name="cloud-upload" size={48} color="#1976d2" />
              <Text style={styles.uploadText}>Tap to select a video</Text>
            </>
          ) : (
            <Image source={{ uri: selectedVideo }} style={styles.video} />
          )}
        </TouchableOpacity>

        <View style={styles.optionContainer}>
          <Text style={styles.optionLabel}>Start Time: {options.startTime}s</Text>
          <Slider
            value={options.startTime}
            onValueChange={(value: number) => setOptions({ ...options, startTime: value })}
            minimumValue={0}
            maximumValue={30}
            step={0.1}
          />
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionLabel}>Duration: {options.duration}s</Text>
          <Slider
            value={options.duration}
            onValueChange={(value: number) => setOptions({ ...options, duration: value })}
            minimumValue={1}
            maximumValue={10}
            step={0.1}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { opacity: !selectedVideo || isProcessing ? 0.5 : 1 }]}
          onPress={handleConvert}
          disabled={!selectedVideo || isProcessing}
        >
          {isProcessing ? (
            <>
              <ActivityIndicator color="#ffffff" />
              <Text style={styles.buttonText}>Converting... {progress}%</Text>
            </>
          ) : (
            <Text style={styles.buttonText}>Convert to GIF</Text>
          )}
        </TouchableOpacity>

        {gifUrl && (
          <View style={styles.gifContainer}>
            <Text style={[styles.title, { fontSize: 20 }]}>Generated GIF</Text>
            <Image source={{ uri: gifUrl }} style={styles.gif} />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#1976d2' }]}
              onPress={saveToGallery}
            >
              <Text style={[styles.buttonText, { color: '#1976d2' }]}>Save to Gallery</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default VideoConverter; 