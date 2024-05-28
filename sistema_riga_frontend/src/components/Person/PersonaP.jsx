import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

import "primeicons/primeicons.css";

export default function ProductsDemo() {
  let emptyProduct = {
    idPersona: "",
    dni: "",
    nombrePersona: "",
    apePaterno: "",
    apeMaterno: "",
    correo: "",
    celular: "",
    direccion: "",
    departamento: "",
    provincia: "",
    distrito: "",
  };

  const [products, setProducts] = useState([]);

  const [departamentos, setDepartamentos] = useState([]);
  const [departamento, setDepartamento] = useState([]);

  const [provincias, setProvincias] = useState([]);
  const [provincia, setProvincia] = useState([]);

  const [distritos, setDistritos] = useState([]);
  const [distrito, setDistrito] = useState([]);

  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

  const [product, setProduct] = useState({
    idPersona: "",
    dni: "",
    nombrePersona: "",
    apePaterno: "",
    apeMaterno: "",
    genero: "",
    fechaNac: "",
    correo: "",
    celular: "",
    direccion: "",
    departamento: "",
    provincia: "",
    distrito: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProduct({ ...product, [id]: value });
  };

  const comboEdit = async (idDistrito) => {
    try {
      const provinciaResponse = await fetch(
        `http://localhost:8080/provincia/distrito/${idDistrito}`
      );
      if (!provinciaResponse.ok) {
        throw new Error("Error al obtener la provincia");
      }
      const provinciaData = await provinciaResponse.json();
      const provinciaNombre = provinciaData.nombreProvincia;

      const departamentoResponse = await fetch(
        `http://localhost:8080/departamento/provincia/${provinciaNombre}`
      );
      if (!departamentoResponse.ok)
        throw new Error("Error al obtener departamentos");

      const departamentoData = await departamentoResponse.json();

      setProduct((prevFormData) => ({
        ...prevFormData,
        idDistrito: product.distrito,

        idProvincia: provinciaData.idProvincia,
        idDepartamento: departamentoData.idDepartamento,
      }));

      await fetchProvincias(departamentoData.idDepartamento);
      await fetchDistritos(provinciaData.idProvincia);
      setDistrito(idDistrito);
    } catch (error) {
      console.error("Error al obtener provincias o departamentos:", error);
    }
  };

  useEffect(() => {
    fetchPersonas();
    fetchDepartamentos();
  }, []);

  const fetchPersonas = async () => {
    try {
      const response = await fetch("http://localhost:8080/person");
      if (!response.ok) throw new Error("Error al obtener personas");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDepartamentos = async () => {
    try {
      const response = await fetch("http://localhost:8080/departamento");
      if (!response.ok) throw new Error("Error al obtener departamentos");
      const data = await response.json();
      setDepartamentos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProvincias = async (idDepartamento) => {
    try {
      setDepartamento(idDepartamento);
      const response = await fetch(
        `http://localhost:8080/provincia/departamento/${idDepartamento}`
      );
      if (!response.ok) throw new Error("Error al obtener provincias");
      const data = await response.json();
      setProvincias(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDistritos = async (idProvincia) => {
    try {
      setProvincia(idProvincia);

      const response = await fetch(
        `http://localhost:8080/distrito/provincia/${idProvincia}`
      );
      if (!response.ok) throw new Error("Error al obtener distritos");
      const data = await response.json();
      setDistritos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
    setDepartamento(false);
    setProvincia(false);
    setDistrito(false);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    console.log(product.nombrePersona);
    console.log(product.dni);
    console.log(product.apePaterno);
    console.log(product.apeMaterno);
    console.log(product.correo);
    console.log(product.celular);
    console.log(product.direccion);

    if (product.nombrePersona.trim()) {
      console.log(product.nombrePersona);
      if (product.idPersona) {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = async (product) => {
    setProductDialog(true);
    comboEdit(product.idDistrito);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    setDeleteProductsDialog(false);
    setSelectedProducts([]);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />{" "}
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Products</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText type="search" placeholder="Search..." />
      </IconField>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={products}
          dataKey="idPersona"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
        >
          <Column
            field="idPersona"
            header="ID"
            sortable
            style={{ minWidth: "1rem" }}
          ></Column>
          <Column
            field="dni"
            header="DNI"
            sortable
            style={{ minWidth: "7rem" }}
          ></Column>
          <Column
            field="nombrePersona"
            header="Nombre"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="apePaterno"
            header="Paterno"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="apeMaterno"
            header="Materno"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="genero"
            header="Genero"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="fechaNac"
            header="Fecha"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="correo"
            header="Correo"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="celular"
            header="Celular"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="direccion"
            header="Direccion"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="estadoPersona"
            header="ESTADO"
            sortable
            style={{ minWidth: "1rem" }}
          ></Column>
          <Column
            field="idDistrito"
            header="Distrito"
            sortable
            style={{ minWidth: "1rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Detalles de Empresa"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="nombrePersona">
          <label htmlFor="nombrePersona" className="font-bold">
            Nombre
          </label>
          <InputText
            id="nombrePersona"
            value={product.nombrePersona}
            onChange={handleInputChange}
            className={classNames({
              "p-invalid": submitted && !product.nombrePersona,
            })}
          />
        </div>
        <div className="dni">
          <label htmlFor="dni" className="font-bold">
            DNI
          </label>
          <InputText
            id="dni"
            value={product.dni}
            onChange={handleInputChange}
            required
            className={classNames({
              "p-invalid": submitted && !product.dni,
            })}
          />
          {submitted && !product.dni && (
            <small className="p-error">DNI es requerido.</small>
          )}
        </div>

        <div className="apePaterno">
          <label htmlFor="apePaterno" className="font-bold">
            Apellido Paterno
          </label>
          <InputText
            id="apePaterno"
            value={product.apePaterno}
            onChange={handleInputChange}
            required
            className={classNames({
              "p-invalid": submitted && !product.apePaterno,
            })}
          />
          {submitted && !product.apePaterno && (
            <small className="p-error">Apellido Paterno es requerido.</small>
          )}
        </div>

        <div className="apeMaterno">
          <label htmlFor="apeMaterno" className="font-bold">
            Apellido Materno
          </label>
          <InputText
            id="apeMaterno"
            value={product.apeMaterno}
            onChange={handleInputChange}
            required
            className={classNames({
              "p-invalid": submitted && !product.apeMaterno,
            })}
          />
          {submitted && !product.apeMaterno && (
            <small className="p-error">Apellido Materno es requerido.</small>
          )}
        </div>

        <div className="correo">
          <label htmlFor="correo" className="font-bold">
            Correo
          </label>
          <InputText
            id="correo"
            value={product.correo}
            onChange={handleInputChange}
            required
            className={classNames({
              "p-invalid": submitted && !product.correo,
            })}
          />
          {submitted && !product.correo && (
            <small className="p-error">Correo es requerido.</small>
          )}
        </div>

        <div className="celular">
          <label htmlFor="celular" className="font-bold">
            Celular
          </label>
          <InputText
            id="celular"
            value={product.celular}
            onChange={handleInputChange}
            required
            className={classNames({
              "p-invalid": submitted && !product.celular,
            })}
          />
          {submitted && !product.celular && (
            <small className="p-error">Celular es requerido.</small>
          )}
        </div>

        <div className="direccion">
          <label htmlFor="direccion" className="font-bold">
            Dirección
          </label>
          <InputText
            id="direccion"
            value={product.direccion}
            onChange={handleInputChange}
            required
            className={classNames({
              "p-invalid": submitted && !product.direccion,
            })}
          />
          {submitted && !product.direccion && (
            <small className="p-error">Dirección es requerida.</small>
          )}
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="idDepartamento" className="font-bold">
              Departamento
            </label>
            <Dropdown
              id="idDepartamento"
              value={departamento}
              options={departamentos}
              onChange={(e) => {
                setDepartamento(e.value);
                fetchProvincias(e.value);
                console.log(e.value);
              }}
              optionLabel="nombreDepartamento"
              optionValue="idDepartamento"
              placeholder="Selecciona un departamento"
            />
          </div>
          <div className="field col">
            <label htmlFor="idProvincia" className="font-bold">
              Provincia
            </label>
            <Dropdown
              id="idProvincia"
              value={provincia}
              options={provincias}
              onChange={(e) => {
                setProvincia(e.value);
                fetchDistritos(e.value);
              }}
              optionLabel="nombreProvincia"
              optionValue="idProvincia"
              placeholder="Selecciona una provincia"
            />
          </div>
          <div className="field col">
            <label htmlFor="idDistrito" className="font-bold">
              Distrito
            </label>
            <Dropdown
              id="idDistrito"
              value={distrito}
              options={distritos}
              onChange={(e) => {
                setDistrito(e.value);
                console.log(e.value);
              }}
              optionLabel="nombreDistrito"
              optionValue="idDistrito"
              placeholder="Selecciona un distrito"
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.razonSocial}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
