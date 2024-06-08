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
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";

export default function ProductsDemo() {
  let emptyProduct = {
    idEmpleado: "",
    sueldo: "",
    fechaIng: "",
    horaEntrada: "",
    horaSalida: "",
    turno: "",
    idPersona: "",
    idCargo: "",
    celular: "",
    nombrePersona: "",
    direccion: "",
  };

  const [personas, setPersonas] = useState([]);
  const [cargos, setCargos] = useState([]);
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
    fetchPersonas();
    fetchCargos();
    fetchEmployees();
  }, []);

  const fetchPersonas = async () => {
    try {
      const data = await apiClient.get("http://localhost:8080/employee/person");
      setPersonas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCargos = async () => {
    try {
      const data = await apiClient.get("http://localhost:8080/employee/cargos");
      setCargos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const data = await apiClient.get("http://localhost:8080/employee");

      setProducts(data);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (
      product.sueldo &&
      product.fechaIng &&
      product.horaEntrada &&
      product.horaSalida &&
      product.turno
    ) {
      const method = product.idEmpleado ? "PUT" : "POST";
      const url = product.idEmpleado
        ? `http://localhost:8080/employee/${product.idEmpleado}`
        : "http://localhost:8080/employee";

      try {
        await apiClient[method.toLowerCase()](url, product);
        fetchEmployees();
        setProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Empleado guardado",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al guardar el empleado:", error);

        const errorMsg = error.response ? error.response.data : error.message;
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: errorMsg,
          life: 3000,
        });
      }
    } else {
      console.error("Campos obligatorios faltantes");
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Campos obligatorios faltantes",
        life: 3000,
      });
    }
  };

  const handleEdit = async (employee) => {
    const fechaIngDate = new Date(employee.fechaIng);
    const offset = fechaIngDate.getTimezoneOffset();
    fechaIngDate.setMinutes(fechaIngDate.getMinutes() + offset);
    const selectedPersona = personas.find(
      (p) => p.idPersona === employee.idPersona
    );

    setProduct({
      ...employee,
      fechaIng: fechaIngDate,
      celular: selectedPersona ? selectedPersona.celular : "",
      nombrePersona: selectedPersona ? selectedPersona.nombrePersona : "",
      direccion: selectedPersona ? selectedPersona.direccion : "",
    });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    if (product.idEmpleado) {
      try {
        await apiClient.del(
          `http://localhost:8080/employee/${product.idEmpleado}`
        );
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        fetchEmployees();
        toast.current.show({
          severity: "error",
          summary: "Successful",
          detail: "Empleado Eliminado",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar el empleado:", error);
      }
    } else if (selectedProducts && selectedProducts.length > 0) {
      try {
        const deletePromises = selectedProducts.map((prod) =>
          apiClient.del(`http://localhost:8080/employee/${prod.idEmpleado}`)
        );
        await Promise.all(deletePromises);
        setDeleteProductDialog(false);
        setSelectedProducts(null);
        fetchEmployees();
        toast.current.show({
          severity: "error",
          summary: "Successful",
          detail: "Empleados Eliminados",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar los empleados:", error);
      }
    } else {
      console.error(
        "No se puede eliminar el empleado. ID de empleado no encontrado."
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

  const activateEmpleado = async (id) => {
    try {
      await apiClient.patch(`http://localhost:8080/employee/${id}`);
      fetchEmployees();
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "employee Activada",
        life: 3000,
      });
    } catch (error) {
      console.error("Error al activar la employee:", error);
    }
  };

  const activateSelectedEmpleados = async () => {
    if (selectedProducts && selectedProducts.length > 0) {
      try {
        const activatePromises = selectedProducts.map((prod) =>
          apiClient.patch(`http://localhost:8080/employee/${prod.idEmpleado}`)
        );
        await Promise.all(activatePromises);
        setSelectedProducts(null);
        fetchEmployees();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "employee Activadas",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al activar las employee:", error);
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
          onClick={activateSelectedEmpleados}
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
          icon={rowData.estadoEmpleado === "1" ? "pi pi-trash" : "pi pi-check"}
          rounded
          outlined
          severity={rowData.estadoEmpleado === "1" ? "danger" : "success"}
          onClick={() => {
            if (rowData.estadoEmpleado === "1") {
              confirmDeleteProduct(rowData);
            } else {
              activateEmpleado(rowData.idEmpleado);
            }
          }}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Employees</h4>
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
      "eliminated-row": rowData.estadoEmpleado === "0",
    };
  };

  const statusBodyTemplate = (rowData) => {
    const severity = getSeverity(rowData.estadoEmpleado);
    return (
      <Tag value={severity === "success"} severity={severity}>
        {severity === "success" ? "Habilitado" : "Deshabilitado"}
      </Tag>
    );
  };

  const getSeverity = (estadoEmpleado) => {
    switch (estadoEmpleado) {
      case "1":
      case "secondary":
        return "success";
      case "0":
        return "danger";
      default:
        return null;
    }
  };
  function updateCargo(selectedCargoId) {
    setProduct({ ...product, idCargo: selectedCargoId });
  }
  function updatePersona(selectedPersonaId) {
    const selectedPersona = personas.find(
      (persona) => persona.idPersona === selectedPersonaId
    );

    setProduct({
      ...product,
      idPersona: selectedPersonaId,
      celular: selectedPersona ? selectedPersona.celular : "",
      nombrePersona: selectedPersona ? selectedPersona.nombrePersona : "",
      direccion: selectedPersona ? selectedPersona.direccion : "",
    });
  }
  const cargoBodyTemplate = (rowData) => {
    const cargo = cargos.find((cargo) => cargo.idCargo === rowData.idCargo);
    return cargo ? cargo.nombreCargo : rowData.idCargo;
  };

  const personaBodyTemplate = (rowData) => {
    const persona = personas.find(
      (persona) => persona.idPersona === rowData.idPersona
    );
    return persona ? persona.nombrePersona : rowData.idPersona;
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
            <div className="card">
              <Toast ref={toast} />
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
                dataKey="idEmpleado"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} empleados"
                globalFilter={globalFilter}
                header={header}
                emptyMessage="No employees found."
                rowClassName={rowClassName}
              >
                <Column selectionMode="multiple" exportable={false}></Column>
                <Column field="idEmpleado" header="ID" sortable></Column>
                <Column field="sueldo" header="Sueldo" sortable></Column>
                <Column
                  field="fechaIng"
                  header="Fecha Ingreso"
                  sortable
                ></Column>
                <Column
                  field="horaEntrada"
                  header="Hora Entrada"
                  sortable
                ></Column>
                <Column
                  field="horaSalida"
                  header="Hora Salida"
                  sortable
                ></Column>
                <Column field="turno" header="Turno" sortable></Column>
                <Column
                  field="idPersona"
                  header="Persona"
                  body={personaBodyTemplate}
                  sortable
                ></Column>
                <Column
                  field="idCargo"
                  header="Cargo"
                  body={cargoBodyTemplate}
                  sortable
                ></Column>
                <Column
                  field="estadoEmpleado"
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
              header="Employee Details"
              modal
              className="p-fluid"
              footer={productDialogFooter}
              onHide={hideDialog}
            >
              <div className="field">
                <label htmlFor="idPersona">Persona</label>
                <Dropdown
                  id="personADropdown"
                  value={product.idPersona}
                  options={personas}
                  onChange={(e) => updatePersona(e.value)}
                  optionLabel="dni"
                  optionValue="idPersona"
                  placeholder="Seleccione a persona"
                  filter
                />
              </div>
              <div className="field">
                <label htmlFor="nombrePersona">Nombre</label>
                <InputText
                  id="nombrePersona"
                  value={product.nombrePersona}
                  readOnly
                />
              </div>
              <div className="field">
                <label htmlFor="dni">Celular</label>
                <InputText id="dni" value={product.celular} readOnly />
              </div>
              <div className="field">
                <label htmlFor="direccion">Dirección</label>
                <InputText id="direccion" value={product.direccion} readOnly />
              </div>
              <div className="field">
                <label htmlFor="idCargo">Cargo</label>
                <Dropdown
                  id="idCargo"
                  value={product.idCargo}
                  options={cargos}
                  onChange={(e) => updateCargo(e.value)}
                  required
                  optionLabel="nombreCargo"
                  optionValue="idCargo"
                  placeholder="Seleccione a cargo"
                />
              </div>
              <div className="field">
                <label htmlFor="sueldo">Sueldo</label>
                <InputNumber
                  id="sueldo"
                  value={product.sueldo}
                  onValueChange={(e) => onInputChange(e, "sueldo")}
                  mode="currency"
                  currency="USD"
                  className={classNames({
                    "p-invalid": submitted && !product.sueldo,
                  })}
                />
                {submitted && !product.sueldo && (
                  <small className="p-error">Sueldo is required.</small>
                )}
              </div>

              <div className="field">
                <label htmlFor="fechaIng">Fecha Ingreso</label>
                <Calendar
                  id="fechaIng"
                  value={product.fechaIng}
                  onChange={(e) => onInputChange(e, "fechaIng")}
                  dateFormat="dd/mm/yy"
                  showIcon
                  className={classNames({
                    "p-invalid": submitted && !product.fechaIng,
                  })}
                />
                {submitted && !product.fechaIng && (
                  <small className="p-error">Fecha Ingreso is required.</small>
                )}
              </div>

              <div className="field">
                <label htmlFor="horaEntrada">Hora Entrada</label>
                <InputText
                  id="horaEntrada"
                  value={product.horaEntrada}
                  onChange={(e) => onInputChange(e, "horaEntrada")}
                  required
                  className={classNames({
                    "p-invalid": submitted && !product.horaEntrada,
                  })}
                />
                {submitted && !product.horaEntrada && (
                  <small className="p-error">Hora Entrada is required.</small>
                )}
              </div>
              <div className="field">
                <label htmlFor="horaSalida">Hora Salida</label>
                <InputText
                  id="horaSalida"
                  value={product.horaSalida}
                  onChange={(e) => onInputChange(e, "horaSalida")}
                  required
                  className={classNames({
                    "p-invalid": submitted && !product.horaSalida,
                  })}
                />
                {submitted && !product.horaSalida && (
                  <small className="p-error">Hora Salida is required.</small>
                )}
              </div>
              <div className="field">
                <label htmlFor="turno">Turno</label>
                <InputText
                  id="turno"
                  value={product.turno}
                  onChange={(e) => onInputChange(e, "turno")}
                  required
                  className={classNames({
                    "p-invalid": submitted && !product.turno,
                  })}
                />
                {submitted && !product.turno && (
                  <small className="p-error">Turno is required.</small>
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
                    Are you sure you want to delete the employee{" "}
                    <b>{product.sueldo}</b>?
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
