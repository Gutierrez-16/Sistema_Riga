import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
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
        idEmpresa: '',
        ruc: '',
        razonSocial: '',
        direccion: '',
        idDistrito: '',
        idProvincia: '',
        idDepartamento: '',
        estadoEmpresa: '1'
    };

    const [departamentos, setDepartamentos] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [distritos, setDistritos] = useState([]);
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
        fetchDepartamentos();
        fetchEmpresas();
    }, []);

    const fetchDepartamentos = async () => {
        try {
            const response = await fetch('http://localhost:8080/departamento');
            if (!response.ok) throw new Error('Error al obtener departamentos');
            const data = await response.json();
            setDepartamentos(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProvincias = async (departamentoId) => {
        try {
            setProduct((prevProduct) => ({ ...prevProduct, idDepartamento: departamentoId }));
            setProvincias([]);
            setDistritos([]);
            const response = await fetch(`http://localhost:8080/provincia/departamento/${departamentoId}`);
            if (!response.ok) throw new Error('Error al obtener provincias');
            const data = await response.json();
            setProvincias(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDistritos = async (idProvincia) => {
        try {
            setProduct((prevProduct) => ({ ...prevProduct, idProvincia }));
            setDistritos([]);
            const response = await fetch(`http://localhost:8080/distrito/provincia/${idProvincia}`);
            if (!response.ok) throw new Error('Error al obtener distritos');
            const data = await response.json();
            setDistritos(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchEmpresas = async () => {
        try {
            const response = await fetch('http://localhost:8080/empresa');
            if (!response.ok) throw new Error('Error al obtener empresas');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error al obtener empresas:', error);
        }
    };

    const saveProduct = async () => {
        setSubmitted(true);

        if (product.razonSocial.trim()) {
            const method = product.idEmpresa ? 'PUT' : 'POST';
            const url = product.idEmpresa
                ? `http://localhost:8080/empresa/${product.idEmpresa}`
                : 'http://localhost:8080/empresa';

            try {
                const response = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(product)
                });

                if (!response.ok) throw new Error('Error al guardar la empresa');

                fetchEmpresas();
                setProductDialog(false);
                setProduct(emptyProduct);
            } catch (error) {
                console.error('Error al guardar la empresa:', error);
            }
        }
    };

    const handleEdit = async (empresa) => {
        setProduct({ ...empresa });
        setProductDialog(true);

        const { idDistrito } = empresa;
        try {
            const provinciaResponse = await fetch(`http://localhost:8080/provincia/distrito/${idDistrito}`);
            if (!provinciaResponse.ok) {
                throw new Error('Error al obtener la provincia');
            }
            const provinciaData = await provinciaResponse.json();
            const provinciaNombre = provinciaData.nombreProvincia;

            const departamentoResponse = await fetch(`http://localhost:8080/departamento/provincia/${provinciaNombre}`);
            if (!departamentoResponse.ok) throw new Error('Error al obtener departamentos');

            const departamentoData = await departamentoResponse.json();

            setProduct((prevFormData) => ({
                ...prevFormData,
                idProvincia: provinciaData.idProvincia,
                idDepartamento: departamentoData.idDepartamento
            }));

            await fetchProvincias(departamentoData.idDepartamento);
            await fetchDistritos(provinciaData.idProvincia);
        } catch (error) {
            console.error('Error al obtener provincias o departamentos:', error);
        }
    };

    const editProduct = async (product) => {
        handleEdit(product);
    };

    const confirmDeleteProduct = (product) => {
        if (Array.isArray(product)) {
            setSelectedProducts(product);
        } else {
            setProduct(product);
        }
        setDeleteProductDialog(true);
    };

    const deleteProduct = async () => {
        if (product.idEmpresa) {
            try {
                const response = await fetch(`http://localhost:8080/empresa/${product.idEmpresa}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Error al eliminar la empresa');
                setDeleteProductDialog(false);
                setProduct(emptyProduct);
                fetchEmpresas();
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Empresa Eliminada', life: 3000 });
            } catch (error) {
                console.error('Error al eliminar la empresa:', error);
            }
        } else if (selectedProducts && selectedProducts.length > 0) {
            try {
                for (const prod of selectedProducts) {
                    await fetch(`http://localhost:8080/empresa/${prod.idEmpresa}`, { method: 'DELETE' });
                }
                setDeleteProductDialog(false);
                setSelectedProducts(null);
                fetchEmpresas();
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Empresas Eliminadas', life: 3000 });
            } catch (error) {
                console.error('Error al eliminar las empresas:', error);
            }
        } else {
            console.error('No se puede eliminar la empresa. ID de empresa no encontrado.');
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
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Empresas</h4>
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

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.estadoEmpresa === '1' ? 'ACTIVO' : 'INACTIVO'} severity={getSeverity(rowData)} />;
    };

    const getSeverity = (product) => {
        switch (product.estadoEmpresa) {
            case '1':
                return 'success';
            case '0':
                return 'warning';
            default:
                return null;
        }
    };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable
                        ref={dt}
                        value={products}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="idEmpresa"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        header={header}
                    >
                        <Column selectionMode="multiple" exportable={false}></Column>
                        <Column field="ruc" header="RUC" sortable></Column>
                        <Column field="razonSocial" header="Razon Social" sortable></Column>
                        <Column field="direccion" header="Direccion" sortable></Column>
                        <Column field="distrito" header="Distrito" sortable></Column>
                        <Column field="provincia" header="Provincia" sortable></Column>
                        <Column field="departamento" header="Departamento" sortable></Column>
                        <Column field="estadoEmpresa" header="Estado Empresa" body={statusBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Company Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="ruc">RUC</label>
                            <InputText id="ruc" value={product.ruc} onChange={(e) => onInputChange(e, 'ruc')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.ruc })} />
                            {submitted && !product.ruc && <small className="p-error">RUC is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="razonSocial">Razon Social</label>
                            <InputTextarea id="razonSocial" value={product.razonSocial} onChange={(e) => onInputChange(e, 'razonSocial')} required rows={3} cols={20} />
                        </div>
                        <div className="field">
                            <label htmlFor="direccion">Direccion</label>
                            <InputTextarea id="direccion" value={product.direccion} onChange={(e) => onInputChange(e, 'direccion')} required rows={3} cols={20} />
                        </div>
                        <div className="field">
                            <label htmlFor="departamento">Departamento</label>
                            <Dropdown id="departamento" value={product.idDepartamento} options={departamentos} onChange={(e) => fetchProvincias(e.value)} optionLabel="nombreDepartamento" placeholder="Select a Department" />
                        </div>
                        <div className="field">
                            <label htmlFor="provincia">Provincia</label>
                            <Dropdown id="provincia" value={product.idProvincia} options={provincias} onChange={(e) => fetchDistritos(e.value)} optionLabel="nombreProvincia" placeholder="Select a Province" />
                        </div>
                        <div className="field">
                            <label htmlFor="distrito">Distrito</label>
                            <Dropdown id="distrito" value={product.idDistrito} options={distritos} onChange={(e) => onInputChange(e, 'idDistrito')} optionLabel="nombreDistrito" placeholder="Select a District" />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete <b>{product.razonSocial}</b>?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
