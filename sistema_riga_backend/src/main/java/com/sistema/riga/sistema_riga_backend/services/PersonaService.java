package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.PersonaModel;
import com.sistema.riga.sistema_riga_backend.repositories.IPersonaRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonaService implements IPersonaService {

    @Autowired
    private IPersonaRepositry personaRepository;

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
    public String updatePersona(PersonaModel personaModel) {
        return personaRepository.updatePersona(personaModel);
    }

    @Override
    public String deletePersona(int id) {
        return personaRepository.deletePersona(id);
    }
}
