# Video to GIF Converter - Mobile App

A React Native mobile application that allows users to convert video files to GIF format directly on their mobile device using FFmpeg WebAssembly. Built with React Native, Expo, and TypeScript.

## Features

- 🎥 Convert video files to GIF format
- 📱 Native mobile UI and UX
- 🎨 Customizable conversion options:
  - Start time
  - Duration
  - Output width
  - FPS (Frames Per Second)
- 🌓 Dark/Light theme support (follows system theme)
- 📸 Direct access to device camera roll
- 💾 Save GIFs to device gallery

## Prerequisites

- Node.js >= 18
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio & Android SDK (for Android development)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Run on your device or simulator:
- Press `i` to run on iOS Simulator
- Press `a` to run on Android Emulator
- Scan QR code with Expo Go app on your physical device

## Technology Stack

- React Native
- Expo
- TypeScript
- FFmpeg WebAssembly
- @ffmpeg/ffmpeg
- @ffmpeg/core
- @ffmpeg/util
- Expo Image Picker
- Expo Media Library
- React Native Slider

## Project Structure

```
mobile/
├── src/
│   ├── components/     # React Native components
│   ├── contexts/       # React contexts (Theme, Video)
│   └── assets/        # Static assets
├── App.tsx            # Main application component
└── package.json       # Project dependencies
```

## Development

To start the development server:

```bash
npm start
```

## Platform Specific Notes

### iOS
- Requires Xcode and iOS Simulator for development
- Camera and Photo Library permissions required

### Android
- Requires Android Studio and Android SDK
- Storage permissions required for saving GIFs

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 