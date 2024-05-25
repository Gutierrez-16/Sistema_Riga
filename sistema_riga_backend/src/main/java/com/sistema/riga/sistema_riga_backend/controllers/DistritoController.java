package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.DistritoModel;
import com.sistema.riga.sistema_riga_backend.services.IDistritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/distrito")
@CrossOrigin(origins = "http://localhost:5173")

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

