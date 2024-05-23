import React, { useState, useEffect } from 'react';
import LogoutButton from './LogoutButton'; // Importa el componente LogoutButton

function LoginApp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null); // Estado para almacenar el ID de usuario

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Inicio de sesión exitoso');
        setUserId(data.userId); // Establecer el ID de usuario al iniciar sesión
      } else {
        setMessage('Usuario y/o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div>
            <button onClick={handleLogout}>Cerrar sesión</button>
            {message && <p>{message}</p>}
        </div>
      </form>
      {/* Pasa el ID de usuario al componente LogoutButton */}
      {userId && <LogoutButton idUsuario={userId} />}
    </div>
  );
}

export default LoginApp;
