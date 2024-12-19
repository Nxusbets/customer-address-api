// src/pages/AddressesPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importamos Framer Motion

const AddressesPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    address: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Función para obtener las direcciones del usuario
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirigir al login si no hay token
        return;
      }

      const response = await axios.get('https://automatic-meme-4jqxg49p9grwfqjgw-3000.app.github.dev/addresses', {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        },
      });
      setAddresses(response.data);
    } catch (err) {
      console.error('Error al obtener las direcciones:', err);
      setError('No se pudieron cargar las direcciones');
    }
  };

  // Cargar las direcciones al montar el componente
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Función para agregar una nueva dirección
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Obtener el token del localStorage
      if (!token) {
        setError('No estás autenticado. Inicia sesión primero.');
        return;
      }

      const response = await axios.post('https://automatic-meme-4jqxg49p9grwfqjgw-3000.app.github.dev/addresses', newAddress, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en el encabezado Authorization
        },
      });

      setAddresses((prevAddresses) => [...prevAddresses, response.data]); // Añadir la nueva dirección al estado
      setNewAddress({
        firstName: '',
        lastName: '',
        middleName: '',
        address: '',
        email: '',
      }); // Limpiar el formulario
      setSuccessMessage('Dirección agregada correctamente');
      setError('');
    } catch (err) {
      setError('No se pudo agregar la dirección');
      setSuccessMessage('');
    }
  };

  // Función para eliminar una dirección
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No estás autenticado. Inicia sesión primero.');
        return;
      }

      await axios.delete(`https://automatic-meme-4jqxg49p9grwfqjgw-3000.app.github.dev/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en el encabezado Authorization
        },
      });

      // Filtrar la dirección eliminada del estado
      setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== id));
      setSuccessMessage('Dirección eliminada correctamente');
      setError('');
    } catch (err) {
      setError('No se pudo eliminar la dirección');
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
        <div className="col-md-8">
          <h2 className="text-center text-danger mb-4">Direcciones</h2>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={newAddress.firstName}
                onChange={(e) => setNewAddress({ ...newAddress, firstName: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Apellido"
                value={newAddress.lastName}
                onChange={(e) => setNewAddress({ ...newAddress, lastName: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Segundo nombre"
                value={newAddress.middleName}
                onChange={(e) => setNewAddress({ ...newAddress, middleName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Dirección"
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
                value={newAddress.email}
                onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-danger w-100">Agregar dirección</button>
          </form>

          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <h3 className="text-center text-danger mb-4">Tus Direcciones</h3>
          <ul className="list-group">
            {addresses.map((address) => (
              <motion.li
                key={address.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {address.firstName} {address.lastName} - {address.address}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(address.id)}
                >
                  Eliminar
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default AddressesPage;
