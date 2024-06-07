package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.DetallePedidoModel;

public interface IDetallePedidoService {
    String insertarDetallePedido(int idPedido, DetallePedidoModel detallePedidoModel);
}
