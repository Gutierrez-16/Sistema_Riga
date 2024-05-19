import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom'; 
import { DataTable } from 'primereact/datatable';
import './VentaStyle.css';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { TbArrowZigZag } from 'react-icons/tb';


class Venta extends Component {
    render() {
      return (
        <article>
          <div>
            <Header/>
            <section>
            <div className='venta'>
            <h1>VENTAS</h1>
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
                <Column field="cantidad" header="CANTIDAD" align="center"></Column>
                <Column field="imagen" header="IMAGEN" align="center"></Column>
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
            <div className='globalventa'>
              <div className='contenedorventa'>
                <div className='subcontenedorventa'>
                <span className="p-inputgroup-addon">CLIENTE</span>
                <InputText className='input' placeholder="" size={45}/>
                </div>
              </div>
              <div className='contenedorventa2'>
              </div>
            </div>
            </section>
          </div>
        </article>
      );
    }
  }
  
  export default Venta;