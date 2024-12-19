// src/pages/LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion'; // Importamos Framer Motion

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Función para manejar el login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://automatic-meme-4jqxg49p9grwfqjgw-3000.app.github.dev/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token); // Guardamos el token en localStorage
      setSuccessMessage('Inicio de sesión exitoso');
      setError('');
      navigate('/addresses'); // Redirigimos a la página de direcciones después del login
    } catch (err) {
      setError('Correo electrónico o contraseña incorrectos');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <motion.div
        className="row justify-content-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="col-md-6">
          <h2 className="text-center text-danger mb-4">Iniciar sesión</h2>

          <form onSubmit={handleLogin} className="mb-4">
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-danger w-100">Iniciar sesión</button>
          </form>

          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <div className="text-center">
            <p>¿No tienes una cuenta? <a href="/register" className="text-danger">Regístrate aquí</a></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
