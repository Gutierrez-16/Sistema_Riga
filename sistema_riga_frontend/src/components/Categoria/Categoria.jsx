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
    idCategoria: '',
    nombreCategoria: '',
    estadoCategoria: '1'
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
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:8080/categoria');
      if (!response.ok) throw new Error('Error al obtener categoria');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveProduct = async () => {
    setSubmitted(true);
    if (product.nombreCategoria.trim()) {
      const method = product.idCategoria ? 'PUT' : 'POST';
      const url = product.idCategoria
        ? `http://localhost:8080/categoria/${product.idCategoria}`
        : 'http://localhost:8080/categoria';

      try {
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product)
        });

        if (!response.ok) throw new Error('Error al guardar el categoria');

        fetchCategorias();
        setProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Cargo guardado', life: 3000 });
      } catch (error) {
        console.error('Error al guardar el categoria:', error);
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
    if (product.idCategoria) {
      try {
        const response = await fetch(`http://localhost:8080/categoria/${product.idCategoria}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Error al eliminar el categoria');
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        fetchCategorias();
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Cargo Eliminado', life: 3000 });
      } catch (error) {
        console.error('Error al eliminar el categoria:', error);
      }
    } else if (selectedProducts && selectedProducts.length > 0) {
      try {
        const deletePromises = selectedProducts.map((prod) =>
          fetch(`http://localhost:8080/categoria/${prod.idCategoria}`, { method: 'DELETE' })
        );
        await Promise.all(deletePromises);
        setDeleteProductDialog(false);
        setSelectedProducts(null);
        fetchCategorias();
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'categoria Eliminados', life: 3000 });
      } catch (error) {
        console.error('Error al eliminar los categoria:', error);
      }
    } else {
      console.error('No se puede eliminar el categoria. ID de categoria no encontrado.');
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
        <h5 className="m-0 ">Manage Companies</h5>
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
      'eliminated-row': rowData.estadoCategoria === '0'
    };
  };

  const statusBodyTemplate = (rowData) => {
    const severity = getSeverity(rowData.estadoCategoria);
    return <Tag value={severity === 'success'} severity={severity}>{severity === 'success' ? 'Habilitado' : 'Deshabilitado'}</Tag>;
  };

  const getSeverity = (estadoCategoria) => {
    switch (estadoCategoria) {
      case '1':
      case 'Habilitado':
        return 'success';
      case '0':
        return 'warning';
      default:
        return null;
    }
  };

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
          dataKey="idCategoria"
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
          <Column field="idCategoria" header="ID" sortable></Column>
          <Column field="nombreCategoria" header="Nombre Categoria" sortable></Column>
          <Column field="estadoCategoria" header="Estado" body={statusBodyTemplate} sortable></Column>
          <Column body={actionBodyTemplate} exportable={false}></Column>
        </DataTable>
      </div>

      <Dialog visible={productDialog} style={{ width: '450px' }} header="Cargo Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="nombreCategoria">Nombre Categoria</label>
          <InputText id="nombreCategoria" value={product.nombreCategoria} onChange={(e) => onInputChange(e, 'nombreCategoria')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.nombreCategoria })} />
          {submitted && !product.nombreCategoria && <small className="p-error">Nombre Cargo is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="estadoCategoria">Estado</label>
          <Dropdown id="estadoCategoria" value={product.estadoCategoria} options={[{ label: 'Habilitado', value: '1' }, { label: 'Deshabilitado', value: '0' }]} onChange={(e) => onInputChange(e, 'estadoCategoria')} placeholder="Seleccione un estado" className={classNames({ 'p-invalid': submitted && !product.estadoCategoria })} />
          {submitted && !product.estadoCategoria && <small className="p-error">Estado is required.</small>}
        </div>
      </Dialog>

      <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {product && (
            <span>
              Are you sure you want to delete the cargo <b>{product.nombreCategoria}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
