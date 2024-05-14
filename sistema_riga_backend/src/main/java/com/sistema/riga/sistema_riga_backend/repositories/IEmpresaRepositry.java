package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.EmpresaModel;

import java.util.List;

public interface IEmpresaRepositry {
    List<EmpresaModel> getAllEmpresas();
    EmpresaModel getEmpresaById(int id);
    String insertEmpresa(EmpresaModel empresaModel);
    String updateEmpresa(EmpresaModel empresaModel);
    String deleteEmpresa(int id);
}
