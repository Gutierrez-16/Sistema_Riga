package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.CargoModel;
import com.sistema.riga.sistema_riga_backend.repositories.ICargoRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CargoService implements ICargoService {

    @Autowired
    private ICargoRepositry iCargoRepositry;

    @Override
    public List<CargoModel> getAllCargos() {
        return iCargoRepositry.getAllCargos();
    }

    @Override
    public CargoModel getCargoById(int id) {
        return iCargoRepositry.getCargoById(id);
    }

    @Override
    public String insertCargo(CargoModel cargoModel) {
        return iCargoRepositry.insertCargo(cargoModel);
    }

    @Override
    public String updateCargo(CargoModel cargoModel) {
        return iCargoRepositry.updateCargo(cargoModel);
    }

    @Override
    public String deleteCargo(int id) {
        return iCargoRepositry.deleteCargo(id);
    }
}
