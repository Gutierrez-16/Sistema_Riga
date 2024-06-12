package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.ComprobanteModel;
import com.sistema.riga.sistema_riga_backend.models.VentaModel;

public interface IVentaService {
    ComprobanteModel getComprobanteById(int id);
    ComprobanteModel insertarVenta(VentaModel ventaModel);
}