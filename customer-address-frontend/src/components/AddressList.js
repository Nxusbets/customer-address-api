import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener las direcciones del usuario
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem('token'); // Suponiendo que guardas el token en el localStorage
        const response = await axios.get('http://localhost:3000/addresses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAddresses(response.data);
      } catch (err) {
        setError('Error al obtener las direcciones');
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Direcciones</h2>
      {addresses.length === 0 ? (
        <p>No hay direcciones disponibles.</p>
      ) : (
        <ul>
          {addresses.map((address) => (
            <li key={address.id}>
              <h3>{address.firstName} {address.lastName}</h3>
              <p>{address.address}</p>
              <p>{address.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressList;
