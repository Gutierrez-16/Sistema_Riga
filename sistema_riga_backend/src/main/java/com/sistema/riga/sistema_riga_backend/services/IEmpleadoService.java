package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.CargoModel;
import com.sistema.riga.sistema_riga_backend.models.EmpleadoModel;
import com.sistema.riga.sistema_riga_backend.models.PersonaModel;

import java.util.List;


public interface IEmpleadoService {
    List<EmpleadoModel> getAllEmpleados();
    EmpleadoModel getEmpleadoById(int id);
    String insertEmpleado(EmpleadoModel empleadoModel);
    String updateEmpleado(EmpleadoModel empleadoModel);
    String deleteEmpleado(int id);
    List<CargoModel> getAllCargos();
    List<PersonaModel> getAllPersonas();
    String activateEmpleado(int id);
}
