package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.DistritoModel;
import com.sistema.riga.sistema_riga_backend.services.IDistritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/district")
public class DistritoController {

    private final IDistritoService distritoService;

    @Autowired
    public DistritoController(IDistritoService distritoService) {
        this.distritoService = distritoService;
    }

    @GetMapping("/province/{idProvincia}")
    public List<DistritoModel> getDistritosByProvincia(@PathVariable int idProvincia) {
        return distritoService.getDistritosByProvincia(idProvincia);
    }
}

