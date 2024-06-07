package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.CajaModel;

import java.util.List;

public interface ICajaRepository {
    List<CajaModel> getAllCajas();
    CajaModel getCajaById(int id);
    String insertCaja(CajaModel cajaModel);
    String updateCaja(CajaModel cajaModel);
    String deleteCaja(int id);
    String cerrarCaja(int id);
    List<CajaModel> searchCajas(String descripcion);
}
