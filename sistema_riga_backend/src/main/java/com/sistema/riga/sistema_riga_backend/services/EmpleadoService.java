package com.sistema.riga.sistema_riga_backend.services;


import com.sistema.riga.sistema_riga_backend.models.EmpleadoModel;
import com.sistema.riga.sistema_riga_backend.repositories.IEmpleadoRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadoService implements IEmpleadoService{
    @Autowired
    private IEmpleadoRepositry iEmpleadoRepositry;

    @Override
    public List<EmpleadoModel> getAllEmpleados() {
        return iEmpleadoRepositry.getAllEmpleados();
    }

    @Override
    public EmpleadoModel getEmpleadoById(int id) {
        return iEmpleadoRepositry.getEmpleadoById(id);
    }

    @Override
    public String insertEmpleado(EmpleadoModel empleadoModel) {
        return iEmpleadoRepositry.insertEmpleado(empleadoModel);
    }

    @Override
    public String updateEmpleado(EmpleadoModel empleadoModel) {
        return iEmpleadoRepositry.updateEmpleado(empleadoModel);
    }

    @Override
    public String deleteEmpleado(int id) {
        return iEmpleadoRepositry.deleteEmpleado(id);
    }
}
