package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.LineaModel;
import com.sistema.riga.sistema_riga_backend.repositories.ILineaRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LineaService implements ILineaService {

    @Autowired
    private ILineaRepositry iLineaRepositry;

    @Override
    public List<LineaModel> getAllLineas() {
        return iLineaRepositry.getAllLineas();
    }

    @Override
    public LineaModel getLineaById(int id) {
        return iLineaRepositry.getLineaById(id);
    }

    @Override
    public String insertLinea(LineaModel lineaModel) {
        return iLineaRepositry.insertLinea(lineaModel);
    }

    @Override
    public String updateLinea(LineaModel lineaModel) {
        return iLineaRepositry.updateLinea(lineaModel);
    }

    @Override
    public String deleteLinea(int id) {
        return iLineaRepositry.deleteLinea(id);
    }
}
