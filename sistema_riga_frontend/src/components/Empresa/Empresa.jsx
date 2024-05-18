import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom'; 
import { DataTable } from 'primereact/datatable';
import './EmpresaStyle.css';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { TbArrowZigZag } from 'react-icons/tb';


class Empresa extends Component {
    render() {
      return (
        <article>
          <div>
            <Header/>
            <section>
            <div className='empresa'>
            <h1>EMPRESAS</h1>
            </div>
            <div className='global'>
            <div className='tabla'>
            <DataTable  tableStyle={{ minWidth: '50rem' }}>
                <Column field="razonsocial" header="RAZON SOCIAL" align="center"></Column>
                <Column field="ruc" header="RUC" align="center"></Column>
                <Column field="correo" header="CORREO" align="center"></Column>
                <Column field="telefono" header="TELEFONO" align="center"></Column>
                <Column field="direccion" header="DIRECCION" align="center"></Column>
                <Column field="departamento" header="DEPARTAMENTO" align="center"></Column>
                <Column field="provincia" header="PROVINCIA" align="center"></Column>
                <Column field="distrito" header="DISTRITO" align="center"></Column>
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
            <div className='globalempresa'>
              <div className='contenedorempresa'>
                <div className='subcontenedorempresa'>
                <span className="p-inputgroup-addon">RAZON SOCIAL</span>
                <InputText className='input' placeholder="" size={45}/>
                </div>
                <div className='subcontenedorempresa'>
                <span className="p-inputgroup-addon">CORREO</span>
                <InputText className='input' placeholder="" size={45}/>
                </div>
                <div className='subcontenedorempresa'>
                <span className="p-inputgroup-addon">DIRECCION</span>
                <InputText className='input' placeholder="" size={45}/>
                </div>
                <div className='subcontenedorempresa'>
                <span className="p-inputgroup-addon">PROVINCIA</span>
                <InputText className='input' placeholder="" size={45}/>
                </div>
                <div className='subcontenedorempresa'>
                <span className="p-inputgroup-addon">ESTADO</span>
                <InputText className='input' placeholder="" size={45} maxLength={1} onKeyPress={(e) => (e.charCode < 48 || e.charCode > 57) && e.preventDefault()}/>
                </div>
              </div>
              <div className='contenedorempresa2'> 
              <div className='subcontenedorempresa'>
              <span className="p-inputgroup-addon">RUC</span>
                <InputText className='input' placeholder="" size={45} maxLength={11} onKeyPress={(e) => (e.charCode < 48 || e.charCode > 57) && e.preventDefault()}/>
              </div>
              <div className='subcontenedorempresa'>
              <span className="p-inputgroup-addon">TELEFONO</span>
                <InputText className='input' placeholder="" size={45} maxLength={9} onKeyPress={(e) => (e.charCode < 48 || e.charCode > 57) && e.preventDefault()}/>
              </div>
              <div className='subcontenedorempresa'>
              <span className="p-inputgroup-addon">DEPARTAMENTO</span>
                <InputText className='input' placeholder="" size={45}/>
              </div>
              <div className='subcontenedorempresa'>
              <span className="p-inputgroup-addon">DISTRITO</span>
                <InputText className='input' placeholder="" size={45}/>
              </div>
              </div>
            </div>
            </section>
          </div>
        </article>
      );
    }
  }
  
  export default Empresa;