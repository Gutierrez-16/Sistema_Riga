package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.EmpresaModel;
import com.sistema.riga.sistema_riga_backend.repositories.IPersonaRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpresaService {
    @Autowired
    private IPersonaRepositry iPersonaRepositry;

    @Override
    public List<EmpresaModel> getAllPersonas() {
        return iPersonaRepositry.getAllPersonas();
    }

    @Override
    public EmpresaModel getPersonaById(int id) {
        return iPersonaRepositry.getPersonaById(id);
    }

    @Override
    public String insertPersona(EmpresaModel empresaModel) {
        return iPersonaRepositry.insertPersona(empresaModel);
    }

    @Override
    public String updatePersona(EmpresaModel empresaModel) {
        return iPersonaRepositry.updatePersona(empresaModel);
    }

    @Override
    public String deletePersona(int id) {
        return iPersonaRepositry.deletePersona(id);
    }
}
