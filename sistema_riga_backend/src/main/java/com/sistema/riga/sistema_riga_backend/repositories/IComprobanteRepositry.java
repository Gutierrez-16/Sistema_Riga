package com.sistema.riga.sistema_riga_backend.repositories;


import com.sistema.riga.sistema_riga_backend.models.ComprobanteModel;

import java.util.List;

public interface IComprobanteRepositry {
    List<ComprobanteModel> getComprobanteById(int id);
}
