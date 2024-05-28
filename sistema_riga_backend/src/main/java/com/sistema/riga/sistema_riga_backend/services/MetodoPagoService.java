package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.MetodoPagoModel;
import com.sistema.riga.sistema_riga_backend.repositories.IMetodoPagoRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetodoPagoService implements IMetodoPagoService {

    @Autowired
    private IMetodoPagoRepositry iMetodoPagoRepositry;

    @Override
    public List<MetodoPagoModel> getAllMetodoPagos() {
        return iMetodoPagoRepositry.getAllMetodoPagos();
    }

    @Override
    public MetodoPagoModel getMetodoPagoById(int id) {
        return iMetodoPagoRepositry.getMetodoPagoById(id);
    }

    @Override
    public String insertMetodoPago(MetodoPagoModel metodoPagoModel) {
        return iMetodoPagoRepositry.insertMetodoPago(metodoPagoModel);
    }

    @Override
    public String updateMetodoPago(MetodoPagoModel metodoPagoModel) {
        return iMetodoPagoRepositry.updateMetodoPago(metodoPagoModel);
    }

    @Override
    public String deleteMetodoPago(int id) {
        return iMetodoPagoRepositry.deleteMetodoPago(id);
    }
}
