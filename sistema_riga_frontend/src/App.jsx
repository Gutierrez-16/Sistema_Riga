import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginApp from "./Components/Login/LoginApp";
import Usuario from "./Components/Usuario/Usuario";
import Persona from "./Components/Person/Persona";
import Producto from "./Components/Product/Producto";
import Empleado from "./Components/Employer/Empleado";
import Empresa from "./Components/Empresa/Empresa";
import Home from "./Components/Home/Home";
import Cargo from "./Components/Cargo/Cargo";
import Linea from "./Components/Linea/Linea";
import Categoria from "./Components/Categoria/Categoria";
import MetodoPago from "./Components/MetodoPago/MetodoPago";
import UnidadMedidad from "./Components/UnidadMedida/UnidadMedida";
import TipoUsuario from "./Components/TipoUsuario/TipoUsuario";
import Marca from "./Components/Marca/Marca";
import Caja from "./Components/Caja/Caja";
import Reporte from "./Components/Reporte/Reporte";
import VentasTotal from "./Components/Ventas/ListarVentas";
import "./App.css";

function App() {
  return (
    <div className="pruebas">
      <Routes>
        <Route
          path="/login"
          element={
            <div className="hola">
              <LoginApp />
            </div>
          }
        />
        <Route path="/" element={<Usuario />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/listaventas" element={<VentasTotal />} />
        <Route path="/reporte" element={<Reporte />} />
        <Route path="/logout" element={<Usuario />} />
        <Route path="/persona" element={<Persona />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/unidadmedida" element={<UnidadMedidad />} />
        <Route path="/tipousuario" element={<TipoUsuario />} />
        <Route path="/marca" element={<Marca />} />
        <Route path="/caja" element={<Caja />} />
        <Route path="/empleado" element={<Empleado />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cargo" element={<Cargo />} />
        <Route path="/linea" element={<Linea />} />
        <Route path="/categoria" element={<Categoria />} />
        <Route path="/metodopago" element={<MetodoPago />} />
      </Routes>
    </div>
  );
}

export default App;
