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
import { Password } from "primereact/password";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function ProductsDemo() {
  let emptyProduct = {
    idusuario: "",
    username: "",
    password: "",
    idEmpleado: "",
    idTipoUsuario: "",
  };

  const [employeer, setEmployeer] = useState({
    idPersona: "",
    idEmpleado: "",
    nombrePersona: "",
  });

  const [empleado, setEmpleados] = useState([]);

  const [emplo, setEmplo] = useState([]);

  const [tipousuario, setTipoUsuario] = useState([]);
  const [products, setProducts] = useState([]);

  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [emploo, setEmploo] = useState([]);

  const [personas, setPersonas] = useState([]);

  const [arroz, setArroz] = useState([]);

  useEffect(() => {
    fetchUsuarios();
    fetchEmployees();
    fetchTipoUsuario();
    fetchPersonas();
    createEmployeePersonJson()
      .then((array) => {
        setArroz(array);

        // Acceder al primer objeto dentro del array
        if (array.length > 0) {
          const firstObject = array[0];

          // Verificar si el primer objeto tiene la propiedad idPersona
          if (firstObject.idPersona !== undefined) {
          } else {
          }
        } else {
        }
      })
      .catch((error) => {
        console.error("Error al obtener el array de objetos JSON:", error);
      });
    jsonEmplo();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await apiClient.get(`${URL}/employee`);

      return data; // Devuelve los empleados para su uso posterior
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  };

  const fetchTipoUsuario = async () => {
    try {
      const data = await apiClient.get(`${URL}/tipousuario`);
      setTipoUsuario(data);
    } catch (error) {
      console.error("Error al obtener tipo usuario", error);
    }
  };

  const fetchPersonas = async () => {
    try {
      const data = await apiClient.get(`${URL}/person`);

      return data; // Devuelve las personas para su uso posterior
    } catch (error) {
      console.error("Error al obtener personas:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  };

  const createEmployeePersonJson = async () => {
    const empleados = await fetchEmployees();
    const personas = await fetchPersonas();

    // Aquí asumo que cada empleado tiene un campo idPersona que se puede usar para emparejar con personas
    const combinedData = empleados.map((empleado) => {
      const persona = personas.find((p) => p.idPersona === empleado.idPersona);
      if (persona) {
        return {
          idEmpleado: empleado.idEmpleado,
          idPersona: persona.idPersona,
          nombrePersona: persona.nombrePersona,
        };
      } else {
        return {
          idEmpleado: empleado.idEmpleado,
          idPersona: null,
          nombrePersona: null,
        };
      }
    });

    setEmploo(combinedData);
    return combinedData;
  };

  const jsonEmplo = () => {
    createEmployeePersonJson().then((json) => {});
  };

  const fetchUsuarios = async () => {
    try {
      const data = await apiClient.get(`${URL}/auth`);
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (product.username && product.password) {
      const method = product.idusuario ? "PUT" : "POST";
      const url = product.idusuario
        ? `${URL}/auth/${product.idusuario}`
        : `${URL}/auth`;

      try {
        await apiClient[method.toLowerCase()](url, product);
        fetchUsuarios();
        setProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Usuario guardado",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al guardar el usuario:", error);

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

  const handleEdit = async (usuario) => {
    setProduct({ ...usuario });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    if (product.idusuario) {
      try {
        await apiClient.del(`${URL}/auth/${product.idusuario}`);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        fetchUsuarios();
        toast.current.show({
          severity: "error",
          summary: "Successful",
          detail: "Usuario Eliminado",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar el Usuario:", error);
      }
    } else if (selectedProducts && selectedProducts.length > 0) {
      try {
        const deletePromises = selectedProducts.map((prod) =>
          apiClient.del(`${URL}/auth/${prod.idusuario}`)
        );
        await Promise.all(deletePromises);
        setDeleteProductDialog(false);
        setSelectedProducts(null);
        fetchUsuarios();
        toast.current.show({
          severity: "error",
          summary: "Successful",
          detail: "Usuario Eliminados",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar los Usuarios:", error);
      }
    } else {
      console.error(
        "No se puede eliminar el empleado. ID de Usuario no encontrado."
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

  const activateUsuario = async (id) => {
    try {
      await apiClient.patch(`${URL}/auth/${id}`);
      fetchUsuarios();
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Usuario Activado",
        life: 3000,
      });
    } catch (error) {
      console.error("Error al activar el Usuario:", error);
    }
  };

  const activateSelectedUsuarios = async () => {
    if (selectedProducts && selectedProducts.length > 0) {
      try {
        const activatePromises = selectedProducts.map((prod) =>
          apiClient.patch(`${URL}/auth/${prod.idusuario}`)
        );
        await Promise.all(activatePromises);
        setSelectedProducts(null);
        fetchUsuarios();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Usuarios Activados",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al activar los Usuarios:", error);
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
          onClick={activateSelectedUsuarios}
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
          icon={rowData.estadoUsuario === "1" ? "pi pi-trash" : "pi pi-check"}
          rounded
          outlined
          severity={rowData.estadoUsuario === "1" ? "danger" : "success"}
          onClick={() => {
            if (rowData.estadoUsuario === "1") {
              confirmDeleteProduct(rowData);
            } else {
              activateUsuario(rowData.idusuario);
            }
          }}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Usuarios</h4>
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
      "eliminated-row": rowData.estadoUsuario === "0",
    };
  };

  const statusBodyTemplate = (rowData) => {
    const severity = getSeverity(rowData.estadoUsuario);
    return (
      <Tag value={severity === "success"} severity={severity}>
        {severity === "success" ? "Habilitado" : "Deshabilitado"}
      </Tag>
    );
  };

  const getSeverity = (estadoUsuario) => {
    switch (estadoUsuario) {
      case "1":
      case "secondary":
        return "success";
      case "0":
        return "danger";
      default:
        return null;
    }
  };

  function updateEmpleado(selectedEmpleadoId) {
    const selectedEmpleado = arroz.find(
      (emp) => emp.idEmpleado === selectedEmpleadoId
    );

    if (selectedEmpleado) {
      setProduct({ ...product, idEmpleado: selectedEmpleadoId });
    } else {
      console.error(`No se encontró empleado con ID ${selectedEmpleadoId}`);
    }
  }

  function updateTipoUsuario(selectedTipoUsuarioId) {
    setProduct({ ...product, idTipoUsuario: selectedTipoUsuarioId });
  }

  const [prevPassword, setPrevPassword] = useState("");

  const handleFocus = () => {
    setPrevPassword(product.password);
    onInputChange({ target: { value: "" } }, "password");
  };

  const handleBlur = () => {
    if (product.password === "") {
      onInputChange({ target: { value: prevPassword } }, "password");
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
                dataKey="idusuario"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} empleados"
                globalFilter={globalFilter}
                header={header}
                emptyMessage="No Usuarios found."
                rowClassName={rowClassName}
              >
                <Column selectionMode="multiple" exportable={false}></Column>
                <Column field="idusuario" header="ID" sortable></Column>
                <Column field="username" header="Username" sortable></Column>
                <Column
                  field="idEmpleado"
                  header="Empleado"
                  sortable
                  body={(rowData) => {
                    const arrozT = arroz.find(
                      (tipo) => tipo.idEmpleado === rowData.idEmpleado
                    );
                    return arrozT ? arrozT.nombrePersona : "hola";
                  }}
                ></Column>

                <Column
                  field="idTipoUsuario"
                  header="Tipo Usuario"
                  body={(rowData) => {
                    const tipoUsuario = tipousuario.find(
                      (tipo) => tipo.idTipoUsuario === rowData.idTipoUsuario
                    );
                    return tipoUsuario ? tipoUsuario.nombreTipoUsuario : "";
                  }}
                  sortable
                ></Column>

                <Column
                  field="estadoUsuario"
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
              header="Usuario Details"
              modal
              className="p-fluid"
              footer={productDialogFooter}
              onHide={hideDialog}
            >
              <div className="field">
                <label htmlFor="username">USERNAME</label>
                <InputText
                  id="username"
                  value={product.username}
                  onChange={(e) => onInputChange(e, "username")}
                  required
                  className={classNames({
                    "p-invalid": submitted && !product.username,
                  })}
                />
                {submitted && !product.username && (
                  <small className="p-error">Username is required.</small>
                )}
              </div>
              <div className="field">
                <label htmlFor="password">PASSWORD</label>
                <Password
                  id="password"
                  value={product.password}
                  onChange={(e) => onInputChange(e, "password")}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  className={classNames({
                    "p-invalid": submitted && !product.password,
                  })}
                />
                {submitted && !product.password && (
                  <small className="p-error">Password is required.</small>
                )}
              </div>

              <div className="field">
                <label htmlFor="idEmpleado">Empleado</label>
                <Dropdown
                  id="idEmpleado"
                  value={product.idEmpleado}
                  options={arroz}
                  onChange={(e) => updateEmpleado(e.value)}
                  optionLabel="nombrePersona"
                  optionValue="idEmpleado"
                  placeholder="Seleccione a un empleado"
                />
              </div>

              <div className="field">
                <label htmlFor="idTipoUsuario">Tipo Usuario</label>
                <Dropdown
                  id="idTipoUsuario"
                  value={product.idTipoUsuario}
                  options={tipousuario}
                  onChange={(e) => updateTipoUsuario(e.value)}
                  optionLabel="nombreTipoUsuario"
                  optionValue="idTipoUsuario"
                  placeholder="Seleccione a tipousuario"
                />
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
                    Are you sure you want to delete the usuario{" "}
                    <b>{product.username}</b>?
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
