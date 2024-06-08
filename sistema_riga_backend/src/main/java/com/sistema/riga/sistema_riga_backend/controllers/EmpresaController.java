package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.EmpresaModel;
import com.sistema.riga.sistema_riga_backend.services.IEmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empresa")
public class EmpresaController {
    @Autowired
    private IEmpresaService iEmpresaService;

    @GetMapping
    public List<EmpresaModel> getAllEmpresas() {
        return iEmpresaService.getAllEmpresas();

    }

    @GetMapping("/{id}")
    public EmpresaModel getEmpresaById(@PathVariable int id) {
        return iEmpresaService.getEmpresaById(id);
    }

    @PostMapping
    public String insertEmpresa(@RequestBody EmpresaModel empresaModel) {
        return iEmpresaService.insertEmpresa(empresaModel);
    }

    @PutMapping("/{id}")
    public String updateEmpresa(@PathVariable int id, @RequestBody EmpresaModel empresaModel) {
        empresaModel.setIdEmpresa(id);
        return iEmpresaService.updateEmpresa(empresaModel);
    }

    @DeleteMapping("/{id}")
    public String deleteEmpresa(@PathVariable int id) {
        return iEmpresaService.deleteEmpresa(id);
    }

    @PatchMapping("{id}")
    public String activateEmpresa(@PathVariable int id){
        return iEmpresaService.activateEmpresa(id);
    }
}