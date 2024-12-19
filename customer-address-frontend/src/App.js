// src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AddressesPage from './components/AddressesPage';
import EditAddressPage from './components/EditAddressPage';
import AddAddressPage from './components/AddAddressPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/addresses" element={<AddressesPage />} />
          <Route path="/" element={<RedirectToLogin />} />
          <Route path="/edit-address/:id" element={<EditAddressPage />} />
          <Route path="/add-address" element={<AddAddressPage />} />
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
      navigate('/login'); 
    } else {
      navigate('/addresses'); 
    }
  }, [token, navigate]);

  return null; 
};

export default App;
