import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom'; 
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { TbArrowZigZag } from 'react-icons/tb';


class Producto extends Component {
    render() {
      return (
        <article>
          <div>
            <Header/>
            <section>
            <div className='producto'>
            <h1>PRODUCTOS</h1>
            </div>
            <div className='global'>
            <div className='tabla'>
            <DataTable  tableStyle={{ minWidth: '50rem' }}>
                <Column field="nomproduct" header="NOMBRE PRODUCTO" align="center"></Column>
                <Column field="preciounitario" header="PRECIO UNITARIO" align="center"></Column>
                <Column field="descripcion" header="DESCRIPCION" align="center"></Column>
                <Column field="categoria" header="CATEGORIA" align="center"></Column>
                <Column field="unidadmedida" header="UNIDAD DE MEDIDA" align="center"></Column>
                <Column field="linea" header="LINEA" align="center"></Column>
                <Column field="marca" header="MARCA" align="center"></Column>
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
            <div className='globalproducto'>
              <div className='contenedorproducto'>
                <div className='subcontenedorproducto'>
                <span className="p-inputgroup-addon">NOMBRE PRODUCTO</span>
                <InputText className='input' placeholder="" size={45}/>
                </div>
                <div className='subcontenedorproducto'>
                <span className="p-inputgroup-addon">DESCRIPCION</span>
                <InputText className='input' placeholder="" size={45}/>
                </div>
                <div className='subcontenedorproducto'>
                <span className="p-inputgroup-addon">UNIDAD MEDIDA</span>
                <InputText className='input' placeholder="" size={45}/>
                </div>
                <div className='subcontenedorproducto'>
                <span className="p-inputgroup-addon">MARCA</span>
                <InputText className='input' placeholder="" size={45}/>
                </div>
              </div>
              <div className='contenedorproducto2'>
              <div className='subcontenedorproducto'>
              <span className="p-inputgroup-addon">PRECIO UNITARIO</span>
                <InputText className='input' placeholder="" size={45}/>
              </div>  
              <div className='subcontenedorproducto'>
              <span className="p-inputgroup-addon">CATEGORIA</span>
                <InputText className='input' placeholder="" size={45}/>
              </div>
              <div className='subcontenedorproducto'>
              <span className="p-inputgroup-addon">LINEA</span>
                <InputText className='input' placeholder="" size={45}/>
              </div>
              <div className='subcontenedorproducto'>
              <span className="p-inputgroup-addon">ESTADO</span>
                <InputText className='input' placeholder="" size={45} maxLength={1} onKeyPress={(e) => (e.charCode < 48 || e.charCode > 57) && e.preventDefault()}/>
              </div>
              </div>
            </div>
            </section>
          </div>
        </article>
      );
    }
  }
  
  export default Producto;