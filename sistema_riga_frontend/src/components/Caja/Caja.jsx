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
import { Tag } from "primereact/tag";
import Header from "../Header/Header";
import Dashboard from "../Header/Head";
import apiClient from "../Security/apiClient";
import { Dropdown } from "primereact/dropdown";

import DataUsuario from "../Usuario/DataUsuario";

// Function to fetch Cajas
export const fetchCajas = async () => {
  try {
    const data = await apiClient.get("http://localhost:8080/caja");
    setProducts(data);
  } catch (error) {
    console.error(error);
  }
};

export default function Caja() {
  let emptyProduct = {
    idCaja: "",
    descripcion: "",
    fechaApertura: "",
    fechaCierre: "",
    montoInicial: "",
    montoFinal: "",
    idusuario: "",
  };

  const [products, setProducts] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [closeProductDialog, setCloseProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const [id, setId] = useState("");
  const [sentinela, setSentinela] = useState("");

  useEffect(() => {
    fetchCajas();
    fetchUsuarios();
  }, []);

  const handleUserDataReceived = (userData) => {
    setId(userData.idUsuario);
  };

  const handleCaja = (data) => {
    setSentinela(data);
    console.log(data);
  };

  let emptyCaja = {
    idCaja: "",
    descripcion: "",
    fechaApertura: "",
    fechaCierre: "",
    montoInicial: "",
    montoFinal: "",
    idUsuario: "",
  };

  const [caja, setCaja] = useState(emptyCaja);

  const fetchUsuarios = async () => {
    try {
      const data = await apiClient.get("http://localhost:8080/auth");
      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCajas = async () => {
    if (1 < 2 || data) {
      try {
        const data = await apiClient.get("http://localhost:8080/caja");
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (product.descripcion.trim() && product.montoInicial.trim()) {
      caja.montoInicial = product.montoInicial;
      caja.descripcion = product.descripcion;
      caja.idUsuario = id;

      const method = caja.idCaja ? "PUT" : "POST";
      const url = caja.idCaja
        ? `http://localhost:8080/caja/${caja.idCaja}`
        : "http://localhost:8080/caja";

      try {
        await apiClient[method.toLowerCase()](url, caja);

        fetchCajas();
        setProductDialog(false);
        setCaja(emptyCaja);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Caja guardada",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al guardar la caja:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error.response?.data?.message || "Error al guardar la caja",
          life: 3000,
        });
      }
    }
  };

  const closeCaja = async () => {
    if (product.idCaja) {
      try {
        const response = await apiClient.patch(`http://localhost:8080/caja/cerrar/${product.idCaja}`);
        setCloseProductDialog(false);
        setProduct(emptyProduct);
        fetchCajas();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: response.data,
          life: 3000,
        });
      } catch (error) {
        console.error("Error al cerrar la caja:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error.response?.data?.message || "Error al cerrar la caja",
          life: 3000,
        });
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

  const hideCloseProductDialog = () => {
    setCloseProductDialog(false);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[name] = val;
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

  const LockIcon = ({ open }) => {
    return (
      <i
        className={`pi ${open ? 'pi-lock-open' : 'pi-lock'}`}
        style={{ color: open ? 'green' : 'red' }}
      ></i>
    );
  };
  
  
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        <Button
          icon={<LockIcon open={rowData.estadoCaja === "1"} />}
          rounded
          outlined
          className={`p-button-${rowData.estadoCaja === "1" ? 'success' : 'danger'}`}
          onClick={() => {
            if (rowData.estadoCaja === "1") {
              setProduct(rowData);
              setCloseProductDialog(true);
            } else {
              toast.current.show({
                severity: "warn",
                summary: "Warning",
                detail: "La caja ya está cerrada",
                life: 3000,
              });
            }
          }}
          disabled={rowData.estadoCaja === "0"}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h5 className="m-0 ">Manage Cajas</h5>
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

  const closeProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideCloseProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="info"
        onClick={closeCaja}
      />
    </React.Fragment>
  );

  const rowClassName = (rowData) => {
    return {
      "eliminated-row": rowData.estadoCaja === "0",
    };
  };

  const statusBodyTemplate = (rowData) => {
    const severity = getSeverity(rowData.estadoCaja);
    return (
      <Tag value={severity === "success"} severity={severity}>
        {severity === "success" ? "Abierto" : "Cerrado"}
      </Tag>
    );
  };

  const getSeverity = (estadoCaja) => {
    switch (estadoCaja) {
      case "1":
      case "Habilitado":
        return "success";
      case "0":
        return "danger";
      default:
        return null;
    }
  };
  function updateUsuario(selectedUsuarioId) {
    setProduct((prevProduct) => ({
      ...prevProduct,
      idusuario: selectedUsuarioId,
    }));
  }

  const usuarioBodyTemplate = (rowData) => {
    return rowData.idUsuario;
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
              <div>
                <DataUsuario onUserDataReceived={handleUserDataReceived} />
              </div>
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
                dataKey="idCaja"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Cajas"
                globalFilter={globalFilter}
                header={header}
                emptyMessage="No Cajas found."
                rowClassName={rowClassName}
              >
                <Column selectionMode="multiple" exportable={false}></Column>
                <Column field="idCaja" header="ID" sortable></Column>
                <Column
                  field="descripcion"
                  header="Descripción"
                  sortable
                ></Column>
                <Column
                  field="fechaApertura"
                  header="Fecha Apertura"
                  body={(rowData) => new Date(rowData.fechaApertura).toLocaleString()}
                  sortable
                ></Column>

                <Column
                  field="fechaCierre"
                  header="Fecha Cierre"
                  body={(rowData) => new Date(rowData.fechaCierre).toLocaleString()}
                  sortable
                ></Column>
                <Column
                  field="montoInicial"
                  header="Monto Inicial"
                  sortable
                ></Column>
                <Column
                  field="montoFinal"
                  header="Monto Final"
                  sortable
                ></Column>
                <Column
                  field="idusuario"
                  header="Usuario"
                  body={usuarioBodyTemplate}
                  sortable
                ></Column>
                <Column
                  field="estadoCaja"
                  header="Estado"
                  body={statusBodyTemplate}
                  sortable
                ></Column>
                <Column body={actionBodyTemplate}></Column>
              </DataTable>
            </div>

            <Dialog
              visible={productDialog}
              style={{ width: "450px" }}
              header="Detalles de Caja"
              modal
              className="p-fluid"
              footer={productDialogFooter}
              onHide={hideDialog}
            >
              <div className="field">
                <label htmlFor="descripcion">Descripción</label>
                <InputText
                  id="descripcion"
                  value={product.descripcion}
                  onChange={(e) => onInputChange(e, "descripcion")}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && !product.descripcion,
                  })}
                />
                {submitted && !product.descripcion && (
                  <small className="p-error">Descripción es requerida.</small>
                )}
              </div>

              <div className="field">
                <label htmlFor="montoInicial">Monto Inicial</label>
                <InputText
                  id="montoInicial"
                  value={product.montoInicial}
                  onChange={(e) => onInputChange(e, "montoInicial")}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && !product.montoInicial,
                  })}
                />
                {submitted && !product.montoInicial && (
                  <small className="p-error">Monto Inicial es requerido.</small>
                )}
              </div>
            </Dialog>

            <Dialog
              visible={closeProductDialog}
              style={{ width: "450px" }}
              header="Confirmar Cierre de Caja"
              modal
              className="p-fluid"
              footer={closeProductDialogFooter}
              onHide={hideCloseProductDialog}
            >
              <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                {product && (
                  <span>
                    ¿Está seguro de que desea cerrar la caja <b>{product.descripcion}</b>?
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

