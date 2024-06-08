package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.UnidadMedidaModel;

import java.util.List;

public interface IUnidadMedidaRepositry {
    List<UnidadMedidaModel> getAllUnidadMedidas();
    UnidadMedidaModel getUnidadMedidaById(int id);
    String insertUnidadMedida(UnidadMedidaModel unidadMedidaModel);
    String updateUnidadMedida(UnidadMedidaModel unidadMedidaModel);
    String deleteUnidadMedida(int id);
    String activateUnidadMedida(int id);
}
