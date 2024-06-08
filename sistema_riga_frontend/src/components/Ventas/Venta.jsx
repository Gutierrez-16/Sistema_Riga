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

import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

import Header from "../Header/Header";
import Dashboard from "../Header/Head";

import DataUsuario from "../Usuario/DataUsuario";

import apiClient from "../Security/apiClient";

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
  const [products, setProducts] = useState([]); // State para almacenar los clientes
  const [productsDialogVisible, setProductsDialogVisible] = useState(false);
  const [selectedPersonName, setSelectedPersonName] = useState(""); // Paso 1: Estado para almacenar el nombre del cliente seleccionado

  const [id, setId] = useState("");


  // Función para manejar la selección de cliente

  useEffect(() => {
    fetchPersons(); // Cargar clientes cuando el componente se monta
    generateSerieNumero();
    fetchProducts();
  }, []);

  const handleUserDataReceived = (userData) => {
    console.log("Datos del usuario recibidos:", userData);
    console.log("ID: ", userData.idUsuario);
    setId(userData.idUsuario);
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };
  const token = getToken();

  // Función para cargar los clientes desde la API
  const fetchPersons = async () => {
    try {
      const data = await apiClient.get("http://localhost:8080/person");
      setPersons(data);
    } catch (error) {
      console.error("Error fetching persons:", error);
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

  const handleRealizarVenta = async () => {
    try {
      // Verificar si selectedPerson no es null y salesDetails no está vacío
      if (selectedPerson && salesDetails.length > 0) {
        // Crear un objeto con los datos del pedido
        const pedidoData = {
          // Otros campos que puedas necesitar para el pedido
        };

        console.log("TU TOKEN:", token)

        // Enviar la solicitud para insertar el pedido
        const pedidoResponse = await fetch("http://localhost:8080/pedido", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(pedidoData),
        });

        if (!pedidoResponse.ok) {
          throw new Error("Error al insertar el pedido.");
        }

        // Obtener el ID del pedido insertado
        const pedidoId = await pedidoResponse.json();

        // Promise.all para enviar todas las solicitudes de detalles del pedido en paralelo
        await Promise.all(
          salesDetails.map(async (detalle) => {
            // Crear un objeto con los datos del detalle del pedido
            console.log(detalle);
            const detallePedidoData = {
              idPedido: pedidoId,
              idProducto: detalle.productId,
              cantidad: detalle.quantity,
              precio: detalle.price,
              idUsuario: id,
              // Otros campos que puedas necesitar para el detalle del pedido
            };

            // Enviar la solicitud para insertar el detalle del pedido
            const detallePedidoResponse = await fetch(
              `http://localhost:8080/detallepedido/${pedidoId}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${token}`

                },
                body: JSON.stringify(detallePedidoData),
              }
            );

            console.log("detalle");
            if (!detallePedidoResponse.ok) {
              throw new Error("Error al insertar los detalles del pedido.");
            }
          })
        );

        // Crear un objeto con los datos de la venta
        const subtotal = salesDetails.reduce((total, sale) => {
          return total + sale.quantity * sale.price;
        }, 0);

        const igv = subtotal * 0.18; // Suponiendo que el IGV es el 18% del subtotal
        const descuento = 0; // Puedes calcular el descuento según tus necesidades
        const totalDescuento = subtotal * (descuento / 100); // Descuento total
        const totalPagar = subtotal + igv - totalDescuento; // Total a pagar

        // Crear un objeto con los datos de la venta
        let tipoComprobante;
        if (saleType === "boleta") {
          tipoComprobante = "B";
          console.log(tipoComprobante);
        } else if (saleType === "factura") {
          tipoComprobante = "F";
        } else {
          throw new Error("Tipo de comprobante no válido.");
        }

        // Crear un objeto con los datos de la venta
        const ventaData = {
          Descuento: descuento,
          igv: igv,
          total: totalPagar,
          subtotal: subtotal,
          totaldescuento: totalDescuento,
          totalPagar: totalPagar,
          tipoComprobante: tipoComprobante, // Asignar el valor correspondiente a tipoComprobante
          idCliente: selectedPerson,
          idPedido: pedidoId,
          idUsuario: id,
          idMetodoPago: 1,
        };

        console.log(ventaData)

        // Enviar la solicitud para insertar la venta
        const ventaResponse = await fetch("http://localhost:8080/venta", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`

          },
          body: JSON.stringify(ventaData),
        });

        if (!ventaResponse.ok) {
          throw new Error("Error al insertar la venta.");
        }

        // Venta realizada con éxito
        toast.current.show({
          severity: "success",
          summary: "Venta realizada",
          detail: "La venta se realizó correctamente",
          life: 3000,
        });

        // Limpiar los detalles de la venta después de realizarla
        setSalesDetails([]);
      } else {
        // Manejar el caso en que no se haya seleccionado un cliente o no haya productos en la venta
        throw new Error(
          "Por favor, selecciona un cliente y agrega productos para realizar la venta."
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
    console.log(product.idProducto);
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
    setDialogVisible(false); // Cerrar el diálogo después de seleccionar un cliente
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
            total: (newQuantity * sale.price).toFixed(2), // Redondear a dos decimales
          }
        : sale
    );
    setSalesDetails(updatedSalesDetails);
  };

  const handleDeleteSale = (rowData) => {
    const updatedSalesDetails = salesDetails.filter((sale) => sale !== rowData);
    setSalesDetails(updatedSalesDetails);
  };

  return (
    <div className="">
      <div className="p-d-flex p-jc-center p-mt-5">
        <div className="sales-grid">
          <Toast ref={toast} />

          <Panel header="Buscar Producto" className="p-shadow-4">
            <Button
              className="mb-4"
              label="Seleccionar Producto"
              icon="pi pi-external-link"
              onClick={() => setProductsDialogVisible(true)} // Cambiar el estado para mostrar el diálogo de productos
            />

            <ProductDialog // Diálogo para seleccionar productos
              visible={productsDialogVisible}
              onHide={() => setProductsDialogVisible(false)}
              onSelectProduct={handleProductSelect}
              products={products} // Pasar los productos generados aleatoriamente
            />
            <PersonDialog // Diálogo para seleccionar clientes
              visible={dialogVisible}
              onHide={() => setDialogVisible(false)}
              onSelectPerson={handlePersonSelect}
              persons={persons} // Pasar la lista de personas obtenidas de la API
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
                    onChange={(e) => setSaleType(e.value)}
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
                    onChange={(e) => setSaleType(e.value)}
                    checked={saleType === "factura"}
                  />
                  <label htmlFor="factura" className="mx-2">
                    Factura
                  </label>
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
                  placeholder="Disabled"
                  value={selectedPersonName} // Paso 3: Mostrar el nombre del cliente seleccionado
                />
              </div>
            </Panel>
            <div className="flex justify-content-center flex-wrap">
              <Button
                style={{
                  backgroundColor: "var(--cyan-500)",
                  border: "var(--green-500)",
                }}
                label="Realizar venta"
                icon="pi pi-shopping-cart"
                onClick={handleRealizarVenta} // Llama a la función handleRealizarVenta al hacer clic en el botón
              />
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

const PersonDialog = ({ visible, onHide, onSelectPerson, persons }) => {
  const [searchText, setSearchText] = useState("");
  const filteredPersons = persons.filter((person) =>
    person.nombrePersona.toLowerCase().includes(searchText.toLowerCase())
  );

  const [globalFilter, setGlobalFilter] = useState(null);
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Persons</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </IconField>
    </div>
  );

  return (
    <Dialog
      header="Seleccionar Cliente"
      visible={visible}
      style={{ width: "75vw" }}
      maximizable
      modal
      onHide={onHide}
    >
      <DataTable
        value={filteredPersons}
        selectionMode="single"
        onRowSelect={(e) => onSelectPerson(e.data)}
        dataKey="idPersona"
        header={header}
        paginator
        rows={10}
        emptyMessage="No se encontraron personas"
        globalFilter={globalFilter} // Asegúrate de agregar el filtro global aquí
      >
        <Column field="idPersona" header="Nombre" sortable />
        <Column field="nombrePersona" header="Nombre" sortable />
        <Column field="email" header="Email" />
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

// SalesTable component
const SalesTable = ({ salesDetails, onQuantityChange, onDelete }) => {
  const handleQuantityChange = (rowData, newQuantity) => {
    onQuantityChange(rowData, newQuantity); // Llamamos a la función que maneja el cambio de cantidad
  };
  const subtotal = salesDetails.reduce((total, sale) => {
    return total + sale.quantity * sale.price;
  }, 0);

  const igv = subtotal * 0.18; // Suponiendo que el IGV es el 18% del subtotal
  const descuento = 0; // Puedes calcular el descuento según tus necesidades
  const totalDescuento = subtotal * (descuento / 100); // Descuento total
  const totalPagar = subtotal + igv - totalDescuento; // Total a pagar

  const handleUserDataReceived = (userData) => {
    console.log("Datos del usuario recibidos:", userData);
    console.log("ID: ", userData.idUsuario);
    setId(userData.idUsuario);
  };

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
          footer={"IGV:"} // Redondear a dos decimales
          colSpan={4}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={igv.toFixed(2)} />
      </Row>
      <Row>
        <Column
          footer={"Total:"} // Redondear a dos decimales
          colSpan={4}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={totalPagar.toFixed(2)} />
      </Row>
      <Row>
        <Column
          footer={"Subtotal:"} // Redondear a dos decimales
          colSpan={4}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={subtotal.toFixed(2)} />
      </Row>
      <Row>
        <Column
          footer={"Total descuento:"} // Redondear a dos decimales
          colSpan={4}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={totalDescuento.toFixed(2)} />
      </Row>
      <Row>
        <Column
          footer={"Total Pagar:"} // Redondear a dos decimales
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
                {/* Otro contenido */}
                <DataUsuario onUserDataReceived={handleUserDataReceived} />
                {/* Otro contenido */}
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