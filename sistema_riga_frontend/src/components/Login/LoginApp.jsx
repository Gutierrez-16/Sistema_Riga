import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Galleria } from 'primereact/galleria';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './AppLogin.css';
import imagen1 from '../Imagenes/1.jpeg';
import imagen3 from '../Imagenes/3.jpeg';
import imagen4 from '../Imagenes/4.jpeg';
import imagen5 from '../Imagenes/5.jpeg';
import imagen6 from '../Imagenes/6.jpeg';

function LoginApp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
    const fetchedImages = [
      { itemImageSrc: imagen1, thumbnailImageSrc: imagen1 },
      { itemImageSrc: imagen3, thumbnailImageSrc: imagen3 },
      { itemImageSrc: imagen4, thumbnailImageSrc: imagen4 },
      { itemImageSrc: imagen5, thumbnailImageSrc: imagen5 },
      { itemImageSrc: imagen6, thumbnailImageSrc: imagen6 },
    ];
    setImages(fetchedImages);
  }, [navigate]);

  const responsiveOptions = [
    { breakpoint: '991px', numVisible: 4 },
    { breakpoint: '767px', numVisible: 3 },
    { breakpoint: '575px', numVisible: 1 },
  ];

  const itemTemplate = (item) => <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;

  const thumbnailTemplate = (item) => <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setMessage('Inicio de sesión exitoso');
        navigate('/home');
      } else {
        setMessage('Usuario y/o contraseña incorrectos');
      }
    } catch (error) {
      setMessage('Error al enviar la solicitud. Inténtalo de nuevo más tarde.');
      console.error('Error al enviar la solicitud:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='globallogin'>
      <div className="flex">
        <div className="surface-card p-4 shadow-2 border-round w-full">
          <div className="text-center mb-5">
            <div className="text-1800 text-5xl font-medium mb-3 text-blue-700">Welcome to RIGA</div>
            <img src="https://img.icons8.com/?size=100&id=F5uIWrgQa4Zh&format=png&color=000000" alt="hyper" height={50} className="mb-3" />
            <div className="text-900 text-3xl font-medium mb-3">Login</div>
            <span className="text-600 font-medium line-height-3">System POS</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-900 font-medium mb-2">Username</label>
              <InputText id="username" type="text" placeholder="Username" className="w-full mb-3" value={username} onChange={(e) => setUsername(e.target.value)} />

              <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
              <div className="p-inputgroup mb-3">
                <InputText id="password" type={showPassword ? "text" : "password"} placeholder="Password" className="w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className="p-inputgroup-addon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <Button type="submit" label="Sign In" icon="pi pi-user" className="w-full" disabled={loading} />
              {message && <div className="mt-3">{message}</div>}
            </div>
          </form>
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
