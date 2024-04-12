import React, { useState } from 'react';
import './AppLogin.css';
import { useNavigate } from 'react-router-dom';

function LoginApp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Obtenemos la función de navegación

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Si la respuesta del backend es exitosa
        setMessage('Inicio de sesión exitoso'); // Mensaje de éxito del backend
        // Redirigir al usuario a la página Home
        navigate('/home');
      } else {
        // Si la respuesta del backend indica un fallo
        setMessage('Usuario y/o contraseña incorrectos'); // Mensaje de error del backend
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {message && <p>{message}</p>} {/* Mostrar el mensaje del backend */}
    </div>
  );
}

export default LoginApp;
