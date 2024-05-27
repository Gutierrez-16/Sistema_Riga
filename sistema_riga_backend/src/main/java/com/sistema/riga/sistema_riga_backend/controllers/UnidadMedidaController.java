package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.UnidadMedidaModel;
import com.sistema.riga.sistema_riga_backend.services.IUnidadMedidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/unidadMedida")
public class UnidadMedidaController {
    @Autowired
    private IUnidadMedidaService iUnidadMedidaService;

    @GetMapping
    public List<UnidadMedidaModel> getAllUnidadMedidas() {
        return iUnidadMedidaService.getAllUnidadMedidas();
    }

    @GetMapping("/{id}")
    public UnidadMedidaModel getUnidadMedidaById(@PathVariable int id) {
        return iUnidadMedidaService.getUnidadMedidaById(id);
    }

    @PostMapping
    public String insertUnidadMedida(@RequestBody UnidadMedidaModel unidadMedidaModel) {
        return iUnidadMedidaService.insertUnidadMedida(unidadMedidaModel);
    }

    @PutMapping("/{id}")
    public String updateUnidadMedida(@PathVariable int id, @RequestBody UnidadMedidaModel unidadMedidaModel) {
        unidadMedidaModel.setIdUnidadMedida(id);
        return iUnidadMedidaService.updateUnidadMedida(unidadMedidaModel);
    }

    @DeleteMapping("/{id}")
    public String deleteUnidadMedida(@PathVariable int id) {
        return iUnidadMedidaService.deleteUnidadMedida(id);
    }
}
