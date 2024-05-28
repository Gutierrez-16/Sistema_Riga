package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.LineaModel;

import java.util.List;

public interface ILineaRepositry {
    List<LineaModel> getAllLineas();
    LineaModel getLineaById(int id);
    String insertLinea(LineaModel lineaModel);
    String updateLinea(LineaModel lineaModel);
    String deleteLinea(int id);
}
