package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.EmpresaModel;
import com.sistema.riga.sistema_riga_backend.repositories.IEmpresaRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpresaService  implements IEmpresaService{
    @Autowired
    private IEmpresaRepositry iEmpresaRepositry;

    @Override
    public List<EmpresaModel> getAllEmpresas() {
        return iEmpresaRepositry.getAllEmpresas();
    }

    @Override
    public EmpresaModel getEmpresaById(int id) {
        return iEmpresaRepositry.getEmpresaById(id);
    }

    @Override
    public String insertEmpresa(EmpresaModel empresaModel) {
        return iEmpresaRepositry.insertEmpresa(empresaModel);
    }

    @Override
    public String updateEmpresa(EmpresaModel empresaModel) {
        return iEmpresaRepositry.updateEmpresa(empresaModel);
    }

    @Override
    public String deleteEmpresa(int id) {
        return iEmpresaRepositry.deleteEmpresa(id);
    }
}
