import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initGlobalAudioListener } from './utils/audio';

// Initialize global tactile audio listener for all interactive controls
initGlobalAudioListener();

// Global uncaught error listener to display error if anything breaks
window.addEventListener('error', (event) => {
  console.error("Global error caught:", event.error);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
