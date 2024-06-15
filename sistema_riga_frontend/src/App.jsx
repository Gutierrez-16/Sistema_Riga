import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginApp from "./Components/Login/LoginApp";
import Usuario from "./Components/Usuario/Usuario";
import Persona from "./Components/Persona/Persona"; // Renombré Person a Persona
import Producto from "./Components/Producto/Producto";
import Empleado from "./Components/Empleado/Empleado"; // Renombré Employer a Empleado
import Empresa from "./Components/Empresa/Empresa";
import Home from "./Components/Home/Home";
import Cargo from "./Components/Cargo/Cargo";
import Linea from "./Components/Linea/Linea";
import Categoria from "./Components/Categoria/Categoria";
import MetodoPago from "./Components/MetodoPago/MetodoPago";
import ProtectedRoute from "./Components/Login/ProtectedRoute";
import UnidadMedida from "./Components/UnidadMedida/UnidadMedida"; // Renombré UnidadMedidad a UnidadMedida
import TipoUsuario from "./Components/TipoUsuario/TipoUsuario";
import Marca from "./Components/Marca/Marca";
import Caja from "./Components/Caja/Caja";
import Reporte from "./Components/Reporte/Reporte";
import VentasTotal from "./Components/Ventas/ListarVentas";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginApp />} />
        <Route
          path="/usuario"
          element={
            <ProtectedRoute>
              <Usuario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listaventas"
          element={
            <ProtectedRoute>
              <VentasTotal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reporte"
          element={
            <ProtectedRoute>
              <Reporte />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Usuario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/persona"
          element={
            <ProtectedRoute>
              <Persona />
            </ProtectedRoute>
          }
        />
        <Route
          path="/producto"
          element={
            <ProtectedRoute>
              <Producto />
            </ProtectedRoute>
          }
        />
        <Route
          path="/unidadmedida"
          element={
            <ProtectedRoute>
              <UnidadMedida />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tipousuario"
          element={
            <ProtectedRoute>
              <TipoUsuario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marca"
          element={
            <ProtectedRoute>
              <Marca />
            </ProtectedRoute>
          }
        />
        <Route
          path="/caja"
          element={
            <ProtectedRoute>
              <Caja />
            </ProtectedRoute>
          }
        />
        <Route
          path="/empleado"
          element={
            <ProtectedRoute>
              <Empleado />
            </ProtectedRoute>
          }
        />
        <Route
          path="/empresa"
          element={
            <ProtectedRoute>
              <Empresa />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cargo"
          element={
            <ProtectedRoute>
              <Cargo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/linea"
          element={
            <ProtectedRoute>
              <Linea />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categoria"
          element={
            <ProtectedRoute>
              <Categoria />
            </ProtectedRoute>
          }
        />
        <Route
          path="/metodopago"
          element={
            <ProtectedRoute>
              <MetodoPago />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
