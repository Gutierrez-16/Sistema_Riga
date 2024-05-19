package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.CargoModel;

import java.util.List;

public interface ICargoService {
    List<CargoModel> getAllCargos();
    CargoModel getCargoById(int id);
    String insertCargo(CargoModel cargoModel);
    String updateCargo(CargoModel cargoModel);
    String deleteCargo(int id);
}
