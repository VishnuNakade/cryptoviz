import React from 'react';
import ReactDOM from 'react-dom/client';  // Correct import for React 18+
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with StrictMode (recommended for development)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
