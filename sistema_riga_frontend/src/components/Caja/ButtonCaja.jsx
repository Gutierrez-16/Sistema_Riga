import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import apiClient from '../Security/apiClient';

import { fetchCajas } from './Caja';

const CloseCajaButton = ({ onCaja }) => {
  const navigate = useNavigate();
  const [caja, setCajas] = useState([]);

  
  useEffect(() => {
    fetchCajast();
  }, [onCaja]);

    const fetchCajast = async () => {
      try {
        const data = await apiClient.get("http://localhost:8080/caja");
        const cajasEstado1 = data.filter(caja => caja.estadoCaja === '1');
        setCajas(cajasEstado1);
      } catch (error) {
        console.error('Error fetching cajas:', error);
      }
    };

   

  const handleCloseCaja = async () => {
    
    try {
      fetchCajas();
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

  const handleClick = () => {
    handleCloseCaja();
    fetchCajas();
    console.log("HOLA");
    onCaja(false); 
  };

  return (
    <Button label="Cerrar Caja" icon="pi pi-unlock" className="w-full" onClick={handleClick} />
  );
};

export default CloseCajaButton;
