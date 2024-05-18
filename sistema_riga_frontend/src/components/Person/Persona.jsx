import React, { useState, useEffect } from 'react';

const Persona = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [selectedDepartamentoId, setSelectedDepartamentoId] = useState('');
  const [selectedProvinciaId, setSelectedProvinciaId] = useState('');
  const [formData, setFormData] = useState({
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
    idDistrito: '',
    idProvincia: '',
    idDepartamento: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage] = useState(10);

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
    setSelectedDepartamentoId(idDepartamento);
    setProvincias([]);
    setDistritos([]);
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
    setSelectedProvinciaId(idProvincia);
    setDistritos([]);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:8080/person/${formData.idPersona}`
      : 'http://localhost:8080/person';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.text();
      console.log('Respuesta:', data);
      fetchPersonas();
      setFormData({
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
        idDistrito: '',
        idProvincia: '',
        idDepartamento: ''
      });
      setIsEditing(false);
      
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
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

  const handleEdit = async (persona) => {
    setFormData({ ...persona, idDistrito: persona.idDistrito });
    setIsEditing(true);
    setSelectedName(persona.nombrePersona);
  
    const idDistrito = persona.idDistrito;
    console.log(`Selected Persona ID: ${persona.idPersona}`);
    console.log(`Selected Distrito ID: ${idDistrito}`);
  
    let provincia; // Declara la variable provincia aquí
  
    try {
      // Fetch the province corresponding to the district
      const provinciaResponse = await fetch(`http://localhost:8080/person/provincias/distrito/${idDistrito}`);
      const provinciaData = await provinciaResponse.json();
      if (provinciaData && provinciaData.length > 0) {
        provincia = provinciaData[0]; // Asigna el valor dentro del bloque if
        const provinciaNombre = provincia.nombreProvincia;
        console.log(`Fetched Provincia Nombre: ${provinciaNombre}, ID: ${provincia.idProvincia}`);
  
        setFormData((prevFormData) => ({
          ...prevFormData,
          idProvincia: provincia.idProvincia
        }));
  
        // Fetch provinces for the selected department
        await fetchProvincias(provincia.idDepartamento);
  
        // Fetch the department corresponding to the province
        const departamentoResponse = await fetch(`http://localhost:8080/person/departamentos/provincia/${provinciaNombre}`);
        const departamentoData = await departamentoResponse.json();
        if (departamentoData && departamentoData.length > 0) {
          const departamento = departamentoData[0];
          console.log(`Fetched Departamento Nombre: ${departamento.nombreDepartamento}, ID: ${departamento.idDepartamento}`);
  
          setFormData((prevFormData) => ({
            ...prevFormData,
            idDepartamento: departamento.idDepartamento
          }));
          setSelectedDepartamentoId(departamento.idDepartamento);
  
          // Fetch provinces for the selected department again (in case they were not fetched previously)
          await fetchProvincias(departamento.idDepartamento);
        }
      }
  
      // Fetch all districts for the selected province
      await fetchDistritos(provincia.idProvincia); // Ahora provincia está definida en este punto
    } catch (error) {
      console.error('Error al obtener provincias o departamentos:', error);
    }
  };
  

  const handleDelete = async (idPersona) => {
    try {
      const response = await fetch(`http://localhost:8080/person/${idPersona}`, {
        method: 'DELETE'
      });

      const data = await response.text();
      console.log('Respuesta:', data);
      fetchPersonas();
    } catch (error) {
      console.error('Error al eliminar persona:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastPersona = activePage * itemsCountPerPage;
  const indexOfFirstPersona = indexOfLastPersona - itemsCountPerPage;
  const currentPersonas = personas.slice(indexOfFirstPersona, indexOfLastPersona);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(personas.length / itemsCountPerPage); i++) {
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
      <h2>{isEditing ? 'Actualizar Persona' : 'Registrar Persona'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          DNI:
          <input type="text" name="dni" value={formData.dni} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Nombre:
          <input type="text" name="nombrePersona" value={formData.nombrePersona} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Apellido Paterno:
          <input type="text" name="apePaterno" value={formData.apePaterno} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Apellido Materno:
          <input type="text" name="apeMaterno" value={formData.apeMaterno} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Género:
          <select name="genero" value={formData.genero} onChange={handleInputChange}>
            <option value="">Selecciona el género</option>
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
        </label>
        <br />
        <label>
          Fecha de Nacimiento:
          <input type="date" name="fechaNac" value={formData.fechaNac} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Correo:
          <input type="email" name="correo" value={formData.correo} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Celular:
          <input type="tel" name="celular" value={formData.celular} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Dirección:
          <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} />
        </label>
        <br />
        
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
        <h2>Personas Registradas</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Género</th>
              <th>Fecha de Nacimiento</th>
              <th>Correo</th>
              <th>Celular</th>
              <th>Dirección</th>
              <th>Distrito</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentPersonas.map((persona, index) => (
              <tr key={index}>
                <td>{persona.idPersona}</td>
                <td>{persona.dni}</td>
                <td>{persona.nombrePersona}</td>
                <td>{persona.apePaterno}</td>
                <td>{persona.apeMaterno}</td>
                <td>{persona.genero}</td>
                <td>{persona.fechaNac}</td>
                <td>{persona.correo}</td>
                <td>{persona.celular}</td>
                <td>{persona.direccion}</td>
                <td>{persona.idDistrito}</td>
                <td>
                  <button onClick={() => handleEdit(persona)}>Editar</button>
                  <button onClick={() => handleDelete(persona.idPersona)}>Eliminar</button>
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

export default Persona;
