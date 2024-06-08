import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";

import { Dialog } from "primereact/dialog";

import { Tag } from "primereact/tag";

import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { TbArrowZigZag } from "react-icons/tb";



import { FileUpload } from "primereact/fileupload";

import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

import { Image } from "primereact/image";
import "primeicons/primeicons.css";
import apiClient from "../Security/apiClient";

export default function Producto() {
  let emptyProducto = {
    idProducto: "",
    nombreProd: "",
    precioUnit: "",
    imagen: "",
    descripcion: "",
    estadoProducto: "1",
    idCategoria: "",
    idUnidadMedida: "",
    idLinea: "",
    idMarca: "",
  };

  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({
    idProducto: "",
    nombreProd: "",
    precioUnit: "",
    imagen: "",
    descripcion: "",
    estadoProducto: "1",
    idCategoria: "",
    idUnidadMedida: "",
    idLinea: "",
    idMarca: "",
  });


  const getToken = () => {
    return localStorage.getItem('token');
  };
  const token = getToken();
  const [selectedProductos, setSelectedProductos] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const [newProductoDialog, setNewProductoDialog] = useState(false);

  const [deleteProductoDialog, setDeleteProductoDialog] = useState(false);
  const [deleteProductosDialog, setDeleteProductosDialog] = useState(false);

  const [activateProductoDialog, setActivateProductoDialog] = useState(false);

  const [imagen, setImagen] = useState(null);

  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState([]);

  const [unidadmedidas, setUnidadmedidas] = useState([]);
  const [unidadmedida, setUnidadmedida] = useState([]);

  const [lineas, setLineas] = useState([]);
  const [linea, setLinea] = useState([]);

  const [marcas, setMarcas] = useState([]);
  const [marca, setMarca] = useState([]);

  const toast = useRef(null);
  const dt = useRef(null);

  const hideActivateProductoDialog = () => {
    setActivateProductoDialog(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProducto({ ...producto, [id]: value });
  };

  const handleImageChange = (event) => {
    const file = event.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setImagen(reader.result);
    };
    reader.readAsDataURL(file);

    setProducto({ ...producto, imagen: file });
    console.log(file);
  };

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
    fetchUnidadMedidas();
    fetchLineas();
    fetchMarcas();
  }, []);

  const fetchCategorias = async () => {
    try {
      const data = await apiClient.get("http://localhost:8080/categoria");
      setCategorias(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUnidadMedidas = async () => {
    try {
      const data = await apiClient.get("http://localhost:8080/unidadmedida");
      setUnidadmedidas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLineas = async () => {
    try {
      const data = await apiClient.get("http://localhost:8080/linea");
      setLineas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMarcas = async () => {
    try {
      const data = await apiClient.get("http://localhost:8080/marca");
      setMarcas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await fetch("http://localhost:8080/products", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error("Error al obtener productos");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const openNew = () => {
    setProducto(emptyProducto);
    setSubmitted(false);
    setImagen(false);
    setNewProductoDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setNewProductoDialog(false);
  };

  const hideDeleteProductoDialog = () => {
    setDeleteProductoDialog(false);
  };

  const hideDeleteProductosDialog = () => {
    setDeleteProductosDialog(false);
  };

  const confirmDeleteSelected = () => {
    setDeleteProductosDialog(true);
  };

  const saveProducto = async () => {
    setSubmitted(true);
    if (producto.nombreProd.trim() && imagen) {
      // Asegúrate de que haya una imagen seleccionada
      const method = producto.idProducto ? "PUT" : "POST";
      const formData = new FormData();
      formData.append("nombreProd", producto.nombreProd);
      formData.append("precioUnit", producto.precioUnit);

      const imagenFile =
        producto.imagen instanceof File
          ? producto.imagen
          : base64StringToFile(producto.imagen);
      formData.append("imagen", imagenFile);

      console.log("IMAGEN: ", producto.imagen);
      formData.append("descripcion", producto.descripcion);
      formData.append("idCategoria", producto.idCategoria);
      formData.append("idUnidadMedida", producto.idUnidadMedida);
      formData.append("idLinea", producto.idLinea);
      formData.append("idMarca", producto.idMarca);
      const url = producto.idProducto
        ? `http://localhost:8080/products/prueba/${producto.idProducto}`
        : "http://localhost:8080/products/prueba";

      try {
        console.log(formData)
        const response = await fetch(url, {
          method,
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Error al guardar el producto");

        if (producto.idProducto) {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Producto Updated",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Producto Created",
            life: 3000,
          });
        }

        setNewProductoDialog(false);
        fetchProductos();
      } catch (error) {
        console.error(error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Error al guardar el producto",
          life: 3000,
        });
      }
    } else {
      // Manejar el caso en el que no se ha seleccionado ninguna imagen
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Por favor selecciona una imagen",
        life: 3000,
      });
    }
  };

  function base64StringToFile(base64String, fileName = "image.png") {
    // Convertir la cadena base64 a bytes
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Crear un blob a partir de los bytes
    const blob = new Blob([byteArray], { type: "image/png" });

    // Crear un archivo a partir del blob
    const file = new File([blob], fileName, { type: "image/png" });

    return file;
  }

  const editProducto = async (producto) => {
    const imagen64 = `data:image/jpeg;base64,${producto.imagen}`;
    setImagen(imagen64);
    setProducto(producto);
    setNewProductoDialog(true);

    // Fetch the data for the dropdowns to make sure they are populated
    await fetchCategorias();
    await fetchUnidadMedidas();
    await fetchLineas();
    await fetchMarcas();

    // Set the selected values for each dropdown
    setCategoria(producto.idCategoria);
    setUnidadmedida(producto.idUnidadMedida);
    setLinea(producto.idLinea);
    setMarca(producto.idMarca);
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`data:image/jpeg;base64,${rowData.imagen}`}
        alt={rowData.imagen}
        className="shadow-2 border-round"
        style={{ width: "64px" }}
      />
    );
  };

  const activateProducto = async (rowData) => {
    if (rowData.idProducto) {
      try {
        const response = await fetch(
          `http://localhost:8080/products/${rowData.idProducto}`,
          {
            method: "PATCH",
          }
        );
        if (!response.ok) throw new Error("Error al actualizar el producto");
        setProducto(emptyProducto);
        fetchProductos();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Producto Actualizado",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
      }
    } else if (selectedProductos && selectedProductos.length > 0) {
      try {
        const activatePromises = selectedProductos.map((producto) =>
          fetch(`http://localhost:8080/products/${producto.idProducto}`, {
            method: "PATCH",
          })
        );
        await Promise.all(activatePromises);
        setSelectedProductos(null);
        fetchProductos();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Productos activadas",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al activar los productos:", error);
      }
    }
  };

  const confirmDeleteProducto = (producto) => {
    setProducto(producto);
    setDeleteProductoDialog(true);
  };

  const deleteProducto = async () => {
    if (producto.idProducto) {
      try {
        const response = await fetch(
          `http://localhost:8080/products/${producto.idProducto}`,
          { method: "DELETE" }
        );
        if (!response.ok) throw new Error("Error al eliminar el producto");
        setDeleteProductoDialog(false);
        setProducto(emptyProducto);
        fetchProductos();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Producto Eliminado",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    } else if (selectedProductos && selectedProductos.length > 0) {
      try {
        const deletePromises = selectedProductos.map((producto) =>
          fetch(`http://localhost:8080/products/${producto.idProducto}`, {
            method: "DELETE",
          })
        );
        await Promise.all(deletePromises);
        setDeleteProductoDialog(false);
        setSelectedProductos(null);
        fetchProductos();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Productos Eliminados",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar los productos:", error);
      }
    } else {
      console.error(
        "No se puede eliminar el producto. ID de producto no encontrado."
      );
    }
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const activateProductoDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideActivateProductoDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="success"
        onClick={activateProducto}
      />
    </React.Fragment>
  );

  const deleteSelectedProductos = () => {
    setDeleteProductosDialog(false);
    setSelectedProductos([]);
    deleteProducto();
  };

  const deleteProductoDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductoDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProducto}
      />
    </React.Fragment>
  );

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
          disabled={!selectedProductos || !selectedProductos.length}
        />{" "}
        <Button
          label="Activar"
          icon="pi pi-check"
          severity="info"
          onClick={activateProducto}
          disabled={!selectedProductos || !selectedProductos.length}
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
          className="mr-3"
          onClick={() => {
            editProducto(rowData);
          }}
        />
        <Button
          icon={rowData.estadoProducto === "1" ? "pi pi-trash" : "pi pi-check"}
          rounded
          outlined
          severity={rowData.estadoProducto === "1" ? "danger" : "success"}
          onClick={() => {
            if (rowData.estadoProducto === "1") {
              confirmDeleteProducto(rowData);
            } else {
              activateProducto(rowData);
            }
          }}
        />
      </React.Fragment>
    );
  };

  const getSeverity = (producto) => {
    switch (producto.estadoProducto) {
      case "1":
        return "success";

      case "2":
        return "warning";

      default:
        return null;
    }
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag severity={getSeverity(rowData)}>
        {rowData.estadoProducto === "1" ? "HABILITADO" : "INHABILITADO"}
      </Tag>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Productos</h4>
    </div>
  );

  const productoDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProducto} />
    </React.Fragment>
  );

  const deleteProductosDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductosDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProductos}
      />
    </React.Fragment>
  );

  const getCategoriaName = (idCategoria) => {
    const categoria = categorias.find((cat) => cat.idCategoria === idCategoria);
    return categoria ? categoria.nombreCategoria : "";
  };

  const getUnidadMedidaName = (idUnidadMedida) => {
    const unidadMedida = unidadmedidas.find(
      (um) => um.idUnidadMedida === idUnidadMedida
    );
    return unidadMedida ? unidadMedida.nombreUnidadMedida : "";
  };

  const getLineaName = (idLinea) => {
    const linea = lineas.find((l) => l.idLinea === idLinea);
    return linea ? linea.nombreLinea : "";
  };

  const getMarcaName = (idMarca) => {
    const marca = marcas.find((m) => m.idMarca === idMarca);
    return marca ? marca.nombreMarca : "";
  };

  return (
    <div className="">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={dt}
            value={productos}
            selection={selectedProductos}
            onSelectionChange={(e) => setSelectedProductos(e.value)}
            dataKey="idProducto"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} productos"
            header={header}
            responsiveLayout="scroll"
          >
            <Column selectionMode="multiple" exportable={false}></Column>
            <Column field="idProducto" header="ID" sortable></Column>
            <Column field="nombreProd" header="NOMBRE" sortable></Column>
            <Column field="precioUnit" header="PRECIO" sortable></Column>
            <Column
              field="imagen"
              body={imageBodyTemplate}
              header="IMAGEN"
              sortable
            ></Column>
            <Column field="descripcion" header="DESCRIPCIÓN" sortable></Column>
            <Column
              field="estadoProducto"
              header="ESTADO"
              sortable
              body={statusBodyTemplate}
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="idCategoria"
              header="CATEGORIA"
              sortable
              body={(rowData) => getCategoriaName(rowData.idCategoria)}
              style={{ minWidth: "1rem" }}
            ></Column>
            <Column
              field="idUnidadMedida"
              header="UNIDAD MEDIDA"
              sortable
              body={(rowData) => getUnidadMedidaName(rowData.idUnidadMedida)}
              style={{ minWidth: "1rem" }}
            ></Column>
            <Column
              field="idLinea"
              header="LINEA"
              sortable
              body={(rowData) => getLineaName(rowData.idLinea)}
              style={{ minWidth: "1rem" }}
            ></Column>
            <Column
              field="idMarca"
              header="MARCA"
              sortable
              body={(rowData) => getMarcaName(rowData.idMarca)}
              style={{ minWidth: "1rem" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>

          <Dialog
            visible={newProductoDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Registro Producto"
            modal
            className="p-fluid"
            footer={productoDialogFooter}
            onHide={hideDialog}
          >
            <div className="field">
              <label className="font-bold" htmlFor="nombreProd">
                Nombre
              </label>
              <InputText
                id="nombreProd"
                value={producto.nombreProd}
                onChange={handleInputChange}
                required
                className={classNames({
                  "p-invalid": submitted && !producto.nombreProd,
                })}
              />
              {submitted && !producto.nombreProd && (
                <small className="p-error">Nombre es requerido.</small>
              )}
            </div>

            <div className="field">
              <label className="font-bold" htmlFor="precioUnit">
                Precio
              </label>
              <InputText
                id="precioUnit"
                value={producto.precioUnit}
                onChange={handleInputChange}
                required
                className={classNames({
                  "p-invalid": submitted && !producto.precioUnit,
                })}
              />
              {submitted && !producto.precioUnit && (
                <small className="p-error">Precio es requerido.</small>
              )}
            </div>

            <div className="field">
              <label className="font-bold" htmlFor="precioUnit">
                Imagen
              </label>
              <FileUpload
                mode="basic"
                accept="image/*"
                onSelect={handleImageChange}
              />
              <div>
                <h4>Imagen Seleccionada:</h4>
                <Image
                  src={imagen}
                  alt="Imagen seleccionada"
                  width={230}
                  preview
                />{" "}
              </div>
            </div>

            <div className="field">
              <label className="font-bold" htmlFor="descripcion">
                Descripción
              </label>
              <InputText
                id="descripcion"
                value={producto.descripcion}
                onChange={handleInputChange}
                required
                className={classNames({
                  "p-invalid": submitted && !producto.descripcion,
                })}
              />
              {submitted && !producto.descripcion && (
                <small className="p-error">Descripción es requerido.</small>
              )}
            </div>

            <div className="field">
              <label className="font-bold" htmlFor="idCategoria">
                Categoria
              </label>
              <Dropdown
                id="idCategoria"
                value={producto.idCategoria}
                options={categorias.map((cat) => ({
                  label: cat.nombreCategoria,
                  value: cat.idCategoria,
                }))}
                onChange={(e) => {
                  setProducto((prevProducto) => ({
                    ...prevProducto,
                    idCategoria: e.value,
                  }));
                }}
                placeholder="Seleccione una categoria"
              />
              {submitted && !producto.idCategoria && (
                <small className="p-error">Categoria es requerido.</small>
              )}
            </div>

            <div className="field">
              <label className="font-bold" htmlFor="idUnidadMedida">
                Unidad Medida
              </label>
              <Dropdown
                id="idUnidadMedida"
                value={producto.idUnidadMedida}
                options={unidadmedidas.map((unid) => ({
                  label: unid.nombreUnidadMedida,
                  value: unid.idUnidadMedida,
                }))}
                onChange={(e) => {
                  setProducto((prevProducto) => ({
                    ...prevProducto,
                    idUnidadMedida: e.value,
                  }));
                }}
                placeholder="Seleccione una unidad de medida"
              />
              {submitted && !producto.idUnidadMedida && (
                <small className="p-error">Unidad Medida es requerido.</small>
              )}
            </div>

            <div className="field">
              <label className="font-bold" htmlFor="idLinea">
                Linea
              </label>
              <Dropdown
                id="idLinea"
                value={producto.idLinea}
                options={lineas.map((lin) => ({
                  label: lin.nombreLinea,
                  value: lin.idLinea,
                }))}
                onChange={(e) => {
                  setProducto((prevProducto) => ({
                    ...prevProducto,
                    idLinea: e.value,
                  }));
                }}
                placeholder="Seleccione una linea"
              />
              {submitted && !producto.idLinea && (
                <small className="p-error">Linea es requerido.</small>
              )}
            </div>
            <div className="field">
              <label className="font-bold" htmlFor="idMarca">
                Marca
              </label>
              <Dropdown
                id="idMarca"
                value={producto.idMarca}
                options={marcas.map((marc) => ({
                  label: marc.nombreMarca,
                  value: marc.idMarca,
                }))}
                onChange={(e) => {
                  setProducto((prevProducto) => ({
                    ...prevProducto,
                    idMarca: e.value,
                  }));
                }}
                placeholder="Seleccione una marca"
              />
              {submitted && !producto.idMarca && (
                <small className="p-error">Marca es requerido.</small>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteProductoDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Confirm"
            modal
            footer={deleteProductoDialogFooter}
            onHide={hideDeleteProductoDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {producto && (
                <span>
                  Are you sure you want to delete <b>{producto.nombreProd}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={activateProductoDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Confirm"
            modal
            footer={activateProductoDialogFooter}
            onHide={activateProductoDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {producto && (
                <span>
                  Are you sure you want to activate <b>{producto.nombreProd}</b>
                  ?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteProductosDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Confirm"
            modal
            footer={deleteProductosDialogFooter}
            onHide={hideDeleteProductosDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {producto && (
                <span>
                  Are you sure you want to delete the selected products?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}