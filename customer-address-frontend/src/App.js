// src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AddressesPage from './components/AddressesPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/addresses" element={<AddressesPage />} />
          <Route path="/" element={<RedirectToLogin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const RedirectToLogin = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Si no hay token, redirige a la página de login
    } else {
      navigate('/addresses'); // Si hay token, redirige a la página de direcciones
    }
  }, [token, navigate]);

  return null; // No se renderiza nada mientras se realiza la redirección
};

export default App;
