package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.UnidadMedidaModel;
import com.sistema.riga.sistema_riga_backend.repositories.IUnidadMedidaRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnidadMedidaService implements IUnidadMedidaService {

    @Autowired
    private IUnidadMedidaRepositry iUnidadMedidaRepositry;

    @Override
    public List<UnidadMedidaModel> getAllUnidadMedidas() {
        return iUnidadMedidaRepositry.getAllUnidadMedidas();
    }

    @Override
    public UnidadMedidaModel getUnidadMedidaById(int id) {
        return iUnidadMedidaRepositry.getUnidadMedidaById(id);
    }

    @Override
    public String insertUnidadMedida(UnidadMedidaModel unidadMedidaModel) {
        return iUnidadMedidaRepositry.insertUnidadMedida(unidadMedidaModel);
    }

    @Override
    public String updateUnidadMedida(UnidadMedidaModel unidadMedidaModel) {
        return iUnidadMedidaRepositry.updateUnidadMedida(unidadMedidaModel);
    }

    @Override
    public String deleteUnidadMedida(int id) {
        return iUnidadMedidaRepositry.deleteUnidadMedida(id);
    }

    @Override
    public String activateUnidadMedida(int id) {
        return iUnidadMedidaRepositry.activateUnidadMedida(id);
    }
}
