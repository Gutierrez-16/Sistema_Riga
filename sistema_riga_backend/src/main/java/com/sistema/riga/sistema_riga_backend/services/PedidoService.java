package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.repositories.IPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoService implements IPedidoService {

    @Autowired
    private IPedidoRepository pedidoRepository;

    @Override
    public int insertarPedido() {
        return pedidoRepository.insertarPedido();
    }
}