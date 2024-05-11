import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom'; 
import { DataTable } from 'primereact/datatable';
import './PersonaStyle.css';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { TbArrowZigZag } from 'react-icons/tb';

class Persona extends Component {
  
    render() {
      return (
        <article>
          <div>
            <Header/>
            <section>
            <div className='persona'>
            <h1>PERSONAS</h1>
            </div>
            <div className='global'>
            <div className='tabla'>
            <DataTable  tableStyle={{ minWidth: '50rem' }}>
                <Column field="nombre" header="NOMBRES" align="center"></Column>
                <Column field="apepat" header="APELLIDO PATERNO" align="center"></Column>
                <Column field="dni" header="DNI" align="center"></Column>
                <Column field="genero" header="GENERO" align="center"></Column>
                <Column field="fecnac" header="FECHA DE NACIMIENTO" align="center"></Column>
                <Column field="correo" header="CORREO" align="center"></Column>
                <Column field="celular" header="CELULAR" align="center"></Column>
                <Column field="direccion" header="DIRECCION" align="center"></Column>
                <Column field="departamento" header="DEPARTAMENTO" align="center"></Column>
                <Column field="provincia" header="PROVINCIA" align="center"></Column>
                <Column field="distrito" header="DISTRITO" align="center"></Column>
                <Column field="cargo" header="CARGO" align="center"></Column>
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
            <div className='globalpersona'>
              <div className='contenedorpersona'>
                <div className='subcontenedorpersona'>
                <span className="p-inputgroup-addon">NOMBRES</span>
                <InputText className='input' placeholder="" size={25}/>
                </div>
                <div className='subcontenedorpersona'>
                <span className="p-inputgroup-addon">DNI</span>
                <InputText className='input' placeholder="" size={25} maxLength={8} onKeyPress={(e) => (e.charCode < 48 || e.charCode > 57) && e.preventDefault()}/>
                </div>
                <div className='subcontenedorpersona'>
                <span className="p-inputgroup-addon">CORREO</span>
                <InputText className='input' placeholder="" size={25}/>
                </div>
                <div className='subcontenedorpersona'>
                <span className="p-inputgroup-addon">DEPARTAMENTO</span>
                <InputText className='input' placeholder="" size={25}/>
                </div>
                <div className='subcontenedorpersona'>
                <span className="p-inputgroup-addon">ESTADO</span>
                <InputText className='input' placeholder="" size={25} maxLength={1} onKeyPress={(e) => (e.charCode < 48 || e.charCode > 57) && e.preventDefault()}/>
                </div>
              </div>
              <div className='contenedorpersona2'>
              <div className='subcontenedorpersona'>
              <span className="p-inputgroup-addon">APELLIDO PATERNO</span>
                <InputText className='input' placeholder="" size={25}/>
              </div>  
              <div className='subcontenedorpersona'>
              <span className="p-inputgroup-addon">GENERO</span>
                <InputText className='input' placeholder="" size={25}/>
              </div>
              <div className='subcontenedorpersona'>
              <span className="p-inputgroup-addon">CELULAR</span>
                <InputText className='input' placeholder="" size={25} maxLength={9} onKeyPress={(e) => (e.charCode < 48 || e.charCode > 57) && e.preventDefault()}/>
              </div>
              <div className='subcontenedorpersona'>
              <span className="p-inputgroup-addon">PROVINCIA</span>
                <InputText className='input' placeholder="" size={25}/>
              </div>
              </div>
              <div className='contenedorpersona3'>
                <div className='subcontenedorpersona'>
                <span className="p-inputgroup-addon">APELLIDO MATERNO</span>
                <InputText className='input' placeholder="" size={25}/>
                </div>
                <div className='subcontenedorpersona'>
                <span className="p-inputgroup-addon">FECHA DE NACIMIENTO</span>
                <InputText className='input' placeholder="" size={25}/>
                </div>
                <div className='subcontenedorpersona'>
                <span className="p-inputgroup-addon">DIRECCION</span>
                <InputText className='input' placeholder="" size={25}/>
                </div>
                <div className='subcontenedorpersona'>
                <span className="p-inputgroup-addon">DISTRITO</span>
                <InputText className='input' placeholder="" size={25}/>
                </div>
              </div>
            </div>
            </section>
          </div>
        </article>
      );
    }
  }
  
  export default Persona;