import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
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
import ProtectedRoute from "./Components/Login/ProtectedRoute";
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
      <HashRouter>
        <Switch>
          <Route
            path="/login"
            element={
              <div className="hola">
                <LoginApp />
              </div>
            }
          />

          <ProtectedRoute path="/" exact element={<Usuario />} />
          <ProtectedRoute path="/usuario" element={<Usuario />} />
          <ProtectedRoute path="/listaventas" element={<VentasTotal />} />
          <ProtectedRoute path="/reporte" element={<Reporte />} />
          <ProtectedRoute path="/logout" element={<Usuario />} />
          <ProtectedRoute path="/persona" element={<Persona />} />
          <ProtectedRoute path="/producto" element={<Producto />} />
          <ProtectedRoute path="/unidadmedida" element={<UnidadMedidad />} />
          <ProtectedRoute path="/tipousuario" element={<TipoUsuario />} />
          <ProtectedRoute path="/marca" element={<Marca />} />
          <ProtectedRoute path="/caja" element={<Caja />} />
          <ProtectedRoute path="/empleado" element={<Empleado />} />
          <ProtectedRoute path="/empresa" element={<Empresa />} />
          <ProtectedRoute path="/home" element={<Home />} />
          <ProtectedRoute path="/cargo" element={<Cargo />} />
          <ProtectedRoute path="/linea" element={<Linea />} />
          <ProtectedRoute path="/categoria" element={<Categoria />} />
          <ProtectedRoute path="/metodopago" element={<MetodoPago />} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
