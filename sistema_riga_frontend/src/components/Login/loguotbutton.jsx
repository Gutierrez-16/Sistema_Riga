import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

function Logout({ user}) {
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      if (!user) {
        console.error('Usuario no disponible para cerrar sesión');
        return;
      }
  
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:8080/auth/logout/${user}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (response.ok) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          console.error('Error al cerrar sesión');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    };
  
    if (!user) {
      return null; // O cualquier otro mensaje o componente que desees mostrar si el usuario no está disponible
    }
  
    return (
      <Button label="Logout" icon="pi pi-sign-out" className="w-full" onClick={handleLogout} />
    );
  }
  

export default Logout;