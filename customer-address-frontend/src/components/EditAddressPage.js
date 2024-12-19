import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditAddressPage = () => {
  const { id } = useParams();
  console.log('ID recibido:', id); 

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    address: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchAddress = async () => {
      try {
       
        if (!id) {
          setError('ID de dirección no válido');
          return;
        }

        
        const response = await axios.get(
          `https://automatic-meme-4jqxg49p9grwfqjgw-3000.app.github.dev/addresses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        console.log('Respuesta de la API:', response.data); 

        
        if (!response.data || !response.data.firstName) {
          setError('Dirección no encontrada');
        } else {
          setAddress(response.data);
        }
      } catch (err) {
        console.error('Error al cargar la dirección:', err);
        setError('No se pudo cargar la dirección');
      }
    };

    fetchAddress();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!address.firstName || !address.lastName || !address.address || !address.email) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await axios.put(
        `https://automatic-meme-4jqxg49p9grwfqjgw-3000.app.github.dev/addresses/${id}`,
        address,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSuccessMessage('Dirección actualizada correctamente');
      navigate('/addresses'); 
    } catch (err) {
      console.error('Error al actualizar la dirección:', err);
      setError('Error al actualizar la dirección');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-danger mb-4">Editar Dirección</h2>

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
          />
        </div>

        <button type="submit" className="btn btn-primary">Actualizar Dirección</button>
      </form>
    </div>
  );
};

export default EditAddressPage;
