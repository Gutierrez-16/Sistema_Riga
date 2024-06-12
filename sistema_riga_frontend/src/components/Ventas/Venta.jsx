import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { RadioButton } from "primereact/radiobutton";
import { Panel } from "primereact/panel";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { ColumnGroup } from "primereact/columngroup";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import bodega from "../Imagenes/7.png";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import Header from "../Header/Header";
import Dashboard from "../Header/Head";

import DataUsuario from "../Usuario/DataUsuario";
import { Dropdown } from "primereact/dropdown";
import apiClient from "../Security/apiClient";
import Boleta from "../Comprobante/Boleta";
import { Row } from "primereact/row";

import "./VentaStyle.css";
const SalesComponent = () => {
  const [productName, setProductName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [saleType, setSaleType] = useState("boleta");
  const [salesDetails, setSalesDetails] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const toast = useRef(null);
  const [serieNumero, setSerieNumero] = useState("000001");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [persons, setPersons] = useState([]); // State para almacenar los clientes
  const [companies, setCompanies] = useState([]); // State para almacenar las empresas
  const [products, setProducts] = useState([]); // State para almacenar los clientes
  const [productsDialogVisible, setProductsDialogVisible] = useState(false);
  const [selectedPersonName, setSelectedPersonName] = useState(""); // Paso 1: Estado para almacenar el nombre del cliente seleccionado
  const [comprobante, setComprobante] = useState(null);

  const [id, setId] = useState("");
  const [idVenta, setIdVenta] = useState(null); // Estado para almacenar el ID de la venta seleccionada
  const [showBoletaDialog, setShowBoletaDialog] = useState(false); // Estado para controlar la visibilidad del diálogo de la boleta
  const [empresa, setEmpresa] = useState(null);
  const [metodo, setMetodo] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  
  const [submitted, setSubmitted] = useState(false);


  const [idmet, setIdmet] = useState("");
  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    try {
      const data = await apiClient.get("http://localhost:8080/empresa/1");
      setEmpresa(data); // Aquí asumo que la respuesta del servidor contiene tanto el RUC como la razón social
    } catch (error) {
      console.error("Error al obtener empresas:", error);
    }
  };

  useEffect(() => {
    fetchClients(); // Cargar clientes cuando el componente se monta
    generateSerieNumero();
    fetchProducts();
  }, []);

  const handleUserDataReceived = (userData) => {
    setId(userData.idUsuario);
  };


  const [metodosPago, setMetodosPago] = useState([]);


  const getToken = () => {
    return localStorage.getItem('token');
  };
  const token = getToken();

  // Función para cargar los clientes desde la API
  const fetchClients = async () => {
    try {
      const personsData = await apiClient.get("http://localhost:8080/person");
      setPersons(personsData);

      const companiesData = await apiClient.get("http://localhost:8080/empresa");
      setCompanies(companiesData);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await apiClient.get("http://localhost:8080/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const generateSerieNumero = () => {
    const newSerieNumero = "000001";
    setSerieNumero(newSerieNumero);
  };

  const generatePDF = (comprobante) => {
    if (!comprobante) {
      console.log("NO HAY COMPROBANTE P")
      return;
    }

    setComprobante(null);

    const doc = new jsPDF();

    doc.text(`Boleta de Venta`, 10, 5);
    doc.text(`Todo lo que necesitas, a tu alcance.`, 10, 15);

    const logoImgSrc = bodega;
    doc.addImage(logoImgSrc, 'JPEG', 10, 20, 50, 50);

    let yPosition = 30;
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
      `$${detalle.precioUnitario.toFixed(2)}`,
      `$${detalle.totalPro.toFixed(2)}`
    ]);

    doc.autoTable({
      startY: yPosition,
      head: [headers],
      body: detalles,
      theme: 'grid',
      margin: { top: 10 },
      styles: {
        fontSize: 10,
        textColor: '#333333',
        cellPadding: 2,
        headerCellPadding: 2,
        halign: 'center'
      },
      columnStyles: {
        0: { halign: 'center' },
        2: { halign: 'center' },
        3: { halign: 'right' },
        4: { halign: 'right' }
      }

    });

    yPosition = doc.autoTable.previous.finalY + 5;
    doc.text(`Subtotal: $${comprobante.subTotal.toFixed(2)}`, 10, yPosition);
    doc.text(`IGV: $${comprobante.igv.toFixed(2)}`, 10, yPosition + 10);
    doc.text(`Descuento: $${comprobante.descuento.toFixed(2)}`, 10, yPosition + 20);
    doc.text(`Total Descuento: $${comprobante.totalDescuento.toFixed(2)}`, 10, yPosition + 30);
    doc.text(`Total: $${comprobante.total.toFixed(2)}`, 10, yPosition + 40);

    doc.save('boleta.pdf');

  };

  const handleRealizarVenta = async () => {
    try {
      if (selectedPerson && salesDetails.length > 0) {
        console.log("PASE POR SELECTED");
        const pedidoResponse = await fetch("http://localhost:8080/pedido", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("PEDIDO: ", pedidoResponse);

        if (!pedidoResponse.ok) {
          throw new Error("Error al insertar el pedido.");
        }
        const pedidoId = await pedidoResponse.json();
        await Promise.all(
          salesDetails.map(async (detalle) => {
            const detallePedidoData = {
              idPedido: pedidoId,
              idProducto: detalle.productId,
              cantidad: detalle.quantity,
              precio: detalle.price,
              idUsuario: id,
            };

            const detallePedidoResponse = await fetch(
              `http://localhost:8080/detallepedido/${pedidoId}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(detallePedidoData),
              }
            );

            if (!detallePedidoResponse.ok) {
              throw new Error("Error al insertar los detalles del pedido.");
            }
          })
        );

        const subtotal = salesDetails.reduce((total, sale) => {
          return total + sale.quantity * sale.price;
        }, 0);

        const igv = subtotal * 0.18;
        const descuento = 0;
        const totalDescuento = subtotal * (descuento / 100);
        const totalPagar = subtotal + igv - totalDescuento;

        let tipoComprobante;
        if (saleType === "boleta") {
          tipoComprobante = "B";
        } else if (saleType === "factura") {
          tipoComprobante = "F";
        } else {
          throw new Error("Tipo de comprobante no válido.");
        }
        const dataMetodo = await apiClient.get("http://localhost:8080/metodopago");
        console.log("DATA METODO: ", dataMetodo)
        

        console.log("ID MET: ",idmet);

        const ventaData = {
          Descuento: descuento,
          igv: igv,
          total: totalPagar,
          subtotal: subtotal,
          totaldescuento: totalDescuento,
          totalPagar: totalPagar,
          tipoComprobante: tipoComprobante,
          idCliente: selectedPerson,
          idPedido: pedidoId,
          idUsuario: id,
          idMetodoPago: idmet, // Aquí se incluye el idMetodoPago obtenido
        };
        console.log("DATA: ", ventaData);
        
        const ventaResponse = await fetch("http://localhost:8080/venta", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(ventaData)
        });

        console.log("RESPONSE: : ", ventaResponse);


        if (!ventaResponse.ok) {
          throw new Error("Error al insertar la venta.");
        }

        const ventaId = (await ventaResponse.json()).idVenta;
        toast.current.show({
          severity: "success",
          summary: "Venta realizada",
          detail: "La venta se realizó correctamente",
          life: 3000,
        });

        setSalesDetails([]);
        const comprobanteResponse = await fetch(`http://localhost:8080/venta/comprobante/${ventaId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        if (!comprobanteResponse.ok) {
          throw new Error("Error al obtener el comprobante de venta.");
        }

        const comprobanteData = await comprobanteResponse.json();
        setComprobante(comprobanteData);

        console.log("data: ", comprobanteData)

        generatePDF(comprobanteData);
        console.log("PASE POR EL PDF");

        setIdVenta(idVenta); // Esto no está haciendo nada
        setShowBoletaDialog(true);


      } else {
        throw new Error(
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "seleccione un cliente y productos",
            life: 3000,
          })
        );
      }

    } catch (error) {
      console.error("Error realizando la venta:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error al realizar la venta",
        life: 3000,
      });
    }

  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    const newSale = {
      productId: product.idProducto,
      productName: product.nombreProd,
      quantity: 1,
      price: product.precioUnit,
      total: product.precioUnit,
      person: selectedPerson,
    };
    setSalesDetails([...salesDetails, newSale]);
  };

  const handlePersonSelect = (person) => {
    setSelectedPerson(person.idPersona);
    setSelectedPersonName(person.nombrePersona);
    setDialogVisible(false);
  };

  const handleCompanySelect = (company) => {
    setSelectedPerson(company.idEmpresa);
    setSelectedPersonName(company.razonSocial);
    setDialogVisible(false);
  };

  const handleAddSale = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      const newSale = {
        productName: selectedProduct.nombreProd,
        quantity: 1,
        price: selectedProduct.precioUnit,
        total: selectedProduct.precioUnit,
        person: selectedPerson,
      };
      setSalesDetails([...salesDetails, newSale]);
      toast.current.show({
        severity: "success",
        summary: "Venta agregada",
        detail: `Producto: ${selectedProduct.nombreProd}`,
        life: 3000,
      });
      setProductName("");
      setSelectedProduct(null);
      setSelectedPerson(null);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Todos los campos son obligatorios",
        life: 3000,
      });
    }
  };

  const handleQuantityChange = (rowData, newQuantity) => {
    const updatedSalesDetails = salesDetails.map((sale) =>
      sale === rowData
        ? {
          ...sale,
          quantity: newQuantity,
          total: (newQuantity * sale.price).toFixed(2),
        }
        : sale
    );
    setSalesDetails(updatedSalesDetails);
  };

  const handleDeleteSale = (rowData) => {
    const updatedSalesDetails = salesDetails.filter((sale) => sale !== rowData);
    setSalesDetails(updatedSalesDetails);
  };


  const handleSaleTypeChange = (e) => {
    setSaleType(e.value);
    setSelectedPersonName(""); // Limpiar el contenido del InputText
    setSelectedPerson(null); // Limpiar el cliente seleccionado
  };

  useEffect(() => {
    fetchMetodosPago();
  }, []);

  const fetchMetodosPago = async () => {
    try {
      const dataMetodo = await apiClient.get("http://localhost:8080/metodopago");
      console.log(dataMetodo);
      setMetodosPago(dataMetodo); // Actualizamos el estado con los métodos de pago obtenidos
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };

  const changeMetodo = (e) => {
    setMetodo(e.value);
    console.log(e.value)

    setIdmet(e.value)
  }

  return (
    <div>
      <div className="">
        <div>
          <Boleta />
          <DataUsuario onUserDataReceived={handleUserDataReceived} />
        </div>
        <div className="p-d-flex p-jc-center p-mt-5">
          <div className="sales-grid">
            <Toast ref={toast} />

            <Panel header="Buscar Producto" className="p-shadow-4">
              <Button
                className="mb-4"
                label="Seleccionar Producto"
                icon="pi pi-external-link"
                onClick={() => setProductsDialogVisible(true)}
              />

              <ProductDialog
                visible={productsDialogVisible}
                onHide={() => setProductsDialogVisible(false)}
                onSelectProduct={handleProductSelect}
                products={products}
              />
              <PersonDialog
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                onSelectPerson={handlePersonSelect}
                onSelectCompany={handleCompanySelect}
                data={saleType === "boleta" ? persons : companies}
                isPerson={saleType === "boleta"}
              />
              <SalesTable
                salesDetails={salesDetails}
                onQuantityChange={handleQuantityChange}
                onDelete={handleDeleteSale}
              />
            </Panel>

            <div className="row">
              <Panel header="Informacion" className="p-shadow-4 mb-4">
                <div className="p-field">
                  <div className="mb-2 font-bold">
                    Selecciona un tipo de comprobante:
                  </div>
                  <div className="p-field-radiobutton mb-2 ">
                    <RadioButton
                      inputId="boleta"
                      name="saleType"
                      value="boleta"
                      onChange={handleSaleTypeChange}
                      checked={saleType === "boleta"}
                    />
                    <label htmlFor="boleta" className="mx-2">
                      Boleta
                    </label>
                  </div>
                  <div className="p-field-radiobutton mb-2">
                    <RadioButton
                      inputId="factura"
                      name="saleType"
                      value="factura"
                      onChange={handleSaleTypeChange}
                      checked={saleType === "factura"}
                    />
                    <label htmlFor="factura" className="mx-2">
                      Factura
                    </label>
                  </div>
                  <div className="p-field-radiobutton ">
                    <label className="font-bold mb-8" htmlFor="idMetodoPago" >
                      <p className="mb-2">Metodo de pago</p>
                    </label>
                    <div >
                    <Dropdown
                    
                      id="idMetodoPago"
                      value={metodo} // Assuming 'metodo' is the state variable holding the selected method
                      options={metodosPago.map((metodo) => ({
                        label: metodo.nombreMetodo,
                        value: metodo.idMetodo,
                      }))}
                      onChange={changeMetodo}
                      placeholder="Seleccione un pago"
                    />
                    </div>
                    {submitted && !metodosPago.idMetodo   && (
                      <small className="p-error">Metodo pago es requerido.</small>
                    )}
                  </div>

                  <Divider align="center">
                    <span>Datos</span>
                  </Divider>
                </div>

                <div
                  className="p-d-flex p-flex-row p-jc-between"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    style={{
                      width: "38%",
                      backgroundColor: "var(--orange-400)",
                      border: "var(--green-500)",
                    }}
                    label="Cliente"
                    icon="pi pi-users green-500"
                    onClick={() => setDialogVisible(true)}
                  />

                  <InputText
                    disabled
                    style={{ width: "58%" }}
                    placeholder="Seleccione..."
                    value={selectedPersonName}
                  />
                </div>
              </Panel>
              <div className="flex justify-content-center flex-wrap">
                <Button
                onSubmit={setSubmitted}
                  style={{
                    backgroundColor: "var(--cyan-500)",
                    border: "var(--green-500)",
                  }}
                  label="Realizar venta"
                  icon="pi pi-shopping-cart"
                  onClick={() => {
                    handleRealizarVenta();

                  }}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDialog = ({ visible, onHide, onSelectProduct, products }) => {
  const [searchText, setSearchText] = useState("");
  const filteredProducts = products.filter((product) =>
    product.nombreProd.toLowerCase().includes(searchText.toLowerCase())
  );

  const [globalFilter, setGlobalFilter] = useState(null);
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Buscar Producto</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </IconField>
    </div>
  );

  return (
    <Dialog
      header="Seleccionar Producto"
      visible={visible}
      style={{ width: "75vw" }}
      maximizable
      modal
      onHide={onHide}
    >
      <DataTable
        value={filteredProducts}
        selectionMode="single"
        onRowSelect={(e) => onSelectProduct(e.data)}
        dataKey="idProducto"
        header={header}
        paginator
        rows={10}
        emptyMessage="No se encontraron productos"
        globalFilter={globalFilter}
      >
        <Column field="nombreProd" header="Nombre" sortable />
        <Column field="precioUnit" header="Precio" />
      </DataTable>

      <Button
        label="Cerrar"
        icon="pi pi-times"
        onClick={onHide}
        className="p-mt-2"
        style={{ backgroundColor: "red", borderColor: "red" }}
      />
    </Dialog>
  );
};

const PersonDialog = ({ visible, onHide, onSelectPerson, onSelectCompany, data, isPerson }) => {
  const [searchText, setSearchText] = useState("");
  const filteredData = data.filter((item) =>
    (isPerson ? item.nombrePersona : item.razonSocial).toLowerCase().includes(searchText.toLowerCase())
  );

  const [globalFilter, setGlobalFilter] = useState(null);
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">{isPerson ? "Seleccionar Cliente" : "Seleccionar Empresa"}</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </IconField>
    </div>
  );

  return (
    <Dialog
      header={isPerson ? "Seleccionar Cliente" : "Seleccionar Empresa"}
      visible={visible}
      style={{ width: "75vw" }}
      maximizable
      modal
      onHide={onHide}
    >
      <DataTable
        value={filteredData}
        selectionMode="single"
        onRowSelect={(e) => isPerson ? onSelectPerson(e.data) : onSelectCompany(e.data)}
        dataKey={isPerson ? "idPersona" : "idEmpresa"}
        header={header}
        paginator
        rows={10}
        emptyMessage={isPerson ? "No se encontraron clientes" : "No se encontraron empresas"}
        globalFilter={globalFilter}
      >
        <Column field={isPerson ? "nombrePersona" : "razonSocial"} header="Nombre" sortable />
        <Column field={isPerson ? "correo" : "ruc"} header={isPerson ? "correo" : "ruc"} sortable />
      </DataTable>

      <Button
        label="Cerrar"
        icon="pi pi-times"
        onClick={onHide}
        className="p-mt-2"
        style={{ backgroundColor: "red", borderColor: "red" }}
      />
    </Dialog>
  );
};

const SalesTable = ({ salesDetails, onQuantityChange, onDelete }) => {
  const handleQuantityChange = (rowData, newQuantity) => {
    onQuantityChange(rowData, newQuantity);
  };
  const subtotal = salesDetails.reduce((total, sale) => {
    return total + sale.quantity * sale.price;
  }, 0);

  const igv = subtotal * 0.18;
  const descuento = 0;
  const totalDescuento = subtotal * (descuento / 100);
  const totalPagar = subtotal + igv - totalDescuento;

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer={"Descuento:"}
          colSpan={4}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={descuento} />
      </Row>
      <Row>
        <Column
          footer={"IGV:"}
          colSpan={4}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={igv.toFixed(2)} />
      </Row>
      <Row>
        <Column
          footer={"Total:"}
          colSpan={4}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={totalPagar.toFixed(2)} />
      </Row>
      <Row>
        <Column
          footer={"Subtotal:"}
          colSpan={4}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={subtotal.toFixed(2)} />
      </Row>
      <Row>
        <Column
          footer={"Total descuento:"}
          colSpan={4}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={totalDescuento.toFixed(2)} />
      </Row>
      <Row>
        <Column
          footer={"Total Pagar:"}
          colSpan={4}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={totalPagar.toFixed(2)} />
      </Row>
    </ColumnGroup>
  );

  return (
    <div className="">
      <div>
      </div>
      <DataTable
        value={salesDetails}
        footerColumnGroup={footerGroup}
        responsiveLayout="scroll"
      >
        <Column
          field="productName"
          style={{ minWidth: "1rem", maxWidth: "7rem" }}
          header="Producto"
        />
        <Column
          header="Cantidad"
          body={(rowData) => (
            <div>
              <div className="card flex flex-wrap gap-3 p-fluid">
                <div>
                  <InputNumber
                    className="inputnumber"
                    inputClassName="custom-input"
                    inputId="minmax-buttons"
                    value={rowData.quantity}
                    onValueChange={(e) =>
                      handleQuantityChange(rowData, e.value)
                    }
                    showButtons
                    min={1}
                    max={100}
                  />
                </div>
              </div>
            </div>
          )}
          style={{ maxWidth: "10rem", minWidth: "8rem" }}
        />
        <Column field="price" header="Precio" style={{ maxWidth: "5rem" }} />
        <Column field="total" header="Subtotal" style={{ maxWidth: "5rem" }} />
        <Column
          header="Eliminar"
          body={(rowData) => (
            <Button
              icon="pi pi-trash"
              className="p-button-danger"
              onClick={() => onDelete(rowData)}
            />
          )}
          style={{ maxWidth: "5rem" }}
        />
      </DataTable>
    </div>
  );
};

export default SalesComponent;
