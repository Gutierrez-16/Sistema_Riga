package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.DepartamentoModel;
import com.sistema.riga.sistema_riga_backend.models.DistritoModel;
import com.sistema.riga.sistema_riga_backend.models.EmpresaModel;
import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IEmpresaService {
    List<EmpresaModel> getAllEmpresas();
    EmpresaModel getEmpresaById(int id);
    String insertEmpresa(EmpresaModel empresaModel);
    String updateEmpresa(EmpresaModel empresaModel);
    String deleteEmpresa(int id);
    String activateEmpresa(int id);
}
