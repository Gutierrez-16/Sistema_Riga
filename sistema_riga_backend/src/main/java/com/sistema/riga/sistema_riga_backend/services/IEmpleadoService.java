package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.EmpleadoModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IEmpleadoService {
    List<EmpleadoModel> getAllEmpleados();
    EmpleadoModel getEmpleadoById(int id);
    String insertEmpleado(EmpleadoModel empleadoModel);
    String updateEmpleado(EmpleadoModel empleadoModel);
    String deleteEmpleado(int id);
}
