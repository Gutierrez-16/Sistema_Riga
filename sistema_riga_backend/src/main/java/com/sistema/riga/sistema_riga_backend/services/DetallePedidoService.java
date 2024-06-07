package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.DetallePedidoModel;
import com.sistema.riga.sistema_riga_backend.repositories.IDetallePedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DetallePedidoService implements IDetallePedidoService {

    @Autowired
    private IDetallePedidoRepository iDetallePedidoRepository;

    @Override
    public String insertarDetallePedido(int idPedido, DetallePedidoModel detallePedidoModel) {
        return iDetallePedidoRepository.insertarDetallePedido(idPedido, detallePedidoModel);
    }
}
