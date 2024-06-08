import React, { useState, useEffect, useRef, useContext } from "react";
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

export default function ProductsDemo() {
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
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    fetchCajas();
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await apiClient.get("http://localhost:8080/auth");
      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCajas = async () => {
    try {
      const { data } = await apiClient.get("http://localhost:8080/caja");
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (
      product.descripcion.trim() &&
      product.fechaApertura.trim() &&
      product.fechaCierre.trim() &&
      product.montoInicial.trim() &&
      product.montoFinal.trim() &&
      product.idusuario
    ) {
      const method = product.idCaja ? "PUT" : "POST";
      const url = product.idCaja
        ? `http://localhost:8080/caja/${product.idCaja}`
        : "http://localhost:8080/caja";

      try {
        await apiClient[method.toLowerCase()](url, product);
        fetchCajas();
        setProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Caja guardada",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al guardar la caja:", error);
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
    if (product.idCaja) {
      try {
        await apiClient.delete(`http://localhost:8080/caja/${product.idCaja}`);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        fetchCajas();
        toast.current.show({
          severity: "error",
          summary: "Successful",
          detail: "Caja eliminada",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar la caja:", error);
      }
    } else if (selectedProducts && selectedProducts.length > 0) {
      try {
        const deletePromises = selectedProducts.map((prod) =>
          apiClient.delete(`http://localhost:8080/caja/${prod.idCaja}`)
        );
        await Promise.all(deletePromises);
        setDeleteProductDialog(false);
        setSelectedProducts(null);
        fetchCajas();
        toast.current.show({
          severity: "error",
          summary: "Successful",
          detail: "Cajas eliminadas",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar las cajas:", error);
      }
    } else {
      console.error("No se puede eliminar la caja. ID de caja no encontrado.");
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
    _product[name] = val;
    setProduct(_product);
  };

  const activateCaja = async (id) => {
    try {
      await apiClient.patch(`http://localhost:8080/caja/${id}`);
      fetchCajas();
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Caja activada",
        life: 3000,
      });
    } catch (error) {
      console.error("Error al activar la caja:", error);
    }
  };

  const activateSelectedCajas = async () => {
    if (selectedProducts && selectedProducts.length > 0) {
      try {
        const activatePromises = selectedProducts.map((prod) =>
          apiClient.patch(`http://localhost:8080/caja/${prod.idCaja}`)
        );
        await Promise.all(activatePromises);
        setSelectedProducts(null);
        fetchCajas();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Cajas activadas",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al activar las cajas:", error);
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
          onClick={activateSelectedCajas}
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
          icon={rowData.estadoCaja === "1" ? "pi pi-trash" : "pi pi-check"}
          rounded
          outlined
          severity={rowData.estadoCaja === "1" ? "danger" : "success"}
          onClick={() => {
            if (rowData.estadoCaja === "1") {
              confirmDeleteProduct(rowData);
            } else {
              activateCaja(rowData.idCaja);
            }
          }}
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
      "eliminated-row": rowData.estadoCaja === "0",
    };
  };

  const statusBodyTemplate = (rowData) => {
    const severity = getSeverity(rowData.estadoCaja);
    return (
      <Tag value={severity === "success"} severity={severity}>
        {severity === "success" ? "Habilitado" : "Deshabilitado"}
      </Tag>
    );
  };

  const getSeverity = (estadoCaja) => {
    switch (estadoCaja) {
      case "1":
      case "Habilitado":
        return "success";
      case "0":
        return "warning";
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
    const usuario = usuarios.find(
      (usuario) => usuario.idusuario === rowData.idusuario
    );
    return usuario ? usuario.username : rowData.idusuario;
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
                  sortable
                ></Column>
                <Column
                  field="fechaCierre"
                  header="Fecha Cierre"
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
                <Column body={actionBodyTemplate} exportable={false}></Column>
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
                <label htmlFor="fechaApertura">Fecha Apertura</label>
                <InputText
                  id="fechaApertura"
                  value={product.fechaApertura}
                  onChange={(e) => onInputChange(e, "fechaApertura")}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && !product.fechaApertura,
                  })}
                />
                {submitted && !product.fechaApertura && (
                  <small className="p-error">
                    Fecha Apertura es requerida.
                  </small>
                )}
              </div>
              <div className="field">
                <label htmlFor="fechaCierre">Fecha Cierre</label>
                <InputText
                  id="fechaCierre"
                  value={product.fechaCierre}
                  onChange={(e) => onInputChange(e, "fechaCierre")}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && !product.fechaCierre,
                  })}
                />
                {submitted && !product.fechaCierre && (
                  <small className="p-error">Fecha Cierre es requerida.</small>
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
              <div className="field">
                <label htmlFor="montoFinal">Monto Final</label>
                <InputText
                  id="montoFinal"
                  value={product.montoFinal}
                  onChange={(e) => onInputChange(e, "montoFinal")}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && !product.montoFinal,
                  })}
                />
                {submitted && !product.montoFinal && (
                  <small className="p-error">Monto Final es requerido.</small>
                )}
              </div>
              <div className="field">
                <label htmlFor="idusuario">Usuario</label>
                <Dropdown
                  id="idusuario"
                  value={product.idusuario}
                  options={usuarios}
                  onChange={(e) => updateUsuario(e.value)}
                  required
                  optionLabel="username"
                  optionValue="idusuario"
                  placeholder="Seleccione un Usuario"
                />
                {submitted && !product.idusuario && (
                  <small className="p-error">Usuario es requerido.</small>
                )}
              </div>
            </Dialog>

            <Dialog
              visible={deleteProductDialog}
              style={{ width: "450px" }}
              header="Confirmar"
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
                    ¿Está seguro de que quiere eliminar la Caja{" "}
                    <b>{product.descripcion}</b>?
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
