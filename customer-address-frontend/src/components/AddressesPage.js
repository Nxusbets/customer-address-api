// src/pages/AddressesPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div>
      <h2>Direcciones</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={newAddress.firstName}
          onChange={(e) => setNewAddress({ ...newAddress, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={newAddress.lastName}
          onChange={(e) => setNewAddress({ ...newAddress, lastName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Segundo nombre"
          value={newAddress.middleName}
          onChange={(e) => setNewAddress({ ...newAddress, middleName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dirección"
          value={newAddress.address}
          onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={newAddress.email}
          onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
        />
        <button type="submit">Agregar dirección</button>
      </form>

      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}

      <h3>Direcciones:</h3>
      <ul>
        {addresses.map((address) => (
          <li key={address.id}>
            {address.firstName} {address.lastName} - {address.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressesPage;
