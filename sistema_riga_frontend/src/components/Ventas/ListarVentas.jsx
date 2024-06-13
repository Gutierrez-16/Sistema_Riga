import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import Header from "../Header/Header";
import Dashboard from "../Header/Head";
import apiClient from "../Security/apiClient";
import jsPDF from "jspdf";
import "jspdf-autotable";
import bodega from "../Imagenes/7.png";
import { Tag } from "primereact/tag";


import "primeicons/primeicons.css";

export default function ProductsDemo() {
  let emptyProduct = {
    idVenta: "",
    fechaVenta: "",
    descuento: "",
    igv: "",
    total: "",
    subtotal: "",
    totalDescuento: "",
    totalPagar: "",
    tipoComprobante: "",
    clientes: "",
    idPedido: "",
    empleados: "",
    idMetodoPago: ""
  };

  const [venta, setVenta] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState({ startDate: null, endDate: null });
  const toast = useRef(null);
  const dt = useRef(null);
  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {
    fetchVentas();
    fetchEmpresas();
  }, []);

  const fetchVentas = async () => {
    try {
      const data = await apiClient.get("http://localhost:8080/venta");
      setVenta(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEmpresas = async () => {
    try {
      const data = await apiClient.get("http://localhost:8080/empresa/1");
      setEmpresa(data);
    } catch (error) {
      console.error("Error al obtener empresas:", error);
    }
  };


  const fetchComprobanteById = async (id) => {
    try {
      const data = await apiClient.get(`http://localhost:8080/venta/comprobante/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const handleGenerateComprobante = async (rowData) => {
    const comprobante = await fetchComprobanteById(rowData.idVenta);
    if (comprobante) {
      const tipoComprobante = comprobante.tipoComprobante.trim().toLowerCase();
      if (tipoComprobante === 'b') {
        generatePDF(comprobante);
      } else if (tipoComprobante === 'f') {
        generateFacturaPDF(comprobante);
      } else {
        console.error("Tipo de comprobante no reconocido:", comprobante.tipoComprobante);
      }
    } else {
      console.error("No se encontró el comprobante para ID:", rowData.idVenta);
    }
  };
  
  const generatePDF = (comprobante) => {
    if (!comprobante) {
      return;
    }

    const doc = new jsPDF();

    doc.text("Boleta de Venta", 10, 10);
    doc.text("Todo lo que necesitas, a tu alcance.", 10, 20);

    const logoImgSrc = bodega;
    doc.addImage(logoImgSrc, "JPEG", 10, 30, 50, 50);

    let yPosition = 30;

    if (empresa) {
      doc.text(`RUC: ${empresa.ruc}`, 70, yPosition);
      doc.text(`Razón Social: ${empresa.razonSocial}`, 70, yPosition + 10);
      doc.text(`Dirección: ${empresa.direccion}`, 70, yPosition + 20);
      yPosition += 30;
    } else {
      yPosition += 60;
    }

    yPosition = yPosition < 90 ? 90 : yPosition;

    doc.text(`ID Venta: ${comprobante.idVenta}`, 10, yPosition);
    doc.text(`Numero: ${comprobante.numero}`, 10, yPosition + 10);
    doc.text(`Serie: ${comprobante.serie}`, 10, yPosition + 20);
    doc.text(`Fecha: ${new Date(comprobante.fechaVenta).toLocaleString()}`, 10, yPosition + 30);
    doc.text(`Cliente: ${comprobante.nomCli}`, 10, yPosition + 40);
    doc.text(`DNI: ${comprobante.docCli}`, 10, yPosition + 50);
    doc.text(`Dirección: ${comprobante.direccion}`, 10, yPosition + 60);
    doc.text(`Método de Pago: ${comprobante.nombreMetodo}`, 10, yPosition + 70);

    yPosition += 80;
    const headers = ["#", "Producto", "Cantidad", "Precio Unitario", "Total"];
    const detalles = comprobante.detallesPedido.map((detalle, index) => [
      index + 1,
      detalle.nomProducto,
      detalle.cant,
      `$${detalle.precioUnitario.toFixed(2)}`,
      `$${detalle.totalPro.toFixed(2)}`
    ]);

    doc.autoTable({
      startY: yPosition,
      head: [headers],
      body: detalles,
      theme: "grid",
      margin: { top: 10 },
      styles: {
        fontSize: 10,
        textColor: "#333333",
        cellPadding: 2,
        headerCellPadding: 2,
        halign: "center"
      },
      columnStyles: {
        0: { halign: "center" },
        2: { halign: "center" },
        3: { halign: "right" },
        4: { halign: "right" }
      }
    });

    yPosition = doc.autoTable.previous.finalY + 5;
    doc.text(`Subtotal: $${comprobante.subTotal.toFixed(2)}`, 10, yPosition);
    doc.text(`IGV: $${comprobante.igv.toFixed(2)}`, 10, yPosition + 10);
    doc.text(`Descuento: $${comprobante.descuento.toFixed(2)}`, 10, yPosition + 20);
    doc.text(`Total Descuento: $${comprobante.totalDescuento.toFixed(2)}`, 10, yPosition + 30);
    doc.text(`Total: $${comprobante.total.toFixed(2)}`, 10, yPosition + 40);

    doc.save("boleta.pdf");
  };
  const generateFacturaPDF = (comprobante) => {
    if (!comprobante) {
      return;
    }
  
    const doc = new jsPDF();
  
    // Título y subtítulo de la factura
    doc.setFontSize(14);
    doc.text(`Factura de Venta`, 105, 15, null, null, 'center');
    doc.setFontSize(10);
    doc.text(`Factura electrónica`, 105, 22, null, null, 'center');
  
    // Logo de la empresa (cambiar las coordenadas según el diseño)
    const logoImgSrc = bodega;
    doc.addImage(logoImgSrc, 'JPEG', 15, 10, 60, 20);
  
    // Datos de la empresa (cambiar coordenadas según el diseño)
    if (empresa) {
      doc.setFontSize(10);
      doc.text(`RUC: ${empresa.ruc}`, 15, 35);
      doc.text(`Razón Social: ${empresa.razonSocial}`, 15, 42);
      doc.text(`Dirección: ${empresa.direccion}`, 15, 49);
    }
  
    // Datos del cliente y de la factura
    const startY = 60;
    doc.text(`Cliente: ${comprobante.nomCli}`, 15, startY);
    doc.text(`RUC: ${comprobante.docCli}`, 15, startY + 7);
    doc.text(`Fecha: ${new Date(comprobante.fechaVenta).toLocaleString()}`, 15, startY + 14);
    doc.text(`ID Venta: ${comprobante.idVenta}`, 15, startY + 21);
    doc.text(`Número: ${comprobante.numero}`, 15, startY + 28);
    doc.text(`Serie: ${comprobante.serie}`, 15, startY + 35);
    doc.text(`Método de Pago: ${comprobante.nombreMetodo}`, 15, startY + 42);
  
    // Detalles de los productos vendidos
    const headers = ["#", "Descripción", "Cantidad", "P. Unitario", "Total"];
    const data = comprobante.detallesPedido.map((detalle, index) => [
      index + 1,
      detalle.nomProducto,
      detalle.cant,
      `$${detalle.precioUnitario.toFixed(2)}`,
      `$${detalle.totalPro.toFixed(2)}`
    ]);
  
    // Configuración de la tabla de detalles
    doc.autoTable({
      startY: startY + 50,
      head: [headers],
      body: data,
      theme: 'grid',
      margin: { top: 10 },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        halign: 'center'
      },
      columnStyles: {
        0: { halign: 'center' },
        2: { halign: 'center' },
        3: { halign: 'right' },
        4: { halign: 'right' }
      }
    });
  
    // Totales
    const lastY = doc.autoTable.previous.finalY + 5;
    doc.setFontSize(10);
    doc.text(`Subtotal: S/ ${comprobante.subTotal.toFixed(2)}`, 15, lastY);
    doc.text(`IGV (18%): S/ ${comprobante.igv.toFixed(2)}`, 15, lastY + 7);
    doc.text(`Total: S/ ${comprobante.total.toFixed(2)}`, 15, lastY + 14);
  
    // Nota al pie
    doc.setFontSize(8);
    doc.text(`Esta es una representación impresa de una factura electrónica, generada por un sistema autorizado por la SUNAT.`, 15, doc.internal.pageSize.height - 15);
  
    // Guardar el documento PDF con un nombre específico
    doc.save('factura.pdf');
  };
  


  const applyDateFilter = () => {
    setGlobalFilter(null);
  };
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2 ">
       <h2>Ventas Realizadas</h2>
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={() => dt.current.exportCSV()}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        <Button
          icon={<i className="pi pi-file-pdf" style={{ fontSize: '1.4rem' }}></i>  }
          className="p-button-rounded p-button-info"
          style={{
            backgroundColor: "white",
            color: "red",

          }}
          onClick={() => handleGenerateComprobante(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h5 className="m-0">Manage Ventas</h5>
      <div className="flex gap-2">
        <Calendar
          value={dateFilter.startDate}
          onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.value })}
          dateFormat="yy-mm-dd"
          placeholder="Start Date"
          className="mr-2"
          showIcon
        />
        <Calendar
          value={dateFilter.endDate}
          onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.value })}
          dateFormat="yy-mm-dd"
          placeholder="End Date"
          className="mr-2"
          showIcon
        />
        <Button
          icon="pi pi-search"
          className="p-button-help"
          onClick={applyDateFilter}
          tooltip="Apply Date Filter"
          tooltipOptions={{ position: "bottom" }}
        />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter
            (e.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>
    );
  
    const filteredVentas = dateFilter.startDate && dateFilter.endDate
      ? venta.filter(v => {
        const fechaVenta = new Date(v.fechaVenta);
        return fechaVenta >= dateFilter.startDate && fechaVenta <= dateFilter.endDate;
      })
      : venta;
  
      const getSeverity = (tipoComprobante) => {
        switch (tipoComprobante) {
          case "F":
            return "warning";
          case "B":
            return "info";
          default:
            return null;
        }
      };
      
      const tipoComprobanteTemplate = (rowData) => {
        const severity = getSeverity(rowData.tipoComprobante);
        const label = rowData.tipoComprobante === 'F' ? 'FACTURA' : 'BOLETA';
  
      
        return (
          <Tag severity={severity}  
          >
            
            {label}
          </Tag>
        );
      };
      
      
      
    return (
      <div>
        <Dashboard />
        <div className="flex">
          <div className="w-1/4">
            <Header />
          </div>
          <div className="col-12 xl:col-10">
            <div className="w-3/4 p-4">
              <Toast ref={toast} />
              <div className="card">
                <Toolbar className="mb-4"
                left={leftToolbarTemplate} 
                right={rightToolbarTemplate}></Toolbar>
                <DataTable
                  ref={dt}
                  value={filteredVentas}
                  selection={selectedProducts}
                  onSelectionChange={(e) => setSelectedProducts(e.value)}
                  dataKey="idVenta"
                  paginator
                  rows={10}
                  rowsPerPageOptions={[5, 10, 25]}
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} ventas"
                  globalFilter={globalFilter}
                  header={header}
                  emptyMessage="No ventas found."
                >
                  <Column selectionMode="multiple" exportable={false}></Column>
                  <Column field="idVenta" header="ID" sortable></Column>
                  <Column
                    field="fechaVenta"
                    header="Fecha Venta"
                    sortable
                    body={(rowData) => new Date(rowData.fechaVenta).toLocaleString()}
                  ></Column>
                  <Column 
                  field="tipoComprobante" 
                  header="Comprobante" 
                  sortable
                  body={tipoComprobanteTemplate}
                  ></Column>
                  <Column field="clientes" header="clientes" sortable></Column>
                  <Column field="totalPagar" header="Total Pagar" sortable></Column>
                  <Column field="empleados" header="empleados" sortable></Column>
                  <Column body={actionBodyTemplate} exportable={false}></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  