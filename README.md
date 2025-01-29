# Video to GIF Converter

A modern React application that allows users to convert video files to GIF format directly in the browser using FFmpeg WebAssembly. Built with React, TypeScript, Material-UI, and Vite.

## Features

- 🎥 Convert video files to GIF format
- ⚡ Browser-based conversion (no server upload needed)
- 🎨 Customizable conversion options:
  - Start time
  - Duration
  - Output width
  - FPS (Frames Per Second)
  - Quality settings
- 🌓 Dark/Light theme support
- 📱 Responsive design
- 🎯 Drag and drop file upload

## Prerequisites

- Node.js >= 18
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-gif-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Technology Stack

- React 18
- TypeScript
- Vite
- Material-UI (MUI)
- FFmpeg WebAssembly
- @ffmpeg/ffmpeg
- @ffmpeg/core
- @ffmpeg/util
- Emotion (for styled components)

## Project Structure

```
src/
├── components/        # React components
├── contexts/         # React contexts (Theme, Video)
├── styles/          # Global styles and theme
├── assets/          # Static assets
└── App.tsx          # Main application component
```

## Development

To start the development server with hot reload:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

To run tests:

```bash
npm run test
```

## Browser Compatibility

The application requires a modern browser that supports:
- WebAssembly
- SharedArrayBuffer
- Cross-Origin Isolation

## License

MIT License

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
