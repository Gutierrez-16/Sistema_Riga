import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

function Logout() {
  const token = localStorage.getItem('token');
      console.log(token)
      console.log("LOGOUTTTT")
    const navigate = useNavigate();

    function obtenerUsuarioDelToken(token) {
      try {
        const decodedToken = jwtDecode(token);
    
        return decodedToken.sub;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }

    
    const usuario = obtenerUsuarioDelToken(token);
    console.log(usuario)
    const handleLogout = async () => {
  
      
      try {

        const response = await fetch(`http://localhost:8080/auth/logout/${usuario}`, {
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
    
    return (
      <Button label="Logout" icon="pi pi-sign-out" className="w-full" onClick={handleLogout} />
    );
  }
  

export default Logout;