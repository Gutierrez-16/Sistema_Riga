package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.DistritoModel;
import com.sistema.riga.sistema_riga_backend.models.PersonaModel;

import java.util.List;

public interface IPersonaRepositry {
    public List<PersonaModel> findAll();
    public int save (PersonaModel personaModel);
    public int update (PersonaModel personaModel);
    public int deleteById(int id);
}