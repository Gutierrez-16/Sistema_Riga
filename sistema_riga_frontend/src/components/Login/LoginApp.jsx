import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import LogoutButton from './LogoutButton'; // Importa el componente LogoutButton

function LoginApp() {
  const navigate = useNavigate(); // Obtiene la función de navegación
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null); // Estado para almacenar el ID de usuario

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí puedes hacer una solicitud para validar el token y obtener el userId
      // setUserId(userIdObtenido);
      // Si ya hay un token en localStorage, redirige al usuario al "home"
      navigate('/home');
    }
  }, [navigate]);

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
        localStorage.setItem('token', data.token); // Almacena el token en el localStorage
        // Redirige al usuario al "home"
        navigate('/home');
      } else {
        setMessage('Usuario y/o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:8080/auth/logout/${userId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        setMessage('Sesión cerrada exitosamente');
        setUserId(null); // Limpiar el ID de usuario al cerrar sesión
        localStorage.removeItem('token'); // Remover el token del localStorage al cerrar sesión
        // Redirige al usuario al "home"
        navigate('/home');
      } else {
        setMessage('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      <div>
        <button onClick={handleLogout}>Cerrar sesión</button>
        {message && <p>{message}</p>}
      </div>
      {/* Pasa el ID de usuario al componente LogoutButton */}
      {userId && <LogoutButton idUsuario={userId} />}
    </div>
  );
}

export default LoginApp;
