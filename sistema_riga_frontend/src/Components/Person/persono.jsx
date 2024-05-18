import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';

const Person = () => {
  const [personas, setPersonas] = useState([]);
  const [formData, setFormData] = useState({
    idPersona: '',
    dni: '',
    nombrePersona: '',
    genero: '',
    fechaNac: '',
    correo: '',
    celular: '',
    direccion: '',
    idDistrito: '',
    apePaterno: '',
    apeMaterno: '',
    estadoPersona: '', // Este campo solo se usará para actualizar
  });
  const [error, setError] = useState(null);
  const [formSide, setFormSide] = useState(null);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await fetch('http://localhost:8080/person');
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de personas');
        }
        const data = await response.json();
        setPersonas(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPersonas();
  }, []);

  const handleActualizar = (id) => {
    const persona = personas.find((p) => p.idPersona === id);
    setFormData({
      idPersona: persona.idPersona,
      dni: persona.dni,
      nombrePersona: persona.nombrePersona,
      genero: persona.genero,
      fechaNac: persona.fechaNac,
      correo: persona.correo,
      celular: persona.celular,
      direccion: persona.direccion,
      idDistrito: persona.idDistrito,
      apePaterno: persona.apePaterno,
      apeMaterno: persona.apeMaterno,
      estadoPersona: persona.estadoPersona,
    });
    setFormSide('right');
  };

  const handleEliminar = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/person/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('No se pudo eliminar la persona');
      }
      // Recargar la lista de personas después de eliminar
      const updatedPersonas = personas.filter((p) => p.idPersona !== id);
      setPersonas(updatedPersonas);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (formData.idPersona) {
        response = await fetch(`http://localhost:8080/person/${formData.idPersona}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Excluir el campo estadoPersona en el formulario de inserción
        const { estadoPersona, ...data } = formData;
        response = await fetch('http://localhost:8080/person', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }
      if (!response.ok) {
        throw new Error('No se pudo guardar la persona');
      }
      // Recargar la lista de personas después de insertar o actualizar
      const newData = await response.json();
      const updatedPersonas = formData.idPersona
        ? personas.map((p) => (p.idPersona === formData.idPersona ? newData : p))
        : [...personas, newData];
      setPersonas(updatedPersonas);
      setFormSide(null);
      setFormData({
        idPersona: '',
        dni: '',
        nombrePersona: '',
        genero: '',
        fechaNac: '',
        correo: '',
        celular: '',
        direccion: '',
        idDistrito: '',
        apePaterno: '',
        apeMaterno: '',
        estadoPersona: '',
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article>
      <div>
        <Header />
        <section>
          <div className='usuario'>
            <h1>USUARIOS</h1>
          </div>
          <div className='global'>
            <div className='tabla'>
              <table>
                <thead>
                  <tr>
                    <th>Nombres</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>DNI</th>
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
                  {personas.map((persona) => (
                    <tr key={persona.idPersona}>
                      <td>{persona.nombrePersona}</td>
                      <td>{persona.apePaterno}</td>
                      <td>{persona.apeMaterno}</td>
                      <td>{persona.dni}</td>
                      <td>{persona.genero}</td>
                      <td>{persona.fechaNac}</td>
                      <td>{persona.correo}</td>
                      <td>{persona.celular}</td>
                      <td>{persona.direccion}</td>
                      <td>{persona.idDistrito}</td>
                      <td>
                        <button onClick={() => handleActualizar(persona.idPersona)}>Actualizar</button>
                        <button onClick={() => handleEliminar(persona.idPersona)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='botonInsertar'>
              <button onClick={() => setFormSide('right')}>Insertar Persona</button>
            </div>
            {formSide && (
              <div className={`formulario ${formSide}`}>
                <h2>{formSide === 'right' ? 'Insertar Persona' : 'Actualizar Persona'}</h2>
                <form onSubmit={handleSubmit}>
                  <input type='text' name='dni' value={formData.dni} onChange={handleChange} placeholder='DNI' />
                  <input
                    type='text'
                    name='nombrePersona'
                    value={formData.nombrePersona}
                    onChange={handleChange}
                    placeholder='Nombre'
                  />
                  <input
                    type='text'
                    name='apePaterno'
                    value={formData.apePaterno}
                    onChange={handleChange}
                    placeholder='Apellido Paterno'
                  />
                  <input
                    type='text'
                    name='apeMaterno'
                    value={formData.apeMaterno}
                    onChange={handleChange}
                    placeholder='Apellido Materno'
                  />
                  <input
                    type='text'
                    name='genero'
                    value={formData.genero}
                    onChange={handleChange}
                    placeholder='Género'
                  />
                  <input
                    type='date'
                    name='fechaNac'
                    value={formData.fechaNac}
                    onChange={handleChange}
                    placeholder='Fecha de Nacimiento'
                  />
                  <input
                    type='email'
                    name='correo'
                    value={formData.correo}
                    onChange={handleChange}
                    placeholder='Correo Electrónico'
                  />
                  <input
                    type='tel'
                    name='celular'
                    value={formData.celular}
                    onChange={handleChange}
                    placeholder='Número de Celular'
                  />
                  <input
                    type='text'
                    name='direccion'
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder='Dirección'
                  />
                  <input
                    type='text'
                    name='idDistrito'
                    value={formData.idDistrito}
                    onChange={handleChange}
                    placeholder='ID Distrito'
                  />
                  {formSide !== 'right' && (
                    <input
                      type='text'
                      name='estadoPersona'
                      value={formData.estadoPersona}
                      onChange={handleChange}
                      placeholder='Estado Persona'
                    />
                  )}
                  <button type='submit'>
                    {formSide === 'right' ? 'Insertar Persona' : 'Guardar Cambios'}
                  </button>
                </form>
              </div>
            )}
          </div>
          {error && <p>Error: {error}</p>}
        </section>
      </div>
    </article>
  );
};

export default Person;
