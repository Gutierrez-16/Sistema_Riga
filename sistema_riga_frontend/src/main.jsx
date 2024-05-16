import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambia esta línea
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Aquí usamos Routes en lugar de Route
import LoginApp from './Components/Login/LoginApp';
import Home from './Components/Usuario/Usuario';
import ProductoApp from './Components/Producto/ProductoApp';
import ImagenApp from './Components/Producto/ImagenApp';
import MostrarImagenApp from './Components/Producto/MostrarImagenApp';
import MostrarImagenesApp from './Components/Producto/MostrarImagenesApp';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginApp />} />
      <Route path="/usuario" element={<Home />} />
      <Route path="/productos" element={<ProductoApp />} />
      <Route path="/imagen" element={<ImagenApp />} />
      <Route path="/imagenes" element={<MostrarImagenApp />} />
      <Route path="/productosMostrar" element={<MostrarImagenesApp />} />
    </Routes>
  </BrowserRouter>
);