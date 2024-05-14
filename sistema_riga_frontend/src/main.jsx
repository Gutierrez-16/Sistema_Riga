import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambia esta línea
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Aquí usamos Routes en lugar de Route
import LoginApp from './Components/Login/LoginApp';
import Usuario from './Components/Usuario/Usuario';
import Persona from './Components/Person/Persona';
import Producto from './Components/Product/Producto';
import Empleado from './Components/Employer/Empleado';
import Empresa from './Components/Empresa/Empresa';
import Home from './Components/Home/Home';
import Venta from './Components/Ventas/Venta';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes> {/* Utilizamos Routes en lugar de Route */}
      <Route path="/login" element={<LoginApp />} />
      <Route path="/usuario" element={<Usuario />} />
      <Route path="/persona" element={<Persona />} />
      <Route path="/producto" element={<Producto />} />
      <Route path="/empleado" element={<Empleado />} />
      <Route path="/empresa" element={<Empresa />} />
      <Route path="/home" element={<Home />} />
      <Route path="/venta" element={<Venta />} />
    </Routes>
  </BrowserRouter>
);