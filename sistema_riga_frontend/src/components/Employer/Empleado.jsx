import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import 'primeflex/primeflex.css';
import "primeicons/primeicons.css";
import { Tag } from 'primereact/tag';

export default function ProductsDemo() {
  let emptyProduct = {
    idEmpleado: '',
    sueldo: '',
    fechaIng: '',
    horaEntrada: '',
    horaSalida: '',
    turno: '',
    idPersona: '',
    idCargo: '',
    estadoEmpleado: '1'
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
      const response = await fetch('http://localhost:8080/employee/person');
      if (!response.ok) throw new Error('Error al obtener personas');
      const data = await response.json();
      setPersonas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCargos = async () => {
    try {
      const response = await fetch('http://localhost:8080/employee/cargos');
      if (!response.ok) throw new Error('Error al obtener cargos');
      const data = await response.json();
      setCargos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8080/employee');
      if (!response.ok) throw new Error('Error al obtener empleados');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  const saveProduct = async () => {
    setSubmitted(true);
    if (product.idEmpleado) {
      let _products = [...products];
      let _product = { ...product };
      const method = _product.idEmpleado ? 'PUT' : 'POST';
      const url = _product.idEmpleado
        ? `http://localhost:8080/employee/${_product.idEmpleado}`
        : 'http://localhost:8080/employee';

      try {
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(_product)
        });

        if (!response.ok) throw new Error('Error al guardar el empleado');

        fetchEmployees();
        setProducts(_products);
        setProductDialog(false);
        setProduct(emptyProduct);
      } catch (error) {
        console.error('Error al guardar el empleado:', error);
      }
    }
  };

  const handleEdit = async (employee) => {
    setProduct({ ...employee });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    if (product.idEmpleado) {
      try {
        const response = await fetch(`http://localhost:8080/employee/${product.idEmpleado}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Error al eliminar el empleado');
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        fetchEmployees();
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Empleado Eliminado', life: 3000 });
      } catch (error) {
        console.error('Error al eliminar el empleado:', error);
      }
    } else if (selectedProducts && selectedProducts.length > 0) {
      try {
        const deletePromises = selectedProducts.map((prod) =>
          fetch(`http://localhost:8080/employee/${prod.idEmpleado}`, { method: 'DELETE' })
        );
        await Promise.all(deletePromises);
        setDeleteProductDialog(false);
        setSelectedProducts(null);
        fetchEmployees();
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Empleados Eliminados', life: 3000 });
      } catch (error) {
        console.error('Error al eliminar los empleados:', error);
      }
    } else {
      console.error('No se puede eliminar el empleado. ID de empleado no encontrado.');
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
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };
    _product[`${name}`] = val;
    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => confirmDeleteProduct(selectedProducts)}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={() => dt.current.exportCSV()} />;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => handleEdit(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Employees</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
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
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
    </React.Fragment>
  );

  const rowClassName = (rowData) => {
    return {
      'eliminated-row': rowData.estadoEmpleado === '0'
    };
  };

  const statusBodyTemplate = (rowData) => {
    const severity = getSeverity(rowData.estadoEmpleado);
    return <Tag value={severity === 'success'} severity={severity}>{severity === 'success' ? 'Habilitado' : 'Deshabilitado'}</Tag>;
  };

  const getSeverity = (estadoEmpleado) => {
    switch (estadoEmpleado) {
      case '1':
      case 'Habilitado':
        return 'success';
      case '0':
        return 'warning';
      default:
        return null;
    }
  };

  function updateCargo(selectedCargoId) {
    // Update the state with the selected cargo ID
    setProduct({ ...product, idCargo: selectedCargoId });
  }
  function updatePersona(selectedPersonaId) {
    // Update the state with the selected cargo ID
    setProduct({ ...product, idPersona: selectedPersonaId });
  }

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
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
          <Column field="fechaIng" header="Fecha Ingreso" sortable></Column>
          <Column field="horaEntrada" header="Hora Entrada" sortable></Column>
          <Column field="horaSalida" header="Hora Salida" sortable></Column>
          <Column field="turno" header="Turno" sortable></Column>
          <Column field="idPersona" header="Persona" sortable></Column>
          <Column field="idCargo" header="Cargo" sortable></Column>
          <Column field="estadoEmpleado" header="Estado" body={statusBodyTemplate} sortable></Column>
          <Column body={actionBodyTemplate} exportable={false}></Column>
        </DataTable>
      </div>

      <Dialog visible={productDialog} style={{ width: '450px' }} header="Employee Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="idPersona">Persona</label>
          <Dropdown
            id="personADropdown"
            value={product.idPersona}
            options={personas}
            onChange={(e) => updatePersona(e.value)}  // Update function passed here
            optionLabel="nombrePersona"  // Assuming property for person name
            optionValue="idPersona"
            placeholder="Seleccione a persona"
          />
        </div>

        <div className="field">
          <label htmlFor="idCargo">Cargo</label>
          <Dropdown
            id="idCargo"
            value={product.idCargo}
            options={cargos}
            onChange={(e) => updateCargo(e.value)}  // Update function passed here
            optionLabel="nombreCargo"  // Assuming property for cargo name
            optionValue="idCargo"
            placeholder="Seleccione a cargo"
          />
        </div>

        <div className="field">
          <label htmlFor="sueldo">Sueldo</label>
          <InputText id="sueldo" value={product.sueldo} onChange={(e) => onInputChange(e, 'sueldo')} required className={classNames({ 'p-invalid': submitted && !product.sueldo })} />
          {submitted && !product.sueldo && <small className="p-error">Sueldo is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="fechaIng">Fecha Ingreso</label>
          <InputText id="fechaIng" value={product.fechaIng} onChange={(e) => onInputChange(e, 'fechaIng')} required className={classNames({ 'p-invalid': submitted && !product.fechaIng })} />
          {submitted && !product.fechaIng && <small className="p-error">Fecha Ingreso is required.</small>}
        </div>

        <div className="field">
          <label htmlFor="horaEntrada">Hora Entrada</label>
          <InputText id="horaEntrada" value={product.horaEntrada} onChange={(e) => onInputChange(e, 'horaEntrada')} required className={classNames({ 'p-invalid': submitted && !product.horaEntrada })} />
          {submitted && !product.horaEntrada && <small className="p-error">Hora Entrada is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="horaSalida">Hora Salida</label>
          <InputText id="horaSalida" value={product.horaSalida} onChange={(e) => onInputChange(e, 'horaSalida')} required className={classNames({ 'p-invalid': submitted && !product.horaSalida })} />
          {submitted && !product.horaSalida && <small className="p-error">Hora Salida is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="turno">Turno</label>
          <InputText id="turno" value={product.turno} onChange={(e) => onInputChange(e, 'turno')} required className={classNames({ 'p-invalid': submitted && !product.turno })} />
          {submitted && !product.turno && <small className="p-error">Turno is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="estadoEmpleado">Turno</label>
          <InputText id="estadoEmpleado" value={product.estadoEmpleado} onChange={(e) => onInputChange(e, 'estadoEmpleado')} required className={classNames({ 'p-invalid': submitted && !product.estadoEmpleado })} />
          {submitted && !product.estadoEmpleado && <small className="p-error">Turno is required.</small>}
        </div>
      </Dialog>

      <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {product && (
            <span>
              Are you sure you want to delete the employee <b>{product.sueldo}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}