import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header/Header';
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
import './EmpresaStyle.css';
export default function ProductsDemo() {
    let emptyProduct = {
        idEmpresa: '',
        ruc: '',
        razonSocial: '',
        direccion: '',
        idDistrito: '',
        idProvincia: '',
        idDepartamento: '',
        estado: 1 // Añadir el estado aquí
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
            let _products = [...products];
            let _product = { ...product };
            
            const payload = {
                ruc: _product.ruc,
                razonSocial: _product.razonSocial,
                direccion: _product.direccion,
                idDistrito: _product.idDistrito
            };

            const method = _product.idEmpresa ? 'PUT' : 'POST';
            const url = _product.idEmpresa
                ? `http://localhost:8080/empresa/${_product.idEmpresa}`
                : 'http://localhost:8080/empresa';

            if (method === 'PUT') {
                payload.idEmpresa = _product.idEmpresa;
            }

            try {
                const response = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error al guardar la empresa:', errorText);
                    throw new Error('No se pudo guardar la empresa. Inténtalo de nuevo.');
                }

                const data = await response.json();

                if (method === 'POST') {
                    _products.push(data);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Empresa Creada', life: 3000 });
                } else {
                    const index = findIndexById(_product.idEmpresa);
                    _products[index] = data;
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Empresa Actualizada', life: 3000 });
                }

                setProducts(_products);
                setProductDialog(false);
                setProduct(emptyProduct);
            } catch (error) {
                console.error('Error al guardar la empresa:', error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
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
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = async () => {
        try {
            // Cambiar el estado de la empresa a 0 en lugar de eliminarla
            const response = await fetch(`http://localhost:8080/empresa/${product.idEmpresa}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...product, estado: 0 })
            });
            if (!response.ok) throw new Error('Error al actualizar la empresa');

            let _products = products.map((p) => (p.idEmpresa === product.idEmpresa ? { ...p, estado: 0 } : p));
            
            // Mover las empresas eliminadas al final de la lista
            _products = _products.sort((a, b) => a.estado - b.estado);

            setProducts(_products);
            setDeleteProductDialog(false);
            setProduct(emptyProduct);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Empresa Eliminada', life: 3000 });
        } catch (error) {
            console.error('Error al eliminar la empresa:', error);
        }
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].idEmpresa === id) {
                index = i;
                break;
            }
        }
        return index;
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
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
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
        return (
            <div className="flex align-items-center justify-content-end gap-2">
                <Button
                    label="Export"
                    icon="pi pi-upload"
                    className="p-button-help"
                    onClick={() => dt.current.exportCSV()}
                    disabled={!products || !products.length}
                />
            </div>
        );
    };

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Manage Companies</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    const rowClassName = (rowData) => {
        return {
            'eliminated-row': rowData.estado === 0
        };
    };

    return (
        <div>
            <Header />
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="idEmpresa" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} empresas" globalFilter={globalFilter} header={header}
                    rowClassName={rowClassName}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="idEmpresa" header="ID" sortable style={{ minWidth: '6rem' }}></Column>
                    <Column field="ruc" header="RUC" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="razonSocial" header="Razón Social" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="direccion" header="Dirección" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="idDistrito" header="Distrito" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Detalles de Empresa" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="ruc" className="font-bold">
                        RUC
                    </label>
                    <InputText id="ruc" value={product.ruc} onChange={(e) => onInputChange(e, 'ruc')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.ruc })} />
                    {submitted && !product.ruc && <small className="p-error">RUC es requerido.</small>}
                </div>
                <div className="field">
                    <label htmlFor="razonSocial" className="font-bold">
                        Razón Social
                    </label>
                    <InputText id="razonSocial" value={product.razonSocial} onChange={(e) => onInputChange(e, 'razonSocial')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.razonSocial })} />
                    {submitted && !product.razonSocial && <small className="p-error">Razón Social es requerido.</small>}
                </div>
                <div className="field">
                    <label htmlFor="direccion" className="font-bold">
                        Dirección
                    </label>
                    <InputTextarea id="direccion" value={product.direccion} onChange={(e) => onInputChange(e, 'direccion')} required rows={3} cols={20} />
                    {submitted && !product.direccion && <small className="p-error">Dirección es requerido.</small>}
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="idDepartamento" className="font-bold">
                            Departamento
                        </label>
                        <Dropdown
                            id="departamentoDropdown"
                            value={product.idDepartamento}
                            options={departamentos}
                            onChange={(e) => fetchProvincias(e.value)}
                            optionLabel="nombreDepartamento"
                            optionValue="idDepartamento"
                            placeholder="Seleccione un Departamento"
                        />
                    </div>
                    <div className="field col">
                        <label htmlFor="idProvincia" className="font-bold">
                            Provincia
                        </label>
                        <Dropdown
                            id="idProvincia"
                            value={product.idProvincia}
                            options={provincias}
                            onChange={(e) => fetchDistritos(e.value)}
                            optionLabel="nombreProvincia"
                            optionValue="idProvincia"
                            placeholder="Seleccione un Provincia"
                        />
                    </div>
                    <div className="field col">
                        <label htmlFor="idDistrito" className="font-bold">
                            Distrito
                        </label>
                        <Dropdown
                            id="idDistrito"
                            value={product.idDistrito}
                            options={distritos}
                            onChange={(e) => onInputChange(e, 'idDistrito')}
                            optionLabel="nombreDistrito"
                            optionValue="idDistrito"
                            placeholder="Seleccione un Distrito"
                        />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.razonSocial}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}
