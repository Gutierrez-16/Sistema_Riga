import React, { Component } from 'react';
import Header from '../Header/Header';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { TbArrowZigZag } from 'react-icons/tb';

class Usuario extends Component {
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
            <DataTable  tableStyle={{ minWidth: '50rem' }}>
                <Column field="usuario" header="USUARIO" align="center"></Column>
                <Column field="password" header="CONTRASEÑA" align="center"></Column>
                <Column field="tipousuario" header="TIPO USUARIO" align="center"></Column>
                <Column field="dni" header="DNI" align="center"></Column>
                <Column field="nombre" header="NOMBRES" align="center"></Column>
                <Column field="apepat" header="APELLIDO PATERNO" align="center"></Column>
                <Column field="apemat" header="APELLIDO MATERNO" align="center"></Column>
                <Column field="estado" header="ESTADO" align="center"></Column>
            </DataTable>
            </div>
            <div className='contenedorbot'>
            <div className='buscar'>
            <Button label="BUSCAR" className='boton'/>
            </div>
            <div className='botones'>
              <Button label="GUARDAR" className='boton1'/>
              <Button label="ACTUALIZAR" className='boton2'/>
              <Button label="ELIMINAR" className='boton3'/>
              <Button label="NUEVO" className='boton4'/>
            </div>
            </div>
            </div>
            <div className='global2'>
              <div className='contenedor'>
                <div className='subcontenedor'>
                <span className="p-inputgroup-addon">USUARIO</span>
                <InputText className='input' placeholder="" size={45}/>
                </div>
                <div className='subcontenedor'>
                <span className="p-inputgroup-addon">TIPO USUARIO</span>
                <InputText className='input' placeholder="" size={45}/>
                </div>
                <div className='subcontenedor'>
                <span className="p-inputgroup-addon">ESTADO</span>
                <InputText className='input' placeholder="" size={45} maxLength={1} onKeyPress={(e) => (e.charCode < 48 || e.charCode > 57) && e.preventDefault()}/>
                </div>
              </div>
              <div className='contenedor2'>
              <div className='subcontenedor'>
              <span className="p-inputgroup-addon">CONTRASEÑA</span>
                <InputText className='input' placeholder="" size={45}/>
              </div>
              <div className='subcontenedor'>
              <span className="p-inputgroup-addon">DNI</span>
                <InputText className='input' placeholder="" size={45} maxLength={8}  />
              </div>
              <div className='subcontenedor'></div>
              </div>
            </div>
          </section>
        </div>
      </article>
    );
  }
}

export default Usuario;

