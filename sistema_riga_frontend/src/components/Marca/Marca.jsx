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

export default function ProductsDemo() {
  let emptyProduct = {
    idMarca: "",
    nombreMarca: "",
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
    fetchMarcas();
  }, []);

  const fetchMarcas = async () => {
    try {
      const data = await apiClient.get("http://localhost:8080/marca");
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (product.nombreMarca.trim()) {
      const method = product.idMarca ? "PUT" : "POST";
      const url = product.idMarca
        ? `http://localhost:8080/marca/${product.idMarca}`
        : "http://localhost:8080/marca";

      try {
        await apiClient[method.toLowerCase()](url, product);
        fetchMarcas();
        setProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "marca guardada",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al guardar la marca:", error);
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
    if (product.idMarca) {
      try {
        await apiClient.del(
          `http://localhost:8080/marca/${product.idMarca}`,
          "DELETE"
        );
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        fetchMarcas();
        toast.current.show({
          severity: "error",
          summary: "Successful",
          detail: "marca Eliminada",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar la marca:", error);
      }
    } else if (selectedProducts && selectedProducts.length > 0) {
      try {
        const deletePromises = selectedProducts.map((prod) =>
          apiClient.del(`http://localhost:8080/marca/${prod.idMarca}`, "DELETE")
        );
        await Promise.all(deletePromises);
        setDeleteProductDialog(false);
        setSelectedProducts(null);
        fetchMarcas();
        toast.current.show({
          severity: "error",
          summary: "Successful",
          detail: "marca Eliminadas",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar las marca:", error);
      }
    } else {
      console.error(
        "No se puede eliminar la marca. ID de marca no encontrado."
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

  const activateMarca = async (id) => {
    try {
      await apiClient.patch(`http://localhost:8080/marca/${id}`);
      fetchMarcas();
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Marca Activado",
        life: 3000,
      });
    } catch (error) {
      console.error("Error al activar el marca:", error);
    }
  };

  const activateSelectedMarcas = async () => {
    if (selectedProducts && selectedProducts.length > 0) {
      try {
        const activatePromises = selectedProducts.map((prod) =>
          apiClient.patch(`http://localhost:8080/marca/${prod.idMarca}`)
        );
        await Promise.all(activatePromises);
        setSelectedProducts(null);
        fetchMarcas();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "marca Activados",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al activar los marca:", error);
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
          onClick={activateSelectedMarcas}
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
          icon={rowData.estadoMarca === "1" ? "pi pi-trash" : "pi pi-check"}
          rounded
          outlined
          severity={rowData.estadoMarca === "1" ? "danger" : "success"}
          onClick={() => {
            if (rowData.estadoMarca === "1") {
              confirmDeleteProduct(rowData);
            } else {
              activateMarca(rowData.idMarca);
            }
          }}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h5 className="m-0 ">Manage Marcas</h5>
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
      "eliminated-row": rowData.estadoMarca === "0",
    };
  };

  const statusBodyTemplate = (rowData) => {
    const severity = getSeverity(rowData.estadoMarca);
    return (
      <Tag value={severity === "success"} severity={severity}>
        {severity === "success" ? "Habilitado" : "Deshabilitado"}
      </Tag>
    );
  };

  const getSeverity = (estadoMarca) => {
    switch (estadoMarca) {
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
                dataKey="idMarca"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Marcas"
                globalFilter={globalFilter}
                header={header}
                emptyMessage="No Marcas found."
                rowClassName={rowClassName}
              >
                <Column selectionMode="multiple" exportable={false}></Column>
                <Column field="idMarca" header="ID" sortable></Column>
                <Column
                  field="nombreMarca"
                  header="Nombre Marca"
                  sortable
                ></Column>
                <Column
                  field="estadoMarca"
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
              header="Marcas Details"
              modal
              className="p-fluid"
              footer={productDialogFooter}
              onHide={hideDialog}
            >
              <div className="field">
                <label htmlFor="nombreMarca">Nombre Marcas</label>
                <InputText
                  id="nombreMarca"
                  value={product.nombreMarca}
                  onChange={(e) => onInputChange(e, "nombreMarca")}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && !product.nombreMarca,
                  })}
                />
                {submitted && !product.nombreMarca && (
                  <small className="p-error">Nombre Marca is required.</small>
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
                    Are you sure you want to delete the Marca{" "}
                    <b>{product.nombreMarca}</b>?
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
