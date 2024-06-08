package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.LineaModel;
import com.sistema.riga.sistema_riga_backend.services.ILineaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/linea")
public class LineaController {
    @Autowired
    private ILineaService iLineaService;

    @GetMapping
    public List<LineaModel> getAllLineas() {
        return iLineaService.getAllLineas();
    }

    @GetMapping("/{id}")
    public LineaModel getLineaById(@PathVariable int id) {
        return iLineaService.getLineaById(id);
    }

    @PostMapping
    public String insertLinea(@RequestBody LineaModel lineaModel) {
        return iLineaService.insertLinea(lineaModel);
    }

    @PutMapping("/{id}")
    public String updateLinea(@PathVariable int id, @RequestBody LineaModel lineaModel) {
        lineaModel.setIdLinea(id);
        return iLineaService.updateLinea(lineaModel);
    }

    @DeleteMapping("/{id}")
    public String deleteLinea(@PathVariable int id) {
        return iLineaService.deleteLinea(id);
    }

    @PatchMapping("/{id}")
    public String activateLinea(@PathVariable int id) {
        return iLineaService.activateLinea(id);
    }
}
