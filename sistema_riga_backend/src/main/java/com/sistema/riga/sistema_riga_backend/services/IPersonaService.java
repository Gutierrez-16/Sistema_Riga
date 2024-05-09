package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.PersonaModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IPersonaService {
    List<PersonaModel> getAllPersonas();
    PersonaModel getPersonaById(int id);
    String insertPersona(PersonaModel personaModel);
    String updatePersona(PersonaModel personaModel);
    String deletePersona(int id);
}
