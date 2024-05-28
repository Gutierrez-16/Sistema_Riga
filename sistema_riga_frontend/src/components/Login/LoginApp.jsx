import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import { Galleria } from 'primereact/galleria';

import GokuD from '../Imagenes/GokuD.png';



function LoginApp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedImages = [
      {
        itemImageSrc: GokuD,
        thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      {
        itemImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria2.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria2s.jpg',
        alt: 'Description for Image 2',
        title: 'Title 2'
      },
      {
        itemImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria3.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria3s.jpg',
        alt: 'Description for Image 3',
        title: 'Title 3'
      },
    ];
    setImages(fetchedImages);
  }, []);

  const responsiveOptions = [
    {
      breakpoint: '991px',
      numVisible: 4
    },
    {
      breakpoint: '767px',
      numVisible: 3
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];

  const itemTemplate = (item) => {
    return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  }

  const thumbnailTemplate = (item) => {
    return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
  }

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
        <h1>RIGA</h1>
        <div className="login-container">
          <div className='title'>LOGIN</div>
          <div className='login'>
            <FaCircleUser size={80} color="#43A34F" className="iconimg" />
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
              <div>
                <input
                  type="password"
                  id="password"
                  placeholder='Ingrese su contraseña'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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