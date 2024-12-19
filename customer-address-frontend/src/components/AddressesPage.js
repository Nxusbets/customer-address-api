// src/pages/AddressesPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AddressesPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('https://automatic-meme-4jqxg49p9grwfqjgw-3000.app.github.dev/addresses', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAddresses(response.data);
      } catch (err) {
        setError('No se pudieron cargar las direcciones');
      }
    };

    fetchAddresses();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://automatic-meme-4jqxg49p9grwfqjgw-3000.app.github.dev/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccessMessage('Dirección eliminada correctamente');
      setAddresses(addresses.filter(address => address.id !== id));
    } catch (err) {
      setError('Error al eliminar la dirección');
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
          <h2 className="text-center text-danger mb-4">Mis Direcciones</h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          {/* Botón para agregar dirección */}
          <div className="mb-3 text-center">
            <Link to="/add-address" className="btn btn-danger">
              Agregar Dirección
            </Link>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map(address => (
                <tr key={address.id}>
                  <td>{address.firstName} {address.lastName}</td>
                  <td>{address.address}</td>
                  <td>{address.email}</td>
                  <td>
                    {/* Botón para eliminar */}
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDelete(address.id)}
                    >
                      Eliminar
                    </button>
                    {/* Enlace para editar */}
                    <Link
                      to={`/edit-address/${address.id}`}
                      className="btn btn-warning"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AddressesPage;
