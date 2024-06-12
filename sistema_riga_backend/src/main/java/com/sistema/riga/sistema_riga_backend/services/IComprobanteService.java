package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.ComprobanteModel;

import java.util.List;


public interface IComprobanteService {
    List<ComprobanteModel> getComprobanteById(int id);

}
