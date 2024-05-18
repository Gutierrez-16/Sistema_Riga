import React, { useState, useEffect } from 'react';

const Persona = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [selectedDepartamentoNombre, setSelectedDepartamentoNombre] = useState('');
  const [selectedProvinciaNombre, setSelectedProvinciaNombre] = useState('');

  const [formData, setFormData] = useState({
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
  const [selectedName, setSelectedName] = useState('');

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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProvincias = async (idDepartamento) => {
    console.log('Tu IDDEPART ES: ', idDepartamento);
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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.text();
      console.log('Respuesta:', data);
      fetchPersonas();
      setFormData({
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
    setFormData({ ...persona, idDistrito: persona.idDistrito, nombreProvincia: '', nombreDepartamento: '' });
    setSelectedName(persona.nombrePersona);

    const idDistrito = persona.idDistrito;
    try {
      const provinciaResponse = await fetch(`http://localhost:8080/person/provincias/distrito/${idDistrito}`);
      const provinciaData = await provinciaResponse.json();
      if (provinciaData && provinciaData.length > 0) {
        const departamentoId = provinciaData[0].idProvincia;
        const provinciaNombre = provinciaData[0].nombreProvincia;


        console.log('TU IDDEPART ES', departamentoId);
        console.log('TU PROVINCIA ES: ', provinciaNombre);

        setFormData(prevFormData => ({
          ...prevFormData,
          nombreProvincia: provinciaNombre
        }));
        fetchProvincias(departamentoId);
        const departamentoResponse = await fetch(`http://localhost:8080/person/departamentos/provincia/${provinciaNombre}`);
        const departamentoData = await departamentoResponse.json();
        if (departamentoData && departamentoData.length > 0) {
          const departamentoNombre = departamentoData[0].nombreDepartamento;
          console.log('DEPARTAMENTO: ', departamentoNombre);

          setSelectedDepartamentoNombre(departamentoNombre);

          setFormData(prevFormData => ({
            ...prevFormData,
            nombreDepartamento: departamentoNombre
          }));

        } else {
          console.error('No se encontraron datos de departamento para la provincia:', provinciaNombre);
        }
      } else {
        console.error('No se encontraron datos de provincia para el distrito:', idDistrito);
      }
    } catch (error) {
      console.error('Error al obtener provincias o departamentos:', error);
    }
  };


  return (
    <div>

      <label>
        Nombre:
        <select value={selectedName} onChange={(e) => setSelectedName(e.target.value)}>
          <option value="">Selecciona un nombre</option>
          {personas.map((persona, index) => (
            <option key={index} value={persona.nombrePersona}>
              {persona.nombrePersona}
            </option>
          ))}
        </select>
      </label>

      <h2>Registrar Persona</h2>
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
        {/* Departamentos */}
        <label>
          Departamento:
          <select onChange={(e) => { fetchProvincias(e.target.value); }} value={selectedDepartamentoNombre}>
            <option value="">Selecciona un departamento</option>
            {departamentos.map((departamento) => (
              <option key={departamento.idDepartamento} value={departamento.nombreDepartamento}>
                {departamento.nombreDepartamento}
              </option>
            ))}
          </select>
        </label>

        <br />

        {/* Provincias */}
        <label>
          Provincia:
          <select onChange={(e) => { fetchDistritos(e.target.value); }} value={formData.idProvincia}>
            <option value="">Selecciona una provincia</option>
            {provincias.length > 0 ? (
              provincias.map((provincia, index) => (
                <option key={index} value={provincia.idProvincia}>
                  {provincia.nombreProvincia}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Cargando provincias...
              </option>
            )}
          </select>
        </label>
        <br />

        {/* Distritos */}
        <label>
          Distrito:
          <select name="idDistrito" value={formData.idDistrito} onChange={handleInputChange}>
            <option value="">Selecciona un distrito</option>
            {distritos.length > 0 ? (
              distritos.map((distrito, index) => (
                <option key={index} value={distrito.idDistrito}>
                  {distrito.nombreDistrito}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Cargando distritos...
              </option>
            )}
          </select>
        </label>


        <br />

        <button type="submit">Registrar</button>
      </form>

      <div>
        <h2>Personas Registradas</h2>
        {/* Tabla de personas */}
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
            {personas.map((persona, index) => (
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Persona;