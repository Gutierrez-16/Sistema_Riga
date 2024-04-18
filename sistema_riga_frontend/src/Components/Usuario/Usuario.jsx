import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './UsuarioStyle.css';

class Home extends Component {
  render() {
    return (
      <article>
        <div>
          <Header/>
          <section>
            <div className='usuario'>
            <h1>USUARIOS</h1>
            </div>
            <div className='global'>
            <div className='tabla'>
                <table >
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>DNI</th>
                        <th>Genero</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Correo</th>
                        <th>Celular</th>
                        <th>Direccion</th>
                        <th>Correo</th>
                        <th>Departamento</th>
                        <th>Provincia</th>
                        <th>Distrito</th>
                        <th>Estado</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                </thead>
                </table>
            </div>
            <div className='botones'>
              <button className='boton1'>Guardar</button>
              <button className='boton2'>Actualizar</button>
              <button className='boton3'>Eliminar</button>
              <button className='boton4'>Nuevo</button>
              <button className='boton4'>Buscar</button>
            </div>
            </div>
            <div className='global2'>
              <div className='contenedor'>
              </div>
              <div className='contenedor'>
              </div>
              <div className='contenedor'>
              </div>
            </div>
          </section>
        </div>
      </article>
    );
  }
}

export default Home;

