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
import { Calendar } from "primereact/calendar";
import { Tag } from "primereact/tag";
import Header from "../Header/Header";
import Dashboard from "../Header/Head";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import apiCliente from "../Security/apiClient";

import "primeicons/primeicons.css";
import apiClient from "../Security/apiClient";


export default function Persona() {
  let emptyPersona = {
    idPersona: "",
    dni: "",
    nombrePersona: "",
    apePaterno: "",
    apeMaterno: "",
    genero: "",
    fechaNac: null,
    correo: null,
    celular: null,
    direccion: "",
    departamento: "",
    provincia: "",
    distrito: "",
  };

  const [personas, setPersonas] = useState([]);
  const [persona, setPersona] = useState({
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
    idDistrito: "",
  });

  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [departamento, setDepartamento] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [provincia, setProvincia] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [distrito, setDistrito] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [fechaNac, setFechaNac] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [newPersonaDialog, setNewPersonaDialog] = useState(false);
  const [deletePersonaDialog, setDeletePersonaDialog] = useState(false);
  const [deletePersonasDialog, setDeletePersonasDialog] = useState(false);
  const [activatePersonaDialog, setActivatePersonaDialog] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  const hideActivatePersonaDialog = () => {
    setActivatePersonaDialog(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPersona({ ...persona, [id]: value });
  };

  const comboEdit = async (idDistrito) => {
    try {
      const provinciaData = await apiCliente.get(
        `http://localhost:8080/provincia/distrito/${idDistrito}`
      );
      const provinciaNombre = provinciaData.nombreProvincia;

      const departamentoData = await apiCliente.get(
        `http://localhost:8080/departamento/provincia/${provinciaNombre}`
      );

      setPersona((prevPersona) => ({
        ...prevPersona,
        idDistrito: idDistrito,
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
      const data = await apiCliente.get("http://localhost:8080/person");
      setPersonas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDepartamentos = async () => {
    try {
      const data = await apiCliente.get("http://localhost:8080/departamento");
      setDepartamentos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProvincias = async (idDepartamento) => {
    try {
      setDepartamento(idDepartamento);

      const data = await apiCliente.get(
        `http://localhost:8080/provincia/departamento/${idDepartamento}`
      );
      setProvincias(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDistritos = async (idProvincia) => {
    try {
      setProvincia(idProvincia);

      const data = await apiCliente.get(
        `http://localhost:8080/distrito/provincia/${idProvincia}`
      );
      setDistritos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const openNew = () => {
    setPersona(emptyPersona);
    setSubmitted(false);
    setNewPersonaDialog(true);
    setFechaNac(null);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setNewPersonaDialog(false);
  };

  const hideDeletePersonaDialog = () => {
    setDeletePersonaDialog(false);
  };

  const hideDeletePersonasDialog = () => {
    setDeletePersonasDialog(false);
  };

  const confirmDeleteSelected = () => {
    setDeletePersonasDialog(true);
  };

  const savePersona = async () => {
    setSubmitted(true);

    if (persona.nombrePersona.trim()) {
      const method = persona.idPersona ? "PUT" : "POST";
      const url = persona.idPersona
        ? `http://localhost:8080/person/${persona.idPersona}`
        : "http://localhost:8080/person";

      try {
        let responseMessage;
        if (method === "POST") {
          responseMessage = await apiCliente.post(url, persona);
        } else {
          responseMessage = await apiCliente.put(url, persona);
        }

        const successMessage = persona.idPersona
          ? "Persona Updated"
          : "Persona Created";
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: successMessage,
          life: 3000,
        });

        setNewPersonaDialog(false);
        fetchPersonas();
      } catch (error) {
        console.error(error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Error al guardar la persona",
          life: 3000,
        });
      }
    }
  };

  const editPersona = async (persona) => {
    setPersona(persona);
    setNewPersonaDialog(true);
    comboEdit(persona.idDistrito);
    const fechaNacimiento = new Date(persona.fechaNac);
    const offset = fechaNacimiento.getTimezoneOffset();
    fechaNacimiento.setMinutes(fechaNacimiento.getMinutes() + offset);

    setFechaNac(fechaNacimiento);
  };

  const activatePersona = async (rowData) => {
    if (rowData.idPersona) {
      try {
        await apiClient.patch(
          `http://localhost:8080/person/${rowData.idPersona}`
        );

        setPersona(emptyPersona);
        fetchPersonas();

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Persona Actualizada",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al actualizar la persona:", error);
      }
    } else if (selectedPersonas && selectedPersonas.length > 0) {
      try {
        const activatePromises = selectedPersonas.map((persona) =>
          apiClient.patch(`http://localhost:8080/person/${persona.idPersona}`)
        );
        await Promise.all(activatePromises);

        setSelectedPersonas(null);
        fetchPersonas();

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Personas activadas",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al activar las personas:", error);
      }
    }
  };

  const confirmDeletePersona = (persona) => {
    setPersona(persona);
    setDeletePersonaDialog(true);
  };

  const deletePersona = async () => {
    if (persona.idPersona) {
      try {
        await apiClient.del(
          `http://localhost:8080/person/${persona.idPersona}`
        );

        setDeletePersonaDialog(false);
        setPersona(emptyPersona);
        fetchPersonas();

        toast.current.show({
          severity: "error",
          summary: "Successful",
          detail: "Persona Eliminada",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar la persona:", error);
      }
    } else if (selectedPersonas && selectedPersonas.length > 0) {
      try {
        const deletePromises = selectedPersonas.map((persona) =>
          apiClient.del(`http://localhost:8080/person/${persona.idPersona}`)
        );
        await Promise.all(deletePromises);

        setDeletePersonaDialog(false);
        setSelectedPersonas(null);
        fetchPersonas();

        toast.current.show({
          severity: "error",
          summary: "Successful",
          detail: "Personas Eliminadas",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al eliminar las personas:", error);
      }
    } else {
      console.error(
        "No se puede eliminar la persona. ID de persona no encontrado."
      );
    }
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const activatePersonaDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideActivatePersonaDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="success"
        onClick={activatePersona}
      />
    </React.Fragment>
  );

  const deleteSelectedPersonas = () => {
    setDeletePersonasDialog(false);
    setSelectedPersonas([]);
    deletePersona();
  };

  const deletePersonaDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeletePersonaDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deletePersona}
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
          disabled={!selectedPersonas || !selectedPersonas.length}
        />{" "}
        <Button
          label="Activar"
          icon="pi pi-check"
          severity="info"
          onClick={activatePersona}
          disabled={!selectedPersonas || !selectedPersonas.length}
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
            editPersona(rowData);
          }}
        />
        <Button
          icon={rowData.estadoPersona === "1" ? "pi pi-trash" : "pi pi-check"}
          rounded
          outlined
          severity={rowData.estadoPersona === "1" ? "danger" : "success"}
          onClick={() => {
            if (rowData.estadoPersona === "1") {
              confirmDeletePersona(rowData);
            } else {
              activatePersona(rowData);
            }
          }}
        />
      </React.Fragment>
    );
  };

  const getSeverity = (persona) => {
    switch (persona.estadoPersona) {
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
        {rowData.estadoPersona === "1" ? "HABILITADO" : "INHABILITADO"}
      </Tag>
    );
  };

  const statusItemTemplate = (option) => {
    return (
      <Tag value={option} severity={getSeverity(option)}>
        {option}
      </Tag>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Personas</h4>
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

  const personaDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={savePersona} />
    </React.Fragment>
  );

  const deletePersonasDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeletePersonasDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedPersonas}
      />
    </React.Fragment>
  );

  return (
    <div >
      <div className="layout-sidebar"
      >
        <Dashboard  />
      </div>
      <div className="flex">
        <div className="w-1/4"
        >
          <Header  />
        </div>

        <div className="col-12 xl:col-10">
          <div className="col-12">
            <div className="card">
              <div className="w-3/4 p-4">
                <Toast ref={toast} />
                <Toolbar
                  className="mb-4"
                  left={leftToolbarTemplate}
                  right={rightToolbarTemplate}
                ></Toolbar>

                <DataTable
                  ref={dt}
                  value={personas}
                  selection={selectedPersonas}
                  onSelectionChange={(e) => setSelectedPersonas(e.value)}
                  dataKey="idPersona"
                  paginator
                  rows={10}
                  rowsPerPageOptions={[5, 10, 25]}
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} personas"
                  header={header}
                  responsiveLayout="scroll"
                  globalFilter={globalFilter}
                >
                  <Column selectionMode="multiple" exportable={false}></Column>
                  <Column field="idPersona" header="ID" sortable></Column>
                  <Column field="dni" header="DNI" sortable></Column>
                  <Column
                    field="nombrePersona"
                    header="Nombre"
                    sortable
                  ></Column>
                  <Column
                    field="apePaterno"
                    header="Ape. Paterno"
                    sortable
                  ></Column>
                  <Column
                    field="apeMaterno"
                    header="Ape. Materno"
                    sortable
                  ></Column>
                  <Column
                    field="fechaNac"
                    header="Fecha"
                    sortable
                    style={{ minWidth: "10rem" }}
                  ></Column>
                  <Column field="correo" header="Correo" sortable>
                    style={{ minWidth: "1rem" }}
                  </Column>
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
                    style={{ minWidth: "1rem" }}
                  ></Column>

                  <Column
                    field="estadoPersona"
                    header="ESTADO"
                    sortable
                    body={statusBodyTemplate}
                    style={{ minWidth: "12rem" }}
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
                visible={newPersonaDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Registro Persona"
                modal
                className="p-fluid"
                footer={personaDialogFooter}
                onHide={hideDialog}
              >
                <div className="field">
                  <label className="font-bold" htmlFor="dni">
                    DNI
                  </label>
                  <InputText
                    id="dni"
                    keyfilter="int"
                    maxLength="8"
                    value={persona.dni}
                    onChange={handleInputChange}
                    required
                    autoFocus
                    className={classNames({
                      "p-invalid": submitted && !persona.dni,
                    })}
                  />
                  {submitted && !persona.dni && (
                    <small className="p-error">DNI es requerido.</small>
                  )}
                </div>

                <div className="field">
                  <label className="font-bold" htmlFor="nombrePersona">
                    Nombre
                  </label>
                  <InputText
                    id="nombrePersona"
                    value={persona.nombrePersona}
                    onChange={handleInputChange}
                    required
                    className={classNames({
                      "p-invalid": submitted && !persona.nombrePersona,
                    })}
                  />
                  {submitted && !persona.nombrePersona && (
                    <small className="p-error">Nombre es requerido.</small>
                  )}
                </div>

                <div className="field">
                  <label className="font-bold" htmlFor="apePaterno">
                    Apellido Paterno
                  </label>
                  <InputText
                    id="apePaterno"
                    value={persona.apePaterno}
                    onChange={handleInputChange}
                    required
                    className={classNames({
                      "p-invalid": submitted && !persona.apePaterno,
                    })}
                  />
                  {submitted && !persona.apePaterno && (
                    <small className="p-error">
                      Apellido Paterno es requerido.
                    </small>
                  )}
                </div>

                <div className="field">
                  <label className="font-bold" htmlFor="apeMaterno">
                    Apellido Materno
                  </label>
                  <InputText
                    id="apeMaterno"
                    value={persona.apeMaterno}
                    onChange={handleInputChange}
                    required
                    className={classNames({
                      "p-invalid": submitted && !persona.apeMaterno,
                    })}
                  />
                  {submitted && !persona.apeMaterno && (
                    <small className="p-error">
                      Apellido Materno es requerido.
                    </small>
                  )}
                </div>

                <div className="field">
                  <label className="font-bold" htmlFor="fechaNac">
                    Fecha de Nacimiento
                  </label>
                  <Calendar
                    id="fechaNac"
                    value={fechaNac}
                    onChange={(e) => {
                      setPersona((prevState) => ({
                        ...prevState,
                        fechaNac: e.target.value,
                      }));
                      setFechaNac(e.target.value);
                    }}
                    dateFormat="yy-mm-dd"
                    showIcon
                  />
                </div>

                <div className="field">
                  <label className="font-bold" htmlFor="correo">
                    Correo
                  </label>
                  <InputText
                    id="correo"
                    value={persona.correo || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="field">
                  <label className="font-bold" htmlFor="celular">
                    Celular
                  </label>
                  <InputText
                    id="celular"
                    keyfilter="int"
                    maxLength="9"
                    value={persona.celular || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="field">
                  <label className="font-bold" htmlFor="genero">
                    Género
                  </label>
                  <Dropdown
                    id="genero"
                    value={persona.genero}
                    options={[
                      { label: "Masculino", value: "M" },
                      { label: "Femenino", value: "F" },
                    ]}
                    onChange={handleInputChange}
                    placeholder="Seleccione un género"
                  />
                </div>

                <div className="field">
                  <label className="font-bold" htmlFor="direccion">
                    Dirección
                  </label>
                  <InputText
                    id="direccion"
                    value={persona.direccion}
                    onChange={handleInputChange}
                    required
                    className={classNames({
                      "p-invalid": submitted && !persona.direccion,
                    })}
                  />
                  {submitted && !persona.direccion && (
                    <small className="p-error">Dirección es requerido.</small>
                  )}
                </div>

                <div className="field">
                  <label className="font-bold" htmlFor="idDepartamento">
                    Departamento
                  </label>
                  <Dropdown
                    id="idDepartamento"
                    value={persona.idDepartamento}
                    options={departamentos.map((dep) => ({
                      label: dep.nombreDepartamento,
                      value: dep.idDepartamento,
                    }))}
                    onChange={(e) => {
                      setPersona((prevPersona) => ({
                        ...prevPersona,
                        idDepartamento: e.value,
                      }));
                      fetchProvincias(e.value);
                    }}
                    placeholder="Seleccione un departamento"
                  />
                </div>

                <div className="field">
                  <label className="font-bold" htmlFor="idProvincia">
                    Provincia
                  </label>
                  <Dropdown
                    id="idProvincia"
                    value={persona.idProvincia}
                    options={provincias.map((prov) => ({
                      label: prov.nombreProvincia,
                      value: prov.idProvincia,
                    }))}
                    onChange={(e) => {
                      setPersona((prevPersona) => ({
                        ...prevPersona,
                        idProvincia: e.value,
                      }));
                      fetchDistritos(e.value);
                    }}
                    placeholder="Seleccione una provincia"
                    disabled={!persona.idDepartamento}
                  />
                </div>

                <div className="field">
                  <label className="font-bold" htmlFor="iDistrito">
                    Distrito
                  </label>
                  <Dropdown
                    id="iDistrito"
                    value={persona.idDistrito}
                    options={distritos.map((dist) => ({
                      label: dist.nombreDistrito,
                      value: dist.idDistrito,
                    }))}
                    onChange={(e) => {
                      setPersona((prevPersona) => ({
                        ...prevPersona,
                        idDistrito: e.value,
                      }));
                    }}
                    placeholder="Seleccione un distrito"
                    disabled={!persona.idProvincia}
                  />
                </div>
              </Dialog>

              <Dialog
                visible={deletePersonaDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={deletePersonaDialogFooter}
                onHide={hideDeletePersonaDialog}
              >
                <div className="confirmation-content">
                  <i
                    className="pi pi-exclamation-triangle mr-3"
                    style={{ fontSize: "2rem" }}
                  />
                  {persona && (
                    <span>
                      Are you sure you want to delete{" "}
                      <b>{persona.nombrePersona}</b>?
                    </span>
                  )}
                </div>
              </Dialog>

              <Dialog
                visible={activatePersonaDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={activatePersonaDialogFooter}
                onHide={activatePersonaDialog}
              >
                <div className="confirmation-content">
                  <i
                    className="pi pi-exclamation-triangle mr-3"
                    style={{ fontSize: "2rem" }}
                  />
                  {persona && (
                    <span>
                      Are you sure you want to activate{" "}
                      <b>{persona.nombrePersona}</b>?
                    </span>
                  )}
                </div>
              </Dialog>

              <Dialog
                visible={deletePersonasDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={deletePersonasDialogFooter}
                onHide={hideDeletePersonasDialog}
              >
                <div className="confirmation-content">
                  <i
                    className="pi pi-exclamation-triangle mr-3"
                    style={{ fontSize: "2rem" }}
                  />
                  {persona && (
                    <span>
                      Are you sure you want to delete the selected products?
                    </span>
                  )}
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
