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
import apiClient from "../Security/apiClient";
import Header from "../Header/Header";
import Dashboard from "../Header/Head";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function ProductsDemo() {
  let emptyProduct = {
    idMetodo: "",
    nombreMetodo: "",
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
    fetchMetodoPagos();
  }, []);

  const fetchMetodoPagos = async () => {
    try {
      const data = await apiClient.get(`${URL}/metodopago`);
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (product.nombreMetodo.trim()) {
      let _products = [...products]; // Suponiendo que `products` es el estado que contiene los productos
      let _product = { ...product };
      const method = _product.idMetodo ? "PUT" : "POST";
      const url = _product.idMetodo
        ? `${URL}/metodopago/${_product.idMetodo}`
        : `${URL}/metodopago`;

      try {
        if (method === "PUT") {
          await apiClient.put(url, _product);
        } else {
          await apiClient.post(url, _product);
        }

        fetchMetodoPagos();
        setProducts(_products);
        setProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Método de pago guardado",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al guardar el método de pago:", error);
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
    if (product.idMetodo) {
      try {
        await apiClient.del(`${URL}/metodopago/${product.idMetodo}`);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        fetchMetodoPagos();
        toast.current.show({
          severity: "error",
          summary: "Successful",
          detail: "Método de pago eliminado",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar el método de pago:", error);
      }
    } else if (selectedProducts && selectedProducts.length > 0) {
      try {
        const deletePromises = selectedProducts.map((prod) =>
          apiClient.del(`${URL}/metodopago/${prod.idMetodo}`)
        );
        await Promise.all(deletePromises);
        setDeleteProductDialog(false);
        setSelectedProducts(null);
        fetchMetodoPagos();
        toast.current.show({
          severity: "error",
          summary: "Successful",
          detail: "Métodos de pago eliminados",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar los métodos de pago:", error);
      }
    } else {
      console.error(
        "No se puede eliminar el método de pago. ID de método de pago no encontrado."
      );
    }
  };

  const activateMetodoPago = async (id) => {
    try {
      await apiClient.patch(`${URL}/metodopago/${id}`);
      fetchMetodoPagos();
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Método de pago activado",
        life: 3000,
      });
    } catch (error) {
      console.error("Error al activar el método de pago:", error);
    }
  };

  const activateSelectedMetodoPagos = async () => {
    if (selectedProducts && selectedProducts.length > 0) {
      try {
        const activatePromises = selectedProducts.map((prod) =>
          apiClient.patch(`${URL}/metodopago/${prod.idMetodo}`)
        );
        await Promise.all(activatePromises);
        setSelectedProducts(null);
        fetchMetodoPagos();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Métodos de pago activados",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al activar los métodos de pago:", error);
      }
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
          onClick={activateSelectedMetodoPagos}
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
          icon={rowData.estadoMetodo === "1" ? "pi pi-trash" : "pi pi-check"}
          rounded
          outlined
          severity={rowData.estadoMetodo === "1" ? "danger" : "success"}
          onClick={() => {
            if (rowData.estadoMetodo === "1") {
              confirmDeleteProduct(rowData);
            } else {
              activateMetodoPago(rowData.idMetodo);
            }
          }}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h5 className="m-0 ">Manage Metodo Pago</h5>
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
      "eliminated-row": rowData.estadoMetodo === "0",
    };
  };

  const statusBodyTemplate = (rowData) => {
    const severity = getSeverity(rowData.estadoMetodo);
    return (
      <Tag value={severity === "success"} severity={severity}>
        {severity === "success" ? "Habilitado" : "Deshabilitado"}
      </Tag>
    );
  };

  const getSeverity = (estadoMetodo) => {
    switch (estadoMetodo) {
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
                dataKey="idMetodo"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} cargos"
                globalFilter={globalFilter}
                header={header}
                emptyMessage="No cargos found."
                rowClassName={rowClassName}
              >
                <Column selectionMode="multiple" exportable={false}></Column>
                <Column field="idMetodo" header="ID" sortable></Column>
                <Column
                  field="nombreMetodo"
                  header="Metodo Pago"
                  sortable
                ></Column>
                <Column
                  field="estadoMetodo"
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
              header="Metodo Pagos Details"
              modal
              className="p-fluid"
              footer={productDialogFooter}
              onHide={hideDialog}
            >
              <div className="field">
                <label htmlFor="nombreMetodo">Metodo Pago</label>
                <InputText
                  id="nombreMetodo"
                  value={product.nombreMetodo}
                  onChange={(e) => onInputChange(e, "nombreMetodo")}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && !product.nombreMetodo,
                  })}
                />
                {submitted && !product.nombreMetodo && (
                  <small className="p-error">Metodo Pago is required.</small>
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
                    Are you sure you want to delete the cargo{" "}
                    <b>{product.nombreMetodo}</b>?
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
