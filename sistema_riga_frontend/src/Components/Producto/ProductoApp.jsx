import React, { useState } from 'react';
import axios from 'axios';

function ImagenApp() {
  const [error, setError] = useState('');

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [unidad, setUnidad] = useState('');
  const [linea, setLinea] = useState('');
  const [marca, setMarca] = useState('');


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
      formData.append('nombre', nombre);
      formData.append('precio', precio);
      formData.append('imagen', imagen); // Corregido: debe coincidir con el nombre esperado en el backend
      formData.append('descripcion', categoria);
      formData.append('categoria', categoria);
      formData.append('unidad', unidad);
      formData.append('linea', linea);
      formData.append('marca', marca);

      await axios.post('http://localhost:8080/products/prueba', formData, {
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
      <h1>Subir Producto</h1>
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="precio">Precio Unitario:</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="imagen">Seleccionar Imagen:</label>
          <input
            type="file"
            id="imagen"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="categoria">Categoría ID:</label>
          <input
            type="number"
            id="categoria"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="unidad">ID Unidad de Medida:</label>
          <input
            type="number"
            id="unidad"
            value={unidad}
            onChange={e => setUnidad(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="linea">ID Línea:</label>
          <input
            type="number"
            id="linea"
            value={linea}
            onChange={e => setLinea(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="marca">ID Marca:</label>
          <input
            type="number"
            id="marca"
            value={marca}
            onChange={e => setMarca(e.target.value)}
          />
        </div>

        <button type="submit">Subir Producto</button>
      </form>
    </div>
  );
}

export default ImagenApp;