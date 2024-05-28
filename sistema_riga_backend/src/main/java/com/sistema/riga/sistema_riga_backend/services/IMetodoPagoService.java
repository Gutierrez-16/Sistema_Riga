package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.MetodoPagoModel;

import java.util.List;

public interface IMetodoPagoService {
    List<MetodoPagoModel> getAllMetodoPagos();
    MetodoPagoModel getMetodoPagoById(int id);
    String insertMetodoPago(MetodoPagoModel metodoPagoModel);
    String updateMetodoPago(MetodoPagoModel metodoPagoModel);
    String deleteMetodoPago(int id);
}
