import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const CrudPersona = () => {
  const [personas, setPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState(null);

  const [newPersona, setNewPersona] = useState({
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

  const [displayDialog, setDisplayDialog] = useState(false);

  const [departamentos, setDepartamentos] = useState([]);
  const [departamento, setDepartamento] = useState([]);

  const [provincias, setProvincias] = useState([]);
  const [provincia, setProvincia] = useState([]);

  const [distritos, setDistritos] = useState([]);
  const [distrito, setDistrito] = useState([]);

  useEffect(() => {
    fetchPersonas();
    fetchDepartamentos();
  }, []);

  const fetchPersonas = async () => {
    try {
      const response = await fetch("http://localhost:8080/person");
      const data = await response.json();
      setPersonas(data);
    } catch (error) {
      console.error("Error fetching personas:", error);
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

  const savePersona = async (persona) => {
    const { EstadoPersona, ...personaSinEstado } = persona;
    console.log("Datos del formulario:", personaSinEstado);
    try {
      const response = await fetch("http://localhost:8080/person", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personaSinEstado),
      });
      if (response.ok) {
        fetchPersonas();
        setNewPersona({});
        setDisplayDialog(false);
      }
    } catch (error) {
      console.error("Error saving persona:", error);
    }
  };

  const onRowSelect = (event) => {
    setSelectedPersona(event.data);
  };

  const onRowUnselect = () => {
    setSelectedPersona(null);
  };

  const renderToolbar = () => {
    return (
      <div className="p-inputgroup">
        <Button
          label="Agregar"
          icon="pi pi-plus"
          onClick={() => setDisplayDialog(true)}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="card">
        <DataTable
          value={personas}
          selectionMode="single"
          selection={selectedPersona}
          onSelectionChange={onRowSelect}
          onRowUnselect={onRowUnselect}
          paginator
          responsive="true"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rows={10}
          rowsPerPageOptions={[5, 10, 20]}
          header={renderToolbar()}
        >
          <Column field="idPersona" header="ID" sortable />
          <Column field="dni" header="DNI" sortable />
          <Column field="nombrePersona" header="Nombre" sortable />
          <Column field="apePaterno" header="Apellido Paterno" sortable />
          <Column field="apeMaterno" header="Apellido Materno" sortable />
          <Column field="genero" header="Género" sortable />
          <Column field="fechaNac" header="Fecha de Nacimiento" sortable />
          <Column field="correo" header="Correo" sortable />
          <Column field="celular" header="Celular" sortable />
          <Column field="direccion" header="Dirección" sortable />
          <Column field="estadoPersona" header="Estado" sortable />
          <Column field="idDistrito" header="ID Distrito" sortable />
        </DataTable>
      </div>
      <Dialog
        visible={displayDialog}
        style={{ width: "50vw" }}
        header="Agregar Persona"
        modal
        onHide={() => setDisplayDialog(false)}
      >
        <div>
          <div className="p-inputgroup-vertical">
            <div>
              <InputText
                placeholder="DNI"
                value={newPersona.dni || ""}
                onChange={(e) =>
                  setNewPersona({ ...newPersona, dni: e.target.value })
                }
              />
            </div>
            <div>
              <InputText
                placeholder="Nombre"
                value={newPersona.nombrePersona || ""}
                onChange={(e) =>
                  setNewPersona({
                    ...newPersona,
                    nombrePersona: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <InputText
                placeholder="Apellido Paterno"
                value={newPersona.apePaterno || ""}
                onChange={(e) =>
                  setNewPersona({ ...newPersona, apePaterno: e.target.value })
                }
              />
            </div>
            <div>
              <InputText
                placeholder="Apellido Materno"
                value={newPersona.apeMaterno || ""}
                onChange={(e) =>
                  setNewPersona({ ...newPersona, apeMaterno: e.target.value })
                }
              />
            </div>
            <div>
              <InputText
                placeholder="Género"
                value={newPersona.genero || ""}
                onChange={(e) =>
                  setNewPersona({ ...newPersona, genero: e.target.value })
                }
              />
            </div>
            <div>
              <InputText
                placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
                value={newPersona.fechaNac || ""}
                onChange={(e) =>
                  setNewPersona({ ...newPersona, fechaNac: e.target.value })
                }
              />
            </div>
            <div>
              <InputText
                placeholder="Correo"
                value={newPersona.correo || ""}
                onChange={(e) =>
                  setNewPersona({ ...newPersona, correo: e.target.value })
                }
              />
            </div>
            <div>
              <InputText
                placeholder="Celular"
                value={newPersona.celular || ""}
                onChange={(e) =>
                  setNewPersona({ ...newPersona, celular: e.target.value })
                }
              />
            </div>
            <div>
              <InputText
                placeholder="Dirección"
                value={newPersona.direccion || ""}
                onChange={(e) =>
                  setNewPersona({ ...newPersona, direccion: e.target.value })
                }
              />
            </div>
            <div>
              <InputText
                placeholder="ID Distrito"
                value={newPersona.idDistrito || ""}
                onChange={(e) =>
                  setNewPersona({ ...newPersona, idDistrito: e.target.value })
                }
              />
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
            <div>
              <Button label="Guardar" onClick={() => savePersona(newPersona)} />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CrudPersona;
