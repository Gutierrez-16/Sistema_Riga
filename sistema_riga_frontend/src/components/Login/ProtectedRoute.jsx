import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';// Asegúrate de que jwt-decode esté instalado y importado correctamente

const obtenerUsuarioDelToken = (token) => {
  try {
    // Decodificar el token para obtener el payload
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.sub; // Extraer y retornar la información del usuario (suponiendo que está bajo la clave 'sub')
    }
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const usuario = obtenerUsuarioDelToken(token);

  if (!usuario) {
    // Redirigir a la página de inicio de sesión si el usuario no está autenticado
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, renderizar los componentes hijos
  return children;
};

export default ProtectedRoute;
