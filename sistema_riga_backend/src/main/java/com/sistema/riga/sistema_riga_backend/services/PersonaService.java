package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.DepartamentoModel;
import com.sistema.riga.sistema_riga_backend.models.DistritoModel;
import com.sistema.riga.sistema_riga_backend.models.PersonaModel;
import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;
import com.sistema.riga.sistema_riga_backend.repositories.IPersonaRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonaService implements IPersonaService {

    @Autowired
    private IPersonaRepositry personaRepository;

    @Override
    public String updatePersona(PersonaModel personaModel) {
        return personaRepository.updatePersona(personaModel);
    }
    @Override
    public List<PersonaModel> getAllPersonas() {
        return personaRepository.getAllPersonas();
    }

    @Override
    public PersonaModel getPersonaById(int id) {
        return personaRepository.getPersonaById(id);
    }

    @Override
    public String insertPersona(PersonaModel personaModel) {
        return personaRepository.insertPersona(personaModel);
    }

    @Override
    public String deletePersona(int id) {
        return personaRepository.deletePersona(id);
    }

    @Override
    public List<DepartamentoModel> getAllDepartamentos() {
        return personaRepository.getAllDepartamentos();
    }

    @Override
    public List<ProvinciaModel> getProvinciasByDepartamento(int idDepartamento) {
        return personaRepository.getProvinciasByDepartamento(idDepartamento);
    }

    @Override
    public List<DistritoModel> getDistritosByProvincia(int idProvincia) {
        return personaRepository.getDistritosByProvincia(idProvincia);
    }



    @Override
    public List<ProvinciaModel> getProvinciasByDistrito(int idDistrito) {
        return personaRepository.getProvinciasByDistrito(idDistrito);
    }

    @Override
    public List<DepartamentoModel> getDepartamentosByProvincia(String provincia) {
        return personaRepository.getDepartamentosByProvincia(provincia);
    }

    @Override
    public String activatePersona(int id) {
        return personaRepository.activatePersona(id);
    }
}
