package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.EmpresaModel;

import java.util.List;


public interface IEmpresaService {
    List<EmpresaModel> getAllEmpresas();
    EmpresaModel getEmpresaById(int id);
    String insertEmpresa(EmpresaModel empresaModel);
    String updateEmpresa(EmpresaModel empresaModel);
    String deleteEmpresa(int id);
}
