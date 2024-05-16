import React, { Component } from 'react';
import Header from '../Header/Header';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './PersonaStyle.css';

class Persona extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personas: [],
      formData: {
        dni: '',
        nombrePersona: '',
        genero: '',
        fechaNac: '',
        correo: '',
        celular: '',
        direccion: '',
        idDistrito: null,
        apePaterno: '',
        apeMaterno: '',
      },
      departamentos: [],
      provincias: [],
      distritos: [],
      selectedDepartamento: null,
      selectedProvincia: null,
      selectedDistrito: null,
      selectedPerson: null,
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.fetchPersonas();
    this.fetchDepartamentos();
  }

  fetchPersonas = async () => {
    try {
      const response = await fetch('http://localhost:8080/person');
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de personas');
      }
      const data = await response.json();
      this.setState({ personas: data });
    } catch (error) {
      console.error('Error al obtener personas:', error.message);
    }
  };

  fetchDepartamentos = async () => {
    try {
      const response = await fetch('http://localhost:8080/person/departamentos');
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de departamentos');
      }
      const data = await response.json();
      this.setState({ departamentos: data });
    } catch (error) {
      console.error('Error al obtener departamentos:', error.message);
    }
  };

  fetchProvincias = async (idDepartamento) => {
    try {
      const response = await fetch(`http://localhost:8080/person/provincias/${idDepartamento}`);
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de provincias');
      }
      const data = await response.json();
      this.setState({ provincias: data });
    } catch (error) {
      console.error('Error al obtener provincias:', error.message);
    }
  };

  fetchDistritos = async (idProvincia) => {
    try {
      const response = await fetch(`http://localhost:8080/person/distritos/${idProvincia}`);
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de distritos');
      }
      const data = await response.json();
      this.setState({ distritos: data });
    } catch (error) {
      console.error('Error al obtener distritos:', error.message);
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleDropdownChange = (name, value) => {
    this.setState({ [name]: value });

    if (name === 'selectedDepartamento') {
      this.fetchProvincias(value.idDepartamento);
    } else if (name === 'selectedProvincia') {
      this.fetchDistritos(value.idProvincia);
    }
  };

  handleSubmit = async () => {
    try {
      const { formData, selectedDistrito } = this.state;

      if (!selectedDistrito) {
        throw new Error('Por favor, seleccione un distrito.');
      }

      const dataToSend = {
        ...formData,
        idDistrito: selectedDistrito.idDistrito,
      };

      const response = await fetch('http://localhost:8080/person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('No se pudo insertar la persona');
      }

      console.log('Persona insertada exitosamente');
      this.clearForm();
    } catch (error) {
      console.error('Error al insertar persona:', error.message);
    }
  };

  handleUpdate = (selectedPerson) => {
    const { formData } = this.state;
    const { departamento, provincia, distrito, ...rest } = selectedPerson;

    this.setState({
      formData: {
        ...formData,
        ...rest,
      },
      selectedDepartamento: departamento,
      selectedProvincia: provincia,
      selectedDistrito: distrito,
      selectedPerson,
    }, () => {
      if (departamento) {
        this.fetchProvincias(departamento.idDepartamento);
      }
      if (provincia) {
        this.fetchDistritos(provincia.idProvincia);
      }
    });
  };

  clearForm = () => {
    this.setState({
      formData: {
        dni: '',
        nombrePersona: '',
        genero: '',
        fechaNac: '',
        correo: '',
        celular: '',
        direccion: '',
        idDistrito: null,
        apePaterno: '',
        apeMaterno: '',
      },
      selectedDepartamento: null,
      selectedProvincia: null,
      selectedDistrito: null,
      selectedPerson: null,
    });
  };

  handleSearchInputChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    const { formData, departamentos, provincias, distritos, selectedDepartamento, selectedProvincia, selectedDistrito, personas, selectedPerson, searchQuery } = this.state;

    const filteredPersonas = personas.filter(persona =>
      persona.nombrePersona.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.dni.includes(searchQuery)
    );

    return (
      <article>
        <div>
          <Header />
          <section>
            <div className='persona'>
              <h1>PERSONAS</h1>
            </div>
            <div className='formulario'>
              <div className='form-row'>
                <div className='form-group col'>
                  <span className='p-float-label'>
                    <InputText name='dni' value={formData.dni} onChange={this.handleInputChange} />
                    <label htmlFor='dni'>DNI</label>
                  </span>
                </div>
                <div className='form-group col'>
                  <span className='p-float-label'>
                    <InputText name='nombrePersona' value={formData.nombrePersona} onChange={this.handleInputChange} />
                    <label htmlFor='nombrePersona'>Nombre</label>
                  </span>
                </div>
                <div className='form-group col'>
                  <span className='p-float-label'>
                    <InputText name='apePaterno' value={formData.apePaterno} onChange={this.handleInputChange} />
                    <label htmlFor='apePaterno'>Apellido Paterno</label>
                  </span>
                </div>
                <div className='form-group col'>
                  <span className='p-float-label'>
                    <InputText name='apeMaterno' value={formData.apeMaterno} onChange={this.handleInputChange} />
                    <label htmlFor='apeMaterno'>Apellido Materno</label>
                  </span>
                </div>
                <div className='form-group col'>
                  <span className='p-float-label'>
                    <InputText name='genero' value={formData.genero} onChange={this.handleInputChange} />
                    <label htmlFor='genero'>Género</label>
                  </span>
                </div>
                <div className='form-group col'>
                  <span className='p-float-label'>
                    <InputText name='fechaNac' value={formData.fechaNac} onChange={this.handleInputChange} />
                    <label htmlFor='fechaNac'>Fecha de Nacimiento</label>
                  </span>
                </div>
                <div className='form-group col'>
                  <span className='p-float-label'>
                    <InputText name='correo' value={formData.correo} onChange={this.handleInputChange} />
                    <label htmlFor='correo'>Correo</label>
                  </span>
                </div>
                <div className='form-group col'>
                  <span className='p-float-label'>
                    <InputText name='celular' value={formData.celular} onChange={this.handleInputChange} />
                    <label htmlFor='celular'>Celular</label>
                  </span>
                </div>
                <div className='form-group col'>
                  <span className='p-float-label'>
                    <InputText name='direccion' value={formData.direccion} onChange={this.handleInputChange} />
                    <label htmlFor='direccion'>Dirección</label>
                  </span>
                </div>
                <div className='form-group col'>
                  <Dropdown
                    value={selectedDepartamento}
                    options={departamentos}
                    onChange={(e) => this.handleDropdownChange('selectedDepartamento', e.value)}
                    optionLabel='nombreDepartamento'
                    placeholder='Seleccione departamento'
                  />
                </div>
                <div className='form-group col'>
                  <Dropdown
                    value={selectedProvincia}
                    options={provincias}
                    onChange={(e) => this.handleDropdownChange('selectedProvincia', e.value)}
                    optionLabel='nombreProvincia'
                    placeholder='Seleccione provincia'
                    disabled={!selectedDepartamento}
                  />
                </div>
                <div className='form-group col'>
                  <Dropdown
                    value={selectedDistrito}
                    options={distritos}
                    onChange={(e) => this.handleDropdownChange('selectedDistrito', e.value)}
                    optionLabel='nombreDistrito'
                    placeholder='Seleccione distrito'
                    disabled={!selectedProvincia}
                  />
                </div>
              </div>
              <div className='button-group'>
                <Button label='Insertar' onClick={this.handleSubmit} />
                {selectedPerson && (
                  <Button label='Actualizar' onClick={() => this.handleUpdate(selectedPerson)} />
                )}
              </div>
            </div>
            <div className='search-bar'>
              <InputText value={searchQuery} onChange={this.handleSearchInputChange} placeholder='Buscar por nombre o DNI' />
              <div className='button-group'>
                <Button label='Nuevo' />
                <Button label='Eliminar' />
                <Button label='Actualizar' />
              </div>
            </div>
            <div className='table-wrapper'>
              <DataTable value={filteredPersonas} selectionMode='single' onSelectionChange={e => this.handleUpdate(e.value)} paginator rows={10} rowsPerPageOptions={[10, 20, 50]}>
                <Column field='dni' header='DNI'></Column>
                <Column field='nombrePersona' header='Nombre'></Column>
                <Column field='apePaterno' header='Apellido Paterno'></Column>
                <Column field='apeMaterno' header='Apellido Materno'></Column>
                <Column field='genero' header='Género'></Column>
                <Column field='fechaNac' header='Fecha de Nacimiento'></Column>
                <Column field='correo' header='Correo'></Column>
                <Column field='celular' header='Celular'></Column>
                <Column field='direccion' header='Dirección'></Column>
                <Column field='idDistrito' header='idDistrito'></Column>
              </DataTable>
            </div>
          </section>
        </div>
      </article>
    );
  }
}

export default Persona;
