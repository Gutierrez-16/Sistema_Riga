package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.ComprobanteModel;
import com.sistema.riga.sistema_riga_backend.models.VentaModel;

import java.util.List;

public interface IVentaRepository {
    ComprobanteModel getComprobanteById(int id);
    ComprobanteModel insertarVenta(VentaModel ventaModel);
    List<VentaModel> getAllVentass();
}