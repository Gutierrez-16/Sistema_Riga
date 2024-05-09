package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.PersonaModel;
import com.sistema.riga.sistema_riga_backend.repositories.IPersonaRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonaService implements IPersonaService{
    @Autowired
    private IPersonaRepositry iPersonaRepositry;

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
    public String updatePersona(PersonaModel personaModel) {
        return iPersonaRepositry.updatePersona(personaModel);
    }

    @Override
    public String deletePersona(int id) {
        return iPersonaRepositry.deletePersona(id);
    }
}
