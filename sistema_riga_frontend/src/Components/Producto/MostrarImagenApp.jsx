import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MostrarImagenApp() {
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchImagen() {
      try {
        const response = await axios.get('http://localhost:8080/imagenMostrar', {
          responseType: 'arraybuffer'
        });
        const base64Image = arrayBufferToBase64(response.data);
        setImagen(base64Image);
      } catch (error) {
        console.error('Error al obtener la imagen:', error);
        setError('Hubo un error al obtener la imagen.');
      }
    }

    fetchImagen();
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  return (
    <div>
      <h1>Mostrar Imagen</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {imagen && (
        <div>
          <img src={`data:image/jpeg;base64,${imagen}`} alt="Imagen" />
        </div>
      )}
    </div>
  );
}

export default MostrarImagenApp;
