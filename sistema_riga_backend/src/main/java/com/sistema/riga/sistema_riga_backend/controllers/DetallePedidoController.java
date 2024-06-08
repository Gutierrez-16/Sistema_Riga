package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.DetallePedidoModel;
import com.sistema.riga.sistema_riga_backend.services.IDetallePedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/detallepedido")
public class DetallePedidoController {

    @Autowired
    private IDetallePedidoService iDetallePedidoService;

    @PostMapping("/{idPedido}")
    public String insertarDetallePedido(@PathVariable int idPedido,
                                        @RequestBody DetallePedidoModel detallePedidoModel) {
        // Lógica para insertar el detalle del pedido
        return iDetallePedidoService.insertarDetallePedido(idPedido, detallePedidoModel);
    }
}