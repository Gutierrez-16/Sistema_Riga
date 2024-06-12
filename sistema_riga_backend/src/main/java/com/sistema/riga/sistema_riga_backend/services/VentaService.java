package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.ComprobanteModel;
import com.sistema.riga.sistema_riga_backend.models.VentaModel;
import com.sistema.riga.sistema_riga_backend.repositories.IVentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VentaService implements IVentaService {

    @Autowired
    private IVentaRepository ventaRepository;

    @Override
    public ComprobanteModel insertarVenta(VentaModel ventaModel) {
        return ventaRepository.insertarVenta(ventaModel);
    }

    @Override
    public ComprobanteModel getComprobanteById(int id) {
        return ventaRepository.getComprobanteById(id);
    }
}
