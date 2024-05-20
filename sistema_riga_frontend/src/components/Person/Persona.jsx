import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';

const Persona = () => {
  const emptyPersona = {
    idPersona: '',
    dni: '',
    nombrePersona: '',
    apePaterno: '',
    apeMaterno: '',
    genero: '',
    fechaNac: '',
    correo: '',
    celular: '',
    direccion: '',
    departamento: '',
    provincia: '',
    distrito: ''
};


    const [departamentos, setDepartamentos] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [persona, setPersona] = useState(emptyPersona);
    const [selectedPersonas, setSelectedPersonas] = useState(null);
    const [personaDialog, setPersonaDialog] = useState(false);
    const [deletePersonaDialog, setDeletePersonaDialog] = useState(false);
    const [deletePersonasDialog, setDeletePersonasDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        fetchDepartamentos();
        fetchPersonas();
    }, []);

    const fetchDepartamentos = async () => {
        try {
            const response = await fetch('http://localhost:8080/person/departamentos');
            if (!response.ok) {
                throw new Error('Error al obtener departamentos');
            }
            const data = await response.json();
            setDepartamentos(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProvincias = async (idDepartamento) => {
        try {
            const response = await fetch(`http://localhost:8080/person/provincias/${idDepartamento}`);
            if (!response.ok) {
                throw new Error('Error al obtener provincias');
            }
            const data = await response.json();
            setProvincias(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDistritos = async (idProvincia) => {
        try {
            const response = await fetch(`http://localhost:8080/person/distritos/${idProvincia}`);
            if (!response.ok) {
                throw new Error('Error al obtener distritos');
            }
            const data = await response.json();
            setDistritos(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPersonas = async () => {
        try {
            const response = await fetch('http://localhost:8080/person');
            const data = await response.json();
            setPersonas(data);
        } catch (error) {
            console.error('Error al obtener personas:', error);
        }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setPersona({ ...persona, [name]: value });
  };
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      const method = persona.idPersona ? 'PUT' : 'POST';
      const url = persona.idPersona
          ? `http://localhost:8080/person/${persona.idPersona}`
          : 'http://localhost:8080/person';
  
      try {
          const response = await fetch(url, {
              method,
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(persona)
          });
  
          const data = await response.text();
          console.log('Respuesta:', data);
          fetchPersonas();
          setPersona(emptyPersona);
          setPersonaDialog(false);
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Persona Saved', life: 3000 });
      } catch (error) {
          console.error('Error al enviar el formulario:', error);
      }
  };
  

    const handleEdit = async (persona) => {
        setPersona({ ...persona });
        setPersonaDialog(true);
        await fetchProvincias(persona.idDepartamento);
        await fetchDistritos(persona.idProvincia);
    };

    const handleDelete = async (idPersona) => {
        try {
            const response = await fetch(`http://localhost:8080/person/${idPersona}`, {
                method: 'DELETE'
            });

            const data = await response.text();
            console.log('Respuesta:', data);
            fetchPersonas();
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Persona Deleted', life: 3000 });
        } catch (error) {
            console.error('Error al eliminar persona:', error);
        }
    };

    const openNew = () => {
        setPersona(emptyPersona);
        setSubmitted(false);
        setPersonaDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPersonaDialog(false);
    };

    const hideDeletePersonaDialog = () => {
        setDeletePersonaDialog(false);
    };

    const hideDeletePersonasDialog = () => {
        setDeletePersonasDialog(false);
    };

    const savePersona = async () => {
        setSubmitted(true);
        if (persona.nombrePersona.trim()) {
            let _personas = [...personas];
            let _persona = { ...persona };

            if (persona.idPersona) {
                const index = findIndexById(persona.idPersona);
                _personas[index] = _persona;

                try {
                    const response = await fetch(`http://localhost:8080/person/${persona.idPersona}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(_persona)
                    });
                    if (!response.ok) {
                        throw new Error('Error updating persona');
                    }
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Persona Updated', life: 3000 });
                } catch (error) {
                    console.error('Error updating persona:', error);
                }
            } else {
                try {
                    const response = await fetch('http://localhost:8080/person', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(_persona)
                    });
                    const data = await response.json();
                    _persona.idPersona = data.idPersona;
                    _personas.push(_persona);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Persona Created', life: 3000 });
                } catch (error) {
                    console.error('Error creating persona:', error);
                }
            }

            setPersonas(_personas);
            setPersonaDialog(false);
            setPersona(emptyPersona);
        }
    };

    const editPersona = async (persona) => {
      setPersona({ ...persona });
      setPersonaDialog(true);
  
      if (persona.idDepartamento) {
          await fetchProvincias(persona.idDepartamento);
      } else {
          console.error('idDepartamento no está definido para la persona');
      }
  
      if (persona.idProvincia) {
          await fetchDistritos(persona.idProvincia);
      } else {
          console.error('idProvincia no está definido para la persona');
      }
  };
  

    const confirmDeletePersona = (persona) => {
        setPersona(persona);
        setDeletePersonaDialog(true);
    };

    const deletePersona = async () => {
        let _personas = personas.filter((val) => val.idPersona !== persona.idPersona);
        setPersonas(_personas);
        setDeletePersonaDialog(false);
        setPersona(emptyPersona);

        try {
            const response = await fetch(`http://localhost:8080/person/${persona.idPersona}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error deleting persona');
            }
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Persona Deleted', life: 3000 });
        } catch (error) {
            console.error('Error deleting persona:', error);
        }
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < personas.length; i++) {
            if (personas[i].idPersona === id) {
                index = i;
                break;
            }
        }
        return index;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeletePersonasDialog(true);
    };

    const deleteSelectedPersonas = async () => {
        let _personas = personas.filter((val) => !selectedPersonas.includes(val));
        setPersonas(_personas);
        setDeletePersonasDialog(false);
        setSelectedPersonas(null);

        for (const persona of selectedPersonas) {
            try {
                await fetch(`http://localhost:8080/person/${persona.idPersona}`, { method: 'DELETE' });
            } catch (error) {
                console.error('Error deleting persona:', error);
            }
        }

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Personas Deleted', life: 3000 });
    };

    
    const onDepartamentoChange = async (e) => {
      const departamento = e.value;
      console.log('departamento:', departamento);
      setPersona((prevPersona) => ({ ...prevPersona, departamento }));
      setProvincias([]);
      setDistritos([]);
    
      if (departamento) {
          console.log('Fetching provincias...');
          await fetchProvincias(departamento);
      } else {
          console.error('departamento no está definido');
      }
  };
  
  const onProvinciaChange = async (e) => {
      const provincia = e.value;
      console.log('provincia:', provincia);
      setPersona((prevPersona) => ({ ...prevPersona, provincia }));
      setDistritos([]);
    
      if (provincia) {
          console.log('Fetching distritos...');
          await fetchDistritos(provincia);
      } else {
          console.error('provincia no está definido');
      }
  };
  
  const onDistritoChange = async (e) => {
      const distrito = e.value;
      console.log('distrito:', distrito);
      setPersona((prevPersona) => ({ ...prevPersona, distrito }));
  };
  

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedPersonas || !selectedPersonas.length} />
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editPersona(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeletePersona(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Administrar Personas</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const personaDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={savePersona} />
        </React.Fragment>
    );
    const deletePersonaDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePersonaDialog} />
            <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={deletePersona} />
        </React.Fragment>
    );
    const deletePersonasDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePersonasDialog} />
            <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedPersonas} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={personas}
                    selection={selectedPersonas}
                    onSelectionChange={(e) => setSelectedPersonas(e.value)}
                    dataKey="idPersona"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
                    globalFilter={globalFilter}
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="dni" header="DNI" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="nombrePersona" header="Nombre" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="apePaterno" header="Apellido Paterno" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="apeMaterno" header="Apellido Materno" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="genero" header="Género" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="fechaNac" header="Fecha de Nacimiento" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="correo" header="Correo" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="celular" header="Celular" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="direccion" header="Dirección" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={personaDialog} style={{ width: '450px' }} header="Detalles de Persona" modal className="p-fluid" footer={personaDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="dni">DNI</label>
                    <InputText id="dni" name="dni" value={persona.dni} onChange={handleInputChange} required className={classNames({ 'p-invalid': submitted && !persona.dni })} />
                    {submitted && !persona.dni && <small className="p-invalid">DNI es requerido.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="nombrePersona">Nombre</label>
                    <InputText id="nombrePersona" name="nombrePersona" value={persona.nombrePersona} onChange={handleInputChange} required className={classNames({ 'p-invalid': submitted && !persona.nombrePersona })} />
                    {submitted && !persona.nombrePersona && <small className="p-invalid">Nombre es requerido.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="apePaterno">Apellido Paterno</label>
                    <InputText id="apePaterno" name="apePaterno" value={persona.apePaterno} onChange={handleInputChange} required className={classNames({ 'p-invalid': submitted && !persona.apePaterno })} />
                    {submitted && !persona.apePaterno && <small className="p-invalid">Apellido Paterno es requerido.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="apeMaterno">Apellido Materno</label>
                    <InputText id="apeMaterno" name="apeMaterno" value={persona.apeMaterno} onChange={handleInputChange} required className={classNames({ 'p-invalid': submitted && !persona.apeMaterno })} />
                    {submitted && !persona.apeMaterno && <small className="p-invalid">Apellido Materno es requerido.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="genero">Género</label>
                    <div className="p-formgrid p-grid">
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton id="masculino" name="genero" value="M" onChange={handleInputChange} checked={persona.genero === 'M'} />
                            <label htmlFor="masculino">Masculino</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton id="femenino" name="genero" value="F" onChange={handleInputChange} checked={persona.genero === 'F'} />
                            <label htmlFor="femenino">Femenino</label>
                        </div>
                    </div>
                </div>
                <div className="p-field">
                    <label htmlFor="fechaNac">Fecha de Nacimiento</label>
                    <InputText id="fechaNac" name="fechaNac" value={persona.fechaNac} onChange={handleInputChange} required className={classNames({ 'p-invalid': submitted && !persona.fechaNac })} />
                    {submitted && !persona.fechaNac && <small className="p-invalid">Fecha de Nacimiento es requerido.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="correo">Correo</label>
                    <InputText id="correo" name="correo" value={persona.correo} onChange={handleInputChange} required className={classNames({ 'p-invalid': submitted && !persona.correo })} />
                    {submitted && !persona.correo && <small className="p-invalid">Correo es requerido.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="celular">Celular</label>
                    <InputText id="celular" name="celular" value={persona.celular} onChange={handleInputChange} required className={classNames({ 'p-invalid': submitted && !persona.celular })} />
                    {submitted && !persona.celular && <small className="p-invalid">Celular es requerido.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="direccion">Dirección</label>
                    <InputText id="direccion" name="direccion" value={persona.direccion} onChange={handleInputChange} required className={classNames({ 'p-invalid': submitted && !persona.direccion })} />
                    {submitted && !persona.direccion && <small className="p-invalid">Dirección es requerido.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="idDepartamento">Departamento</label>
                    <Dropdown id="idDepartamento" name="idDepartamento" value={persona.idDepartamento} options={departamentos} onChange={onDepartamentoChange} optionLabel="nombre" placeholder="Selecciona un Departamento" />
                </div>
                <div className="p-field">
                    <label htmlFor="idProvincia">Provincia</label>
                    <Dropdown id="idProvincia" name="idProvincia" value={persona.idProvincia} options={provincias} onChange={onProvinciaChange} optionLabel="nombre" placeholder="Selecciona una Provincia" />
                </div>
                <div className="p-field">
                    <label htmlFor="idDistrito">Distrito</label>
                    <Dropdown id="idDistrito" name="idDistrito" value={persona.idDistrito} options={distritos} onChange={onDistritoChange} optionLabel="nombre" placeholder="Selecciona un Distrito" />
                </div>
            </Dialog>

            <Dialog visible={deletePersonaDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deletePersonaDialogFooter} onHide={hideDeletePersonaDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {persona && (
                        <span>
                            ¿Estás seguro de que deseas eliminar a <b>{persona.nombrePersona}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deletePersonasDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deletePersonasDialogFooter} onHide={hideDeletePersonasDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedPersonas && (
                        <span>
                            ¿Estás seguro de que deseas eliminar los registros seleccionados?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
};

export default Persona
