package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.MetodoPagoModel;
import com.sistema.riga.sistema_riga_backend.services.IMetodoPagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/metodopago")
public class MetodoPagoController {
    @Autowired
    private IMetodoPagoService iMetodoPagoService;

    @GetMapping
    public List<MetodoPagoModel> getAllMetodoPagos() {
        return iMetodoPagoService.getAllMetodoPagos();
    }

    @GetMapping("/{id}")
    public MetodoPagoModel getMetodoPagoById(@PathVariable int id) {
        return iMetodoPagoService.getMetodoPagoById(id);
    }

    @PostMapping
    public String insertMetodoPago(@RequestBody MetodoPagoModel metodoPagoModel) {
        return iMetodoPagoService.insertMetodoPago(metodoPagoModel);
    }

    @PutMapping("/{id}")
    public String updateMetodoPago(@PathVariable int id, @RequestBody MetodoPagoModel metodoPagoModel) {
        metodoPagoModel.setIdMetodo(id);
        return iMetodoPagoService.updateMetodoPago(metodoPagoModel);
    }

    @DeleteMapping("/{id}")
    public String deleteMetodoPago(@PathVariable int id) {
        return iMetodoPagoService.deleteMetodoPago(id);
    }
}
