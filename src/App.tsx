import './App.css'
import VideoConverter from './components/VideoConverter'
import { ThemeProvider } from './contexts/ThemeContext'
import { VideoProvider } from './contexts/VideoContext'

function App() {

  return (
    <ThemeProvider>
      <VideoProvider>
        <VideoConverter />
      </VideoProvider>
    </ThemeProvider>
  )
}

export default App
