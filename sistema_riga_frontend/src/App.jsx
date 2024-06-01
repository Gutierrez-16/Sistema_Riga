import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginApp from './Components/Login/LoginApp';
import Logout from './Components/Login/loguotbutton';
import Usuario from './Components/Usuario/Usuario';
import Persona from './Components/Person/Persona';
import Producto from './Components/Product/Producto';
import Empleado from './Components/Employer/Empleado';
import Empresa from './Components/Empresa/Empresa';
import Home from './Components/Home/Home';
import Venta from './Components/Ventas/Venta';
import Cargo from './Components/Cargo/Cargo';
import Linea from './Components/Linea/Linea';
import Categoria from './Components/Categoria/Categoria';
import MetodoPago from './Components/MetodoPago/MetodoPago';


function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/login" element={<LoginApp setUser={setUser} />} />
      <Route path="/logout" element={<Logout user={user} />} />
      <Route path="/usuario" element={<Usuario />} />
      <Route path="/persona" element={<Persona />} />
      <Route path="/producto" element={<Producto />} />
      <Route path="/empleado" element={<Empleado />} />
      <Route path="/empresa" element={<Empresa />} />
      <Route path="/home" element={<Home />} />
      <Route path="/venta" element={<Venta />} />
      <Route path="/cargo" element={<Cargo />} />
      <Route path="/linea" element={<Linea />} />
      <Route path="/categoria" element={<Categoria />} />
      <Route path="/metodopago" element={<MetodoPago />} />
    </Routes>
  );
}

export default App;