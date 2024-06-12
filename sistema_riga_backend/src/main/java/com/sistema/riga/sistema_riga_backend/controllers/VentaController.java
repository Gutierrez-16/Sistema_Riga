package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.ComprobanteModel;
import com.sistema.riga.sistema_riga_backend.models.VentaModel;
import com.sistema.riga.sistema_riga_backend.services.IVentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/venta")
public class VentaController {

    @Autowired
    private IVentaService ventaService;

    @PostMapping
    public ComprobanteModel insertarVenta(@RequestBody VentaModel ventaModel) {
        return ventaService.insertarVenta(ventaModel);
    }

    @GetMapping("/comprobante/{id}")
    public ComprobanteModel getComprobanteById(@PathVariable int id) {
        return ventaService.getComprobanteById(id);
    }
}
