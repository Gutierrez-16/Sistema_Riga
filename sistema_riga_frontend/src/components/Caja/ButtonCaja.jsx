import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import apiClient from '../Security/apiClient';

const CloseCajaButton = () => {
  const navigate = useNavigate();
  const [caja, setCajas] = useState([]);

  useEffect(() => {
    const fetchCajas = async () => {
      try {
        const data = await apiClient.get("http://localhost:8080/caja");
        const cajasEstado1 = data.filter(caja => caja.estadoCaja === '1');
        setCajas(cajasEstado1);
      } catch (error) {
        console.error('Error fetching cajas:', error);
      }
    };

    fetchCajas();
  }, []);

  const handleCloseCaja = async () => {
    try {
      const idCajaEstado1 = caja[0]?.idCaja;

      if (!idCajaEstado1) {
        console.error('No se encontró ninguna caja con estado 1');
        return;
      }

      const token = localStorage.getItem('token');
      const response = await apiClient.patch(
        `http://localhost:8080/caja/cerrar/${idCajaEstado1}`,
        null, // No es necesario enviar un body en PATCH
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        navigate('/caja');
      } else {
        console.error('Failed to close caja', response.status);
      }
    } catch (error) {
      console.error('Error while closing caja:', error);
    }
  };

  return (
    <Button label="Cerrar Caja" icon="pi pi-times" className="w-full" onClick={handleCloseCaja} />
  );
};

export default CloseCajaButton;
