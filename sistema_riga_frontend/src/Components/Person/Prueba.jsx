import React, { useState, useEffect } from 'react';

const Prueba = () => {
  // Estados para los valores seleccionados en los combobox
  const [combo1, setCombo1] = useState('');
  const [combo2, setCombo2] = useState('');
  const [combo3, setCombo3] = useState('');

  // Estados para almacenar los datos de las APIs
  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);

  // Estado para almacenar los distritos seleccionados en la tabla
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  // Obtener los departamentos al montar el componente
  useEffect(() => {
    fetch('http://localhost:8080/person/departamentos')
      .then(response => response.json())
      .then(data => setDepartamentos(data))
      .catch(error => console.error('Error fetching departamentos:', error));
  }, []);

  // Función para manejar el cambio en el primer combobox (departamentos)
  const handleCombo1Change = (event) => {
    const value = event.target.value;
    setCombo1(value);
    setCombo2('');
    setCombo3('');
  };

  // Efecto secundario para actualizar las provincias cuando cambia el departamento seleccionado
  useEffect(() => {
    // Filtrar provincias basadas en el departamento seleccionado
    const filteredProvincias = provincias.filter(provincia => provincia.nombreDepartamento === combo1);
    setProvincias(filteredProvincias);
  }, [combo1]); // Dependencia: combo1

  // Función para manejar el cambio en el segundo combobox (provincias)
  const handleCombo2Change = (event) => {
    const value = event.target.value;
    setCombo2(value);
    setCombo3('');

    // Filtrar distritos basados en la provincia seleccionada
    fetch(`http://localhost:8080/person/provincias/distrito/${value}`)
      .then(response => response.json())
      .then(data => setDistritos(data))
      .catch(error => console.error('Error fetching distritos:', error));
  };

  // Función para manejar el cambio en el tercer combobox (distritos)
  const handleCombo3Change = (event) => {
    setCombo3(event.target.value);
  };

  // Función para agregar el distrito seleccionado a la tabla
  const handleAddDistrict = () => {
    // Convertir combo3 a número
    const selectedDistrictId = parseInt(combo3, 10);
  
    // Buscar el distrito seleccionado en el array de distritos
    const selectedDistrict = distritos.find(distrito => distrito.idDistrito === selectedDistrictId);
    
    console.log(selectedDistrict);
    
    if (selectedDistrict) {
      setSelectedDistricts([...selectedDistricts, selectedDistrict]);
    }
  };

  // Función para manejar la edición de un distrito
  const handleEditDistrict = (selectedDistrict) => {
    // Filtrar provincias basadas en el departamento del distrito seleccionado
    const filteredProvincias = provincias.filter(provincia => provincia.nombreDepartamento === selectedDistrict.nombreDepartamento);
    setProvincias(filteredProvincias);

    setCombo1(selectedDistrict.nombreDepartamento);
    setCombo2(selectedDistrict.nombreProvincia);
    setCombo3(selectedDistrict.idDistrito);
  };

  return (
    <div>
      <label>Combo 1 (Departamento):</label>
      <select value={combo1} onChange={handleCombo1Change}>
        <option value="">Selecciona</option>
        {departamentos.map(departamento => (
          <option key={departamento.idDepartamento} value={departamento.nombreDepartamento}>
            {departamento.nombreDepartamento}
          </option>
        ))}
      </select>

      <label>Combo 2 (Provincia):</label>
      <select value={combo2} onChange={handleCombo2Change} disabled={!combo1}>
        <option value="">Selecciona</option>
        {provincias.map(provincia => (
          <option key={provincia.idProvincia} value={provincia.idProvincia}>
            {provincia.nombreProvincia}
          </option>
        ))}
      </select>

      <label>Combo 3 (Distrito):</label>
      <select value={combo3} onChange={handleCombo3Change} disabled={!combo2}>
        <option value="">Selecciona</option>
        {distritos.map(distrito => (
          <option key={distrito.idDistrito} value={distrito.idDistrito}>
            {distrito.nombreDistrito}
          </option>
        ))}
      </select>

      <button onClick={handleAddDistrict}>Agregar Distrito</button>
      <h2>Distritos Seleccionados</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Distrito</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {selectedDistricts.map((distrito, index) => (
            <tr key={index}>
              <td>{distrito.idDistrito}</td>
              <td>{distrito.nombreDistrito}</td>
              <td><button onClick={() => handleEditDistrict(distrito)}>Editar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Prueba;
