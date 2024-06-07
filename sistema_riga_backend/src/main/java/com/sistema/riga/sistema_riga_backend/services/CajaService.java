package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.CajaModel;
import com.sistema.riga.sistema_riga_backend.repositories.ICajaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CajaService implements ICajaService {

    @Autowired
    private ICajaRepository iCajaRepository;

    @Override
    public List<CajaModel> getAllCajas() {
        return iCajaRepository.getAllCajas();
    }

    @Override
    public CajaModel getCajaById(int id) {
        return iCajaRepository.getCajaById(id);
    }

    @Override
    public String insertCaja(CajaModel cajaModel) {
        return iCajaRepository.insertCaja(cajaModel);
    }

    @Override
    public String updateCaja(CajaModel cajaModel) {
        return iCajaRepository.updateCaja(cajaModel);
    }

    @Override
    public String deleteCaja(int id) {
        return iCajaRepository.deleteCaja(id);
    }

    @Override
    public String cerrarCaja(int id) {
        return iCajaRepository.cerrarCaja(id);
    }


    @Override
    public List<CajaModel> searchCajas(String descripcion) {
        return iCajaRepository.searchCajas(descripcion);
    }
}
