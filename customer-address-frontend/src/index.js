import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambia la importación
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './context/AuthContext';

// Crea el root con ReactDOM.createRoot()
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza la aplicación
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
