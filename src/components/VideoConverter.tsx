import React, { useState, useCallback, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Slider,
  TextField,
  Typography,
  useTheme as useMuiTheme,
} from '@mui/material';
import { CloudUpload, MovieCreation } from '@mui/icons-material';
import { useVideo } from '../contexts/VideoContext';
import { useTheme } from '../contexts/ThemeContext';

const VideoConverter: React.FC = () => {
  const { isDarkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const { convertToGif, isProcessing, progress } = useVideo();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [options, setOptions] = useState({
    startTime: 0,
    duration: 5,
    width: 480,
    fps: 10,
    quality: 10,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (file.type.startsWith('video/')) {
      setSelectedFile(file);
      setGifUrl(null);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleConvert = async () => {
    if (!selectedFile) return;

    try {
      const url = await convertToGif(selectedFile, options);
      setGifUrl(url);
    } catch (error) {
      console.error('Error converting video:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card
        sx={{
          backgroundColor: isDarkMode ? 'background.paper' : '#ffffff',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Video to GIF Converter
          </Typography>

          <Box
            sx={{
              border: `2px dashed ${muiTheme.palette.primary.main}`,
              borderRadius: 2,
              p: 3,
              mb: 3,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: muiTheme.palette.action.hover,
              },
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="video/*"
              style={{ display: 'none' }}
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
            {!previewUrl ? (
              <>
                <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                <Typography>
                  Drag and drop a video file here, or click to select
                </Typography>
              </>
            ) : (
              <Box sx={{ position: 'relative' }}>
                <video
                  src={previewUrl}
                  controls
                  style={{ maxWidth: '100%', maxHeight: 400 }}
                />
              </Box>
            )}
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Start Time (seconds)</Typography>
              <Slider
                value={options.startTime}
                onChange={(_, value) => setOptions({ ...options, startTime: value as number })}
                min={0}
                max={30}
                step={0.1}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Duration (seconds)</Typography>
              <Slider
                value={options.duration}
                onChange={(_, value) => setOptions({ ...options, duration: value as number })}
                min={1}
                max={10}
                step={0.1}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Width (pixels)"
                type="number"
                value={options.width}
                onChange={(e) => setOptions({ ...options, width: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="FPS"
                type="number"
                value={options.fps}
                onChange={(e) => setOptions({ ...options, fps: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Quality (1-30)"
                type="number"
                value={options.quality}
                onChange={(e) => setOptions({ ...options, quality: Number(e.target.value) })}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleConvert}
              disabled={!selectedFile || isProcessing}
              startIcon={isProcessing ? <CircularProgress size={20} /> : <MovieCreation />}
            >
              {isProcessing ? `Converting... ${progress}%` : 'Convert to GIF'}
            </Button>
          </Box>

          {gifUrl && (
            <Box sx={{ mt: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Generated GIF
              </Typography>
              <img src={gifUrl} alt="Converted GIF" style={{ maxWidth: '100%' }} />
              <Button
                variant="outlined"
                sx={{ mt: 2, display: 'block' }}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = gifUrl;
                  link.download = 'converted.gif';
                  link.click();
                }}
              >
                Download GIF
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default VideoConverter; 