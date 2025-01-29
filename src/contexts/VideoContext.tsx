import React, { createContext, useContext, useState, useCallback } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

interface VideoContextType {
  isProcessing: boolean;
  progress: number;
  convertToGif: (file: File, options: ConversionOptions) => Promise<string>;
}

interface ConversionOptions {
  startTime?: number;
  duration?: number;
  width?: number;
  fps?: number;
  quality?: number;
}

const ffmpeg = new FFmpeg();

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const convertToGif = useCallback(async (file: File, options: ConversionOptions) => {
    try {
      setIsProcessing(true);
      setProgress(0);

      if (!ffmpeg.loaded) {
        await ffmpeg.load();
      }

      const inputFileName = 'input-video';
      const outputFileName = 'output.gif';

      await ffmpeg.writeFile(inputFileName, await fetchFile(file));

      const {
        startTime = 0,
        duration = 5,
        width = 480,
        fps = 10,
      } = options;

      ffmpeg.on('progress', ({ progress }) => {
        setProgress(Math.round(progress * 100));
      });

      const command = [
        '-i', inputFileName,
        '-t', duration.toString(),
        '-ss', startTime.toString(),
        '-vf', `fps=${fps},scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
        '-loop', '0',
        outputFileName
      ];

      await ffmpeg.exec(command);

      const data = await ffmpeg.readFile(outputFileName);
      const gifUrl = URL.createObjectURL(new Blob([data], { type: 'image/gif' }));

      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);

      return gifUrl;
    } catch (error) {
      console.error('Error converting video to GIF:', error);
      throw error;
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, []);

  return (
    <VideoContext.Provider value={{ isProcessing, progress, convertToGif }}>
      {children}
    </VideoContext.Provider>
  );
}; 