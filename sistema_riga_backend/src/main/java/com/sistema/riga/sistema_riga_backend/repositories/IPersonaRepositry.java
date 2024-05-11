package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.PersonaModel;

import java.util.List;

public interface IPersonaRepositry {
    List<PersonaModel> getAllPersonas();
    PersonaModel getPersonaById(int id);
    String insertPersona(PersonaModel personaModel);
    String updatePersona(PersonaModel personaModel);
    String deletePersona(int id);
}