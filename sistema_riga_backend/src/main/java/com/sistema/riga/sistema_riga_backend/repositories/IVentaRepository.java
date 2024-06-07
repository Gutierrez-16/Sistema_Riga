package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.VentaModel;

public interface IVentaRepository {
    int insertarVenta(VentaModel ventaModel);
}