import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import apiClient from '../Security/apiClient';
import './Boleta.css'; 
import { Image } from 'primereact/image';
import bodega from "../Imagenes/7.png";
const Boleta = ({ idVenta }) => {
    const [comprobante, setComprobante] = useState(null);
    const [empresa, setEmpresa] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    useEffect(() => {
        fetchEmpresas();
    }, []);

    const fetchEmpresas = async () => {
        try {
            const data = await apiClient.get("http://localhost:8080/empresa/1");
            setEmpresa(data); 
        } catch (error) {
            console.error("Error al obtener empresas:", error);
        }
    };

    useEffect(() => {
        if (showDetails && !comprobante) {
            const fetchData = async () => {
                try {
                    const data = await apiClient.get(`http://localhost:8080/comprobante/${idVenta}`);
                    if (Array.isArray(data) && data.length > 0) {
                        setComprobante(data[0]);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [showDetails, idVenta, comprobante]);

    const generatePDF = () => {
        if (!comprobante) return;
    
        const doc = new jsPDF();
    
        // Estilos generales
        doc.setFont('Arial');
        doc.setFontSize(14);
        doc.setTextColor('#333333');
    
        // Encabezado
        doc.text(`Boleta de Venta`, 10, 5);
        doc.text(`Todo lo que necesitas, a tu alcance.`, 10, 15);
    
        // Imagen del logo
        const logoImgSrc = bodega; // Ruta de la imagen
        doc.addImage(logoImgSrc, 'JPEG', 10, 20, 50, 50); // (imagen, formato, x, y, ancho, alto)
    
        let yPosition = 30; // Posición inicial
        if (empresa) {
            doc.text(`RUC: ${empresa.ruc}`, 70, yPosition);
            doc.text(`Razón Social: ${empresa.razonSocial}`, 70, yPosition + 10);
            doc.text(`Dirección: ${empresa.direccion}`, 70, yPosition + 20);
        }
    
        yPosition += 40; 
        doc.text(`ID Venta: ${comprobante.idVenta}`, 10, yPosition);
        doc.text(`Numero: ${comprobante.numero}`, 10, yPosition + 10);
        doc.text(`Serie: ${comprobante.serie}`, 10, yPosition + 20);
        doc.text(`Fecha: ${new Date(comprobante.fechaVenta).toLocaleString()}`, 10, yPosition + 30);
        doc.text(`Cliente: ${comprobante.nomCli}`, 10, yPosition + 40);
        doc.text(`Documento: ${comprobante.docCli}`, 10, yPosition + 50);
        doc.text(`Dirección: ${comprobante.direccion}`, 10, yPosition + 60);
        doc.text(`Método de Pago: ${comprobante.nombreMetodo}`, 10, yPosition + 70);
    
        yPosition += 80; 
        const headers = ["#", "Producto", "Cantidad", "Precio Unitario", "Total"];
        const detalles = comprobante.detallesPedido.map((detalle, index) => [
            index + 1,
            detalle.nomProducto,
            detalle.cant,
            `$${detalle.precioUnitario.toFixed(2)}`, // Formato de precio
            `$${detalle.totalPro.toFixed(2)}` // Formato de total
        ]);
    
        doc.autoTable({
            startY: yPosition,
            head: [headers],
            body: detalles,
            theme: 'grid', // Cambiar a tema de cuadrícula para bordes
            margin: { top: 10 },
            styles: {
                font: 'Arial',
                fontSize: 10,
                textColor: '#333333',
                cellPadding: 2, // Reducir el relleno de la celda
                headerCellPadding: 2,
                halign: 'center' // Alineación horizontal centrada
            },
            columnStyles: {
                0: { halign: 'center' }, // Alineación horizontal centrada para la primera columna
                2: { halign: 'center' }, // Alineación horizontal centrada para la tercera columna
                3: { halign: 'right' }, // Alineación horizontal a la derecha para la cuarta columna
                4: { halign: 'right' } // Alineación horizontal a la derecha para la quinta columna
            }
        });
    
        // Resumen
        yPosition = doc.autoTable.previous.finalY + 5; // Posición del resumen
        doc.text(`Subtotal: $${comprobante.subTotal.toFixed(2)}`, 10, yPosition);
        doc.text(`IGV: $${comprobante.igv.toFixed(2)}`, 10, yPosition + 10);
        doc.text(`Descuento: $${comprobante.descuento.toFixed(2)}`, 10, yPosition + 20);
        doc.text(`Total Descuento: $${comprobante.totalDescuento.toFixed(2)}`, 10, yPosition + 30);
        doc.text(`Total: $${comprobante.total.toFixed(2)}`, 10, yPosition + 40);
    
        // Guardar el PDF
        doc.save('boleta.pdf');
    };
    

    const footer = (
        <Button label="Generar PDF" icon="pi pi-file-pdf" onClick={generatePDF} />
    );

    return (
        <div className="boleta-container">
            <Button label="Ver Boleta" icon="pi pi-eye" onClick={() => setShowDetails(true)} />
            <Dialog header="Boleta de Venta" visible={showDetails} style={{ width: '50vw' }} footer={footer} onHide={() => setShowDetails(false)}>
                {comprobante ? (
                    <div className="boleta-details">
                        <div className="boleta-info">
                            <div className="boleta-header">
                            <h3 
                            className="boleta-slogan"
                            style={{ display: "flex", justifyContent: "center" }}
                            >Todo lo que necesitas, a tu alcance.</h3>
                                <div 
                                className="boleta-header-content"
                                style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <div className="boleta-logo">
                                        <img src={bodega} alt="Logo" width="150" />
                                    </div>
                                    <div className="boleta-empresa-info">
                                        {empresa && (
                                            <>
                                                <p><strong>RUC:</strong> {empresa.ruc}</p>
                                                <p><strong>Razón Social:</strong> {empresa.razonSocial}</p>
                                                <p><strong>Dirección:</strong> {empresa.direccion}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="boleta-venta-info">
                                <p><strong>ID Venta:</strong> {comprobante.idVenta}</p>
                                <p><strong>Numero:</strong> {comprobante.numero}</p>
                                <p><strong>Serie:</strong> {comprobante.serie}</p>
                                <p><strong>Fecha:</strong> {new Date(comprobante.fechaVenta).toLocaleString()}</p>
                                <p><strong>Cliente:</strong> {comprobante.nomCli}</p>
                                <p><strong>Documento:</strong> {comprobante.docCli}</p>
                                <p><strong>Dirección:</strong> {comprobante.direccion}</p>
                                <p><strong>Método de Pago:</strong> {comprobante.nombreMetodo}</p>
                            </div>
                        </div>

                        <DataTable value={comprobante.detallesPedido} className="boleta-table" responsiveLayout="scroll">
                            <Column field="nomProducto" header="Producto" sortable></Column>
                            <Column field="cant" header="Cantidad" sortable></Column>
                            <Column field="precioUnitario" header="Precio Unitario" sortable></Column>
                            <Column field="totalPro" header="Total" sortable></Column>
                        </DataTable>

                        <h3>Resumen</h3>
                        <div className="boleta-summary">
                            <p><strong>Subtotal:</strong> {comprobante.subTotal}</p>
                            <p><strong>IGV:</strong> {comprobante.igv}</p>
                            <p><strong>Descuento:</strong> {comprobante.descuento}</p>
                            <p><strong>Total Descuento:</strong> {comprobante.totalDescuento}</p>
                            <p><strong>Total:</strong> {comprobante.total}</p>
                        </div>
                    </div>
                ) : (
                    <div>Cargando...</div>
                )}
            </Dialog>


        </div>
    );
};

export default Boleta;

