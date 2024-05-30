import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Galleria } from 'primereact/galleria';
import './AppLogin.css';
import imagen1 from '../Imagenes/1.jpeg';
import imagen3 from '../Imagenes/3.jpeg';
import imagen4 from '../Imagenes/4.jpeg';
import imagen5 from '../Imagenes/5.jpeg';
import imagen6 from '../Imagenes/6.jpeg';
import imagen7 from '../Imagenes/10.jpg';

function LoginApp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedImages = [
      { itemImageSrc: imagen1, thumbnailImageSrc: imagen1 },
      { itemImageSrc: imagen3, thumbnailImageSrc: imagen3 },
      { itemImageSrc: imagen4, thumbnailImageSrc: imagen4 },
      { itemImageSrc: imagen5, thumbnailImageSrc: imagen5 },
      { itemImageSrc: imagen6, thumbnailImageSrc: imagen6 },
      { itemImageSrc: imagen7, thumbnailImageSrc: imagen7 },
    ];
    setImages(fetchedImages);
  }, []);

  const responsiveOptions = [
    { breakpoint: '991px', numVisible: 4 },
    { breakpoint: '767px', numVisible: 3 },
    { breakpoint: '575px', numVisible: 1 },
  ];

  const itemTemplate = (item) => <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;

  const thumbnailTemplate = (item) => <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;

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
        navigate('/home');
      } else {
        setMessage('Usuario y/o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className='globallogin'>
      <div className='contenedorlogin'>
        <h1 className='titulo'>RIGA</h1>
        <div className="login-container">
          <div className='title'>LOGIN</div>
          <div className='login'>
            <FaUserCircle size={80} color="#43A34F" className="iconimg" />
            <h2>Iniciar Sesión</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  id="username"
                  placeholder='Ingrese su usuario'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className='password-container'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder='Ingrese su contraseña'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span onClick={() => setShowPassword(!showPassword)} className='password-toggle'>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button type="submit">Iniciar Sesión</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
      <div className='imgcontainer'>
        <div className='galleria-container'>
          {images && <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} item={itemTemplate} thumbnail={thumbnailTemplate} circular autoPlay transitionInterval={2000} />}
        </div>
      </div>
    </div>
  );
}

export default LoginApp;