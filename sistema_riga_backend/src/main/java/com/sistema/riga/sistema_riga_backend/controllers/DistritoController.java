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
@RequestMapping("/distrito")
public class DistritoController {

    @Autowired
    private IDistritoService iDistritoService;

    @GetMapping
    public List<DistritoModel> getAllDistritos() {
        return iDistritoService.getAllDistritos();
    }

    @GetMapping("/{id}")
    public DistritoModel getDistritoById(@PathVariable int id) {
        return iDistritoService.getDistritoById(id);
    }

    @GetMapping("/provincia/{idProvincia}")
    public List<DistritoModel> getDistritosByProvincia(@PathVariable int idProvincia) {
        return iDistritoService.getDistritosByProvincia(idProvincia);
    }
}

