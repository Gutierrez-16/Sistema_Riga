package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.CajaModel;
import com.sistema.riga.sistema_riga_backend.services.ICajaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/caja")
public class CajaController {

    @Autowired
    private ICajaService iCajaService;

    @GetMapping
    public List<CajaModel> getAllCajas() {
        return iCajaService.getAllCajas();
    }

    @GetMapping("/{id}")
    public CajaModel getCajaById(@PathVariable int id) {
        return iCajaService.getCajaById(id);
    }

    @PostMapping
    public String insertCaja(@RequestBody CajaModel cajaModel) {
        return iCajaService.insertCaja(cajaModel);
    }

    @PutMapping("/{id}")
    public String updateCaja(@PathVariable int id, @RequestBody CajaModel cajaModel) {
        cajaModel.setIdCaja(id);
        return iCajaService.updateCaja(cajaModel);
    }

    @DeleteMapping("/{id}")
    public String deleteCaja(@PathVariable int id) {
        return iCajaService.deleteCaja(id);
    }

    @PatchMapping("/cerrar/{id}")
    public String cerrarCaja(@PathVariable int id) {
        return iCajaService.cerrarCaja(id);
    }



    @GetMapping("/buscar")
    public List<CajaModel> searchCajas(@RequestParam String descripcion) {
        return iCajaService.searchCajas(descripcion);
    }
}
