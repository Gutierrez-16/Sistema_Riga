import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MostrarImagenesApp() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');

        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setError('Hubo un error al obtener los productos.');
      }
    };

    fetchProductos();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (productos.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Detalle de los Productos</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Categoría</th>
            <th>Unidad de Medida</th>
            <th>Línea</th>
            <th>Marca</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.nombreProd}</td>
              <td>${producto.precioUnit}</td>
              <td>
                {producto.imagen && (
                  <img src={`data:image/jpeg;base64,${producto.imagen}`} alt={`Imagen del producto ${producto.nombreProd}`} />
                )}
              </td>
              <td>{producto.descripcion}</td>
              <td>{producto.estadoProducto}</td>
              <td>{producto.idCategoria}</td>
              <td>{producto.idUnidadMedida}</td>
              <td>{producto.idLinea}</td>
              <td>{producto.idMarca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MostrarImagenesApp;
