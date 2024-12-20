import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/lato';
import '@fontsource-variable/playfair-display';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
