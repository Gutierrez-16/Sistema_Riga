import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom'; 
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { TbArrowZigZag } from 'react-icons/tb';

class Empleado extends Component {
    render() {
      return (
        <article>
          <div>
            <Header/>
            <section>
            <div className='empleado'>
            <h1>EMPLEADOS</h1>
            </div>
            <div className='global'>
            <div className='tabla'>
            <DataTable  tableStyle={{ minWidth: '50rem' }}>
                <Column field="sueldo" header="SUELDO" align="center"></Column>
                <Column field="fechingreso" header="FECHA INGRESO" align="center"></Column>
                <Column field="horaentrada" header="HORA ENTRADA" align="center"></Column>
                <Column field="horasalida" header="HORA SALIDA" align="center"></Column>
                <Column field="turno" header="TURNO" align="center"></Column>
                <Column field="dni" header="DNI" align="center"></Column>
                <Column field="cargo" header="CARGO" align="center"></Column>
                <Column field="nombre" header="NOMBRES" align="center"></Column>
                <Column field="apepat" header="APELLIDO PATERNO" align="center"></Column>
                <Column field="apemat" header="APELLIDO MATERNO" align="center"></Column>
                <Column field="nomusuario" header="NOMBRE USUARIO" align="center"></Column>
                <Column field="contraseña" header="CONTRASEÑA" align="center"></Column>
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
            <div className='globalempleado'>
              <div className='contenedorempleado'>
                <div className='subcontenedorempleado'>
                <span className="p-inputgroup-addon">SUELDO</span>
                <InputText className='input' placeholder="" size={25}/>
                </div>
                <div className='subcontenedorempleado'>
                <span className="p-inputgroup-addon">HORA ENTRADA</span>
                <InputText className='input' placeholder="" size={25}/>
                </div>
                <div className='subcontenedorempleado'>
                <span className="p-inputgroup-addon">NOMBRES</span>
                <InputText className='input' placeholder="" size={25}/>
                </div>
                <div className='subcontenedorempleado'>
                <span className="p-inputgroup-addon">CARGO</span>
                <InputText className='input' placeholder="" size={25}/>
                </div>
                <div className='subcontenedorempleado'>
                <span className="p-inputgroup-addon">TIPO USUARIO</span>
                <InputText className='input' placeholder="" size={25}/>
                </div>
              </div>
              <div className='contenedorempleado2'>
              <div className='subcontenedorempleado'>
              <span className="p-inputgroup-addon">FECHA INGRESO</span>
                <InputText className='input' placeholder="" size={25}/>
              </div>  
              <div className='subcontenedorempleado'>
              <span className="p-inputgroup-addon">HORA SALIDA</span>
                <InputText className='input' placeholder="" size={25}/>
              </div>
              <div className='subcontenedorempleado'>
              <span className="p-inputgroup-addon">APELLIDO PATERNO</span>
                <InputText className='input' placeholder="" size={25}/>
              </div>
              <div className='subcontenedorempleado'>
              <span className="p-inputgroup-addon">NOMBRE USUARIO</span>
                <InputText className='input' placeholder="" size={25}/>
              </div>
              <div className='subcontenedorempleado'>
              <span className="p-inputgroup-addon">ESTADO</span>
                <InputText className='input' placeholder="" size={25} maxLength={1} onKeyPress={(e) => (e.charCode < 48 || e.charCode > 57) && e.preventDefault()}/>
              </div>
              </div>
              <div className='contenedorempleado3'>
                <div className='subcontenedorempleado'>
                <span className="p-inputgroup-addon">TURNO</span>
                <InputText className='input' placeholder="" size={25}/>
                </div>
                <div className='subcontenedorempleado'>
                <span className="p-inputgroup-addon">DNI</span>
                <InputText className='input' placeholder="" size={25} maxLength={8} onKeyPress={(e) => (e.charCode < 48 || e.charCode > 57) && e.preventDefault()}/>
                </div>
                <div className='subcontenedorempleado'>
                <span className="p-inputgroup-addon">APELLIDO MATERNO</span>
                <InputText className='input' placeholder="" size={25}/>
                </div>
                <div className='subcontenedorempleado'>
                <span className="p-inputgroup-addon">CONTRASEÑA </span>
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
  
  export default Empleado;