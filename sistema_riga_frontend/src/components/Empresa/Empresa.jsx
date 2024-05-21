import React, { useState, useEffect } from 'react';

const Empresa = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [selectedDepartamentoId, setSelectedDepartamentoId] = useState('');
  const [selectedProvinciaId, setSelectedProvinciaId] = useState('');
  const [formData, setFormData] = useState({
    idEmpresa: '',
    ruc: '',
    razonSocial: '',
    direccion: '',
    idDistrito: '',
    idProvincia: '',
    idDepartamento: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      await fetchDepartamentos();
      await fetchEmpresas();
    };
    fetchData();
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

  const fetchProvincias = async (idDepartamento) => {
    try {
      setSelectedDepartamentoId(idDepartamento);
      setProvincias([]);
      setDistritos([]);
      const response = await fetch(`http://localhost:8080/provincia/departamento/${idDepartamento}`);
      if (!response.ok) throw new Error('Error al obtener provincias');
      const data = await response.json();
      setProvincias(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDistritos = async (idProvincia) => {
    try {
      setSelectedProvinciaId(idProvincia);
      setDistritos([]);
      const response = await fetch(`http://localhost:8080/distrito/provincia/${idProvincia}`);
      if (!response.ok) throw new Error('Error al obtener distritos');
      const data = await response.json();
      setDistritos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:8080/person/${formData.idEmpresa}`
      : 'http://localhost:8080/empresa';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.text();
      console.log('Respuesta:', data);
      await fetchPersonas();
      resetForm();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const fetchEmpresas = async () => {
    try {
      const response = await fetch('http://localhost:8080/empresa');
      if (!response.ok) throw new Error('Error al obtener empresas');
      const data = await response.json();
      setEmpresas(data);
    } catch (error) {
      console.error('Error al obtener empresas:', error);
    }
  };

  const handleEdit = async (empresa) => {
    setFormData({ ...empresa, idDistrito: empresa.idDistrito });
    setIsEditing(true);

    const { idDistrito } = empresa;
  try {
    const provinciaResponse = await fetch(`http://localhost:8080/provincia/distrito/${idDistrito}`);
    if (!provinciaResponse.ok) {
      throw new Error('Error al obtener la provincia');
    }
    const provinciaData = await provinciaResponse.json();

    const provinciaNombre = provinciaData.nombreProvincia;
    console.log('TU NOMBREPROV: ', provinciaNombre);


      const departamentoResponse = await fetch(`http://localhost:8080/departamento/provincia/${provinciaNombre}`);
      if (!departamentoResponse.ok) throw new Error('Error al obtener departamentos');

      const departamentoData = await departamentoResponse.json();

      console.log(departamentoData)

      const departamentoNombre = departamentoData.nombreDepartamento;
      console.log('TU DEPART: ', departamentoNombre);

      setFormData((prevFormData) => ({
        ...prevFormData,
        idProvincia: provinciaData.idProvincia,
        idDepartamento: departamentoData.idDepartamento
      }));
      setSelectedDepartamentoId(departamentoData.idDepartamento);

      await fetchProvincias(departamentoData.idDepartamento);
      await fetchDistritos(provinciaData.idProvincia);
    } catch (error) {
      console.error('Error al obtener provincias o departamentos:', error);
    }
  };

  const handleDelete = async (idEmpresa) => {
    try {
      const response = await fetch(`http://localhost:8080/empresa/${idEmpresa}`, { method: 'DELETE' });
      const data = await response.text();
      console.log('Respuesta:', data);
      await fetchPersonas();
    } catch (error) {
      console.error('Error al eliminar persona:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const resetForm = () => {
    setFormData({
      idEmpresa: '',
      ruc: '',
      razonSocial: '',
      direccion: '',
      idDistrito: '',
      idProvincia: '',
      idDepartamento: ''
    });
    setIsEditing(false);
  };

  const indexOfLastEmpresa = activePage * itemsCountPerPage;
  const indexOfFirstEmpresa = indexOfLastEmpresa - itemsCountPerPage;
  const currentEmpresas = empresas.slice(indexOfFirstEmpresa, indexOfLastEmpresa);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(empresas.length / itemsCountPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div>
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => handlePageChange(number)} disabled={number === activePage}>
            {number}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>{isEditing ? 'Actualizar Empresas' : 'Registrar Empresas'}</h2>
      <form onSubmit={handleSubmit}>
        {['ruc', 'razonSocial', 'direccion'].map((field) => (
          <div key={field}>
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
              <input type="text" name={field} value={formData[field]} onChange={handleInputChange} />
            </label>
          </div>
        ))}
        <label>
          Departamento:
          <select
            name="idDepartamento"
            onChange={(e) => {
              const selectedId = e.target.value;
              setFormData({ ...formData, idDepartamento: selectedId });
              fetchProvincias(selectedId);
            }}
            value={formData.idDepartamento}
          >
            <option value="">Selecciona un departamento</option>
            {departamentos.map((departamento) => (
              <option key={departamento.idDepartamento} value={departamento.idDepartamento}>
                {departamento.nombreDepartamento}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Provincia:
          <select
            name="idProvincia"
            onChange={(e) => {
              const selectedId = e.target.value;
              setFormData({ ...formData, idProvincia: selectedId });
              fetchDistritos(selectedId);
            }}
            value={formData.idProvincia}
          >
            <option value="">Selecciona una provincia</option>
            {provincias.map((provincia) => (
              <option key={provincia.idProvincia} value={provincia.idProvincia}>
                {provincia.nombreProvincia}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Distrito:
          <select name="idDistrito" value={formData.idDistrito} onChange={handleInputChange}>
            <option value="">Selecciona un distrito</option>
            {distritos.map((distrito) => (
              <option key={distrito.idDistrito} value={distrito.idDistrito}>
                {distrito.nombreDistrito}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">{isEditing ? 'Actualizar' : 'Registrar'}</button>
      </form>
      <div>
        <h2>Empresas Registradas</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>RUC</th>
              <th>Razon Social</th>
              <th>Dirección</th>
              <th>Distrito</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentEmpresas.map((empresa, index) => (
              <tr key={index}>
                <td>{empresa.idEmpresa}</td>
                <td>{empresa.ruc}</td>
                <td>{empresa.razonSocial}</td>
                <td>{empresa.direccion}</td>
                <td>{empresa.idDistrito}</td>
                <td>
                  <button onClick={() => handleEdit(empresa)}>Editar</button>
                  <button onClick={() => handleDelete(empresa.idEmpresa)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderPagination()}
      </div>
    </div>
  );
};

export default Empresa;