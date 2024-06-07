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

import { Row } from "primereact/row";

import "./VentaStyle.css";

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

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totals:"
          colSpan={3}
          footerStyle={{ textAlign: "right" }}
        />
        <Column />
        <Column />
      </Row>
    </ColumnGroup>
  );
  return (
    <div className="">
      <DataTable value={salesDetails} responsiveLayout="scroll">
        <Column
          field="productName"
          style={{ minWidth: "1rem", maxWidth: "7rem" }}
          header="Producto"
          footerGroup={footerGroup}
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
        <Column field="total" header="Total" style={{ maxWidth: "5rem" }} />
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

  // Función para manejar la selección de cliente

  useEffect(() => {
    fetchPersons(); // Cargar clientes cuando el componente se monta
    generateSerieNumero();
    fetchProducts();
  }, []);

  // Función para cargar los clientes desde la API
  const fetchPersons = async () => {
    try {
      const response = await fetch("http://localhost:8080/person");
      const data = await response.json();
      setPersons(data);
    } catch (error) {
      console.error("Error fetching persons:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();
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
      // Verifica si selectedPerson no es null
      if (selectedPerson) {
        // Crear un objeto con los datos de la venta
        const ventaData = {
          idcliente: selectedPerson, // Usar el ID del cliente seleccionado
          idpedido: 4, // Aquí puedes poner el ID del pedido si lo tienes disponible
          idusuario: 1, // ID del usuario que realiza la venta
          idmetodopago: 1, // ID del método de pago (si tienes varios métodos de pago, puedes obtenerlo de algún otro lugar)
          igv: 16.44, // Aquí puedes establecer el valor del IGV si es fijo
          descuento: 0, // Descuento, si lo tienes
          numeroVenta: "0009", // Usar la serie y número generados en el frontend
          serieVenta: "000000009",
          // Otros campos que necesites enviar al backend
          // Asegúrate de que coincidan con los nombres de las propiedades en tu modelo VentaModel
        };

        const response = await fetch("http://localhost:8080/venta", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ventaData),
        });

        if (response.ok) {
          console.log("Venta realizada con éxito:", ventaData);
          // Venta realizada con éxito
          toast.current.show({
            severity: "success",
            summary: "Venta realizada",
            detail: "La venta se realizó correctamente",
            life: 3000,
          });
        } else {
          // Manejar el caso en que la solicitud no sea exitosa
          throw new Error("Error al realizar la venta.");
        }
      } else {
        // Manejar el caso en que no se haya seleccionado un cliente
        throw new Error(
          "Por favor, selecciona un cliente para realizar la venta."
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
  );
};

export default SalesComponent;
