import React, { useState } from 'react';
import axios from 'axios';

function ImagenApp() {
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (event) => {
    setImagen(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!imagen) {
      setError('Por favor selecciona una imagen.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', imagen); // Corregido: debe coincidir con el nombre esperado en el backend

      await axios.post('http://localhost:8080/subir', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Imagen subida correctamente.');
    } catch (error) {
      console.error('Error al enviar la imagen:', error);
      alert('Hubo un error al subir la imagen.');
    }
  };

  return (
    <div>
      <h1>Subir Imagen</h1>
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div>
          <label htmlFor="imagen">Seleccionar Imagen:</label>
          <input
            type="file"
            id="imagen"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Subir Imagen</button>
      </form>
    </div>
  );
}

export default ImagenApp;
