package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.ComprobanteModel;
import com.sistema.riga.sistema_riga_backend.repositories.IComprobanteRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ComprobanteService implements IComprobanteService {

    @Autowired
    private IComprobanteRepositry iComprobanteRepositry;

    @Override
    public List<ComprobanteModel> getComprobanteById(int id) {
        return iComprobanteRepositry.getComprobanteById(id);
    }

}
