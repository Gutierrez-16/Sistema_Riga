import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Tag } from "primereact/tag";
import Header from "../Header/Header";
import Dashboard from "../Header/Head";
import apiClient from "../Security/apiClient";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function ProductsDemo() {
  let emptyProduct = {
    idTipoUsuario: "",
    nombreTipoUsuario: "",
  };

  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    fetchTipoUsuarios();
  }, []);

  const fetchTipoUsuarios = async () => {
    try {
      const data = await apiClient.get(`${URL}/tipousuario`);
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (product.nombreTipoUsuario.trim()) {
      const method = product.idTipoUsuario ? "PUT" : "POST";
      const url = product.idTipoUsuario
        ? `${URL}/tipousuario/${product.idTipoUsuario}`
        : `${URL}/tipousuario`;

      try {
        await apiClient[method.toLowerCase()](url, product);
        fetchTipoUsuarios();
        setProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "tipousuario guardada",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al guardar la tipousuario:", error);
      }
    }
  };

  const handleEdit = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    if (product.idTipoUsuario) {
      try {
        await apiClient.del(
          `${URL}/tipousuario/${product.idTipoUsuario}`,
          "DELETE"
        );
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        fetchTipoUsuarios();
        toast.current.show({
          severity: "error",
          summary: "Successful",
          detail: "tipousuario Eliminada",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar la tipousuario:", error);
      }
    } else if (selectedProducts && selectedProducts.length > 0) {
      try {
        const deletePromises = selectedProducts.map((prod) =>
          apiClient.del(`${URL}/tipousuario/${prod.idTipoUsuario}`, "DELETE")
        );
        await Promise.all(deletePromises);
        setDeleteProductDialog(false);
        setSelectedProducts(null);
        fetchTipoUsuarios();
        toast.current.show({
          severity: "error",
          summary: "Successful",
          detail: "tipousuario Eliminadas",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar las tipousuario:", error);
      }
    } else {
      console.error(
        "No se puede eliminar la tipousuario. ID de tipousuario no encontrado."
      );
    }
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;
    setProduct(_product);
  };

  const activateTipoUsuario = async (id) => {
    try {
      await apiClient.patch(`${URL}/tipousuario/${id}`);
      fetchTipoUsuarios();
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "TipoUsuario Activado",
        life: 3000,
      });
    } catch (error) {
      console.error("Error al activar el TipoUsuario:", error);
    }
  };

  const activateSelectedTipoUsuarios = async () => {
    if (selectedProducts && selectedProducts.length > 0) {
      try {
        const activatePromises = selectedProducts.map((prod) =>
          apiClient.patch(`${URL}/tipousuario/${prod.idTipoUsuario}`)
        );
        await Promise.all(activatePromises);
        setSelectedProducts(null);
        fetchTipoUsuarios();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "TipoUsuarios Activados",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al activar los TipoUsuarios:", error);
      }
    }
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="info"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => confirmDeleteProduct(selectedProducts)}
          disabled={!selectedProducts || !selectedProducts.length}
        />
        <Button
          label="Activate"
          icon="pi pi-check"
          className="p-button-success"
          onClick={activateSelectedTipoUsuarios}
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
        onClick={() => dt.current.exportCSV()}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-3"
          onClick={() => handleEdit(rowData)}
        />
        <Button
          icon={
            rowData.estadoTipoUsuario === "1" ? "pi pi-trash" : "pi pi-check"
          }
          rounded
          outlined
          severity={rowData.estadoTipoUsuario === "1" ? "danger" : "success"}
          onClick={() => {
            if (rowData.estadoTipoUsuario === "1") {
              confirmDeleteProduct(rowData);
            } else {
              activateTipoUsuario(rowData.idTipoUsuario);
            }
          }}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h5 className="m-0 ">Manage TipoUsuarios</h5>
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

  const rowClassName = (rowData) => {
    return {
      "eliminated-row": rowData.estadoTipoUsuario === "0",
    };
  };

  const statusBodyTemplate = (rowData) => {
    const severity = getSeverity(rowData.estadoTipoUsuario);
    return (
      <Tag value={severity === "success"} severity={severity}>
        {severity === "success" ? "Habilitado" : "Deshabilitado"}
      </Tag>
    );
  };

  const getSeverity = (estadoTipoUsuario) => {
    switch (estadoTipoUsuario) {
      case "1":
      case "Habilitado":
        return "success";
      case "0":
        return "warning";
      default:
        return null;
    }
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
              <Toolbar
                className="mb-4"
                left={leftToolbarTemplate}
                right={rightToolbarTemplate}
              ></Toolbar>
              <DataTable
                ref={dt}
                value={products}
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey="idTipoUsuario"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} TipoUsuarios"
                globalFilter={globalFilter}
                header={header}
                emptyMessage="No TipoUsuarios found."
                rowClassName={rowClassName}
              >
                <Column selectionMode="multiple" exportable={false}></Column>
                <Column field="idTipoUsuario" header="ID" sortable></Column>
                <Column
                  field="nombreTipoUsuario"
                  header="Nombre TipoUsuario"
                  sortable
                ></Column>
                <Column
                  field="estadoTipoUsuario"
                  header="Estado"
                  body={statusBodyTemplate}
                  sortable
                ></Column>
                <Column body={actionBodyTemplate} exportable={false}></Column>
              </DataTable>
            </div>

            <Dialog
              visible={productDialog}
              style={{ width: "450px" }}
              header="TipoUsuarios Details"
              modal
              className="p-fluid"
              footer={productDialogFooter}
              onHide={hideDialog}
            >
              <div className="field">
                <label htmlFor="nombreTipoUsuario">Nombre TipoUsuarios</label>
                <InputText
                  id="nombreTipoUsuario"
                  value={product.nombreTipoUsuario}
                  onChange={(e) => onInputChange(e, "nombreTipoUsuario")}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && !product.nombreTipoUsuario,
                  })}
                />
                {submitted && !product.nombreTipoUsuario && (
                  <small className="p-error">
                    Nombre TipoUsuario is required.
                  </small>
                )}
              </div>
            </Dialog>

            <Dialog
              visible={deleteProductDialog}
              style={{ width: "450px" }}
              header="Confirm"
              modal
              footer={deleteProductDialogFooter}
              onHide={hideDeleteProductDialog}
            >
              <div className="flex align-items-center justify-content-center">
                <i
                  className="pi pi-exclamation-triangle mr-3"
                  style={{ fontSize: "2rem" }}
                />
                {product && (
                  <span>
                    Are you sure you want to delete the TipoUsuario{" "}
                    <b>{product.nombreTipoUsuario}</b>?
                  </span>
                )}
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
