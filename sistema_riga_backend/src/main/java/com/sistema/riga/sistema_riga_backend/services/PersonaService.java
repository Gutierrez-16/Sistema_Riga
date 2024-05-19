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
    private IPersonaRepositry iPersonaRepositry;

    @Override
    public String updatePersona(PersonaModel personaModel) {
        return iPersonaRepositry.updatePersona(personaModel);
    }
    @Override
    public List<PersonaModel> getAllPersonas() {
        return iPersonaRepositry.getAllPersonas();
    }

    @Override
    public PersonaModel getPersonaById(int id) {
        return iPersonaRepositry.getPersonaById(id);
    }

    @Override
    public String insertPersona(PersonaModel personaModel) {
        return iPersonaRepositry.insertPersona(personaModel);
    }

    @Override
    public String deletePersona(int id) {
        return iPersonaRepositry.deletePersona(id);
    }

    @Override
    public List<DepartamentoModel> getAllDepartamentos() {
        return iPersonaRepositry.getAllDepartamentos();
    }

    @Override
    public List<ProvinciaModel> getProvinciasByDepartamento(int idDepartamento) {
        return iPersonaRepositry.getProvinciasByDepartamento(idDepartamento);
    }

    @Override
    public List<DistritoModel> getDistritosByProvincia(int idProvincia) {
        return iPersonaRepositry.getDistritosByProvincia(idProvincia);
    }



    @Override
    public List<ProvinciaModel> getProvinciasByDistrito(int idDistrito) {
        return iPersonaRepositry.getProvinciasByDistrito(idDistrito);
    }

    @Override
    public List<DepartamentoModel> getDepartamentosByProvincia(String provincia) {
        return iPersonaRepositry.getDepartamentosByProvincia(provincia);
    }
}
