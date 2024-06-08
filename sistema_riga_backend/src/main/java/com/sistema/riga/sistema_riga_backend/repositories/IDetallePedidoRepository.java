package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.DetallePedidoModel;

public interface IDetallePedidoRepository {
    String insertarDetallePedido(int idPedido, DetallePedidoModel detallePedidoModel);
}