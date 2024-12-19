import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAddressPage = () => {
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    address: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'https://automatic-meme-4jqxg49p9grwfqjgw-3000.app.github.dev/addresses',
        address,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSuccessMessage('Dirección agregada correctamente');
      setTimeout(() => navigate('/addresses'), 2000);
    } catch (err) {
      setError('Error al agregar la dirección');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-danger mb-4">Agregar Nueva Dirección</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Primer Nombre</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            value={address.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Apellido</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            value={address.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="middleName" className="form-label">Segundo Nombre (Opcional)</label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            className="form-control"
            value={address.middleName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={address.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={address.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Agregar Dirección</button>
      </form>
    </div>
  );
};

export default AddAddressPage;
