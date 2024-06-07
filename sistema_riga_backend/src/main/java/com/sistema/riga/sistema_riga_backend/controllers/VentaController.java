package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.DetallePedidoModel;
import com.sistema.riga.sistema_riga_backend.models.VentaModel;
import com.sistema.riga.sistema_riga_backend.services.IVentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/venta")
public class VentaController {

    @Autowired
    private IVentaService ventaService;

    @PostMapping
    public int insertarVenta(@RequestBody VentaModel ventaModel) {
        return ventaService.insertarVenta(ventaModel);
    }
}