package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.LineaModel;

import java.util.List;

public interface ILineaService {
    List<LineaModel> getAllLineas();
    LineaModel getLineaById(int id);
    String insertLinea(LineaModel lineaModel);
    String updateLinea(LineaModel lineaModel);
    String deleteLinea(int id);
}
